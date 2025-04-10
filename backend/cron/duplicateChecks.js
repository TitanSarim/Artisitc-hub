const cron = require("node-cron");
const path = require("path");
const { PrismaClient, userType } = require("@prisma/client");
const { spawn } = require("child_process");
const sendEmail = require("../email/sendEmail");

const prisma = new PrismaClient();

const runCheck = async () => {
  try {
    const pendingArtist = await prisma.user.findFirst({
      where: {
        isBlocked: false,
        isVerifiedArtist: false,
        type: userType.ARTIST,
      },
    });

    if (!pendingArtist || !pendingArtist.files) {
      console.log("No pending artist or no file found.");
      return;
    }

    const fileName = pendingArtist.files.replace(/["\\]/g, "");
    const filePath = path.join(__dirname, "../Files", fileName);
    const date = pendingArtist.createdAt.toISOString().split("T")[0];

    const pythonPath = path.join(
      __dirname,
      "../python/venv/Scripts/python.exe"
    );
    const scriptPath = path.join(__dirname, "../python/CheckPDF.py");

    const pyProcess = spawn(pythonPath, [scriptPath, filePath, date]);

    let result = "";

    pyProcess.stdout.on("data", (data) => {
      result += data.toString().trim();
    });

    pyProcess.stderr.on("data", (data) => {
      console.error(`Python Error: ${data}`);
    });

    pyProcess.on("close", async (code) => {
      const isDuplicate = result.toLowerCase() === "true";
      console.log(`Duplicate status: ${isDuplicate}`);

      // Update user block status
      await prisma.user.update({
        where: { userid: pendingArtist.userid },
        data: { isBlocked: isDuplicate },
      });

      if (isDuplicate) {
        // Send email notification
        await sendEmail({
          email: pendingArtist.email,
          subject: "Duplicate Art Submission Detected",
          payload: `Dear ${pendingArtist.name},\n\nOur system has detected that your submitted portfolio contains duplicate content. Please revise your submission.\n\nRegards,\nTeam`,
        });

        console.log(
          `User ${pendingArtist.email} has been blocked due to duplication.`
        );
      } else {
        console.log(`No duplicates found for ${pendingArtist.email}`);
      }

      console.log(`Python script finished with code ${code}`);
    });
  } catch (err) {
    console.error("Cron job error:", err);
  }
};

// Run every minute
// cron.schedule("* * * * *", () => {
//   console.log("Running PDF duplicate check...");
//   runCheck();
// });
