const errorHandler = require('../utils/errorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const path = require('path')
const { PrismaClient, userType } = require('@prisma/client');

const prisma = new PrismaClient();



const getAllArtists = catchAsyncError(async(req, res, next) => {

    const user = req.user;

    try { 

      if(user.type !== userType.ADMIN){
        res.status(504).json({
          success: false,
          message: "You are not authorized for this",
          
      })
      }

        const artists = await prisma.user.findMany({
            where: {
              type: userType.ARTIST
            }
        })

        const artistsWithFiles = artists.map(artist => {
          if (artist.files) {
              return {
                  ...artist,
                  fileUrl: `${process.env.API_URL}/Files/${JSON.parse(artist.files)}`,
              };
          }
          return artist;
      });

        console.log("Users retrived successfully");


        res.status(201).json({
            success: true,
            message: "Users retrived successfully",
            artists: artistsWithFiles,
        })


    } catch (error) {
        return next(new errorHandler(error, 500))
    }


})


const getUpdateStatus = catchAsyncError(async(req, res, next) => {

  // const user = req.user;
  const {id, status} = req.body;
  
  try { 

    // if(user.type !== userType.ADMIN){
    //   res.status(504).json({
    //     success: false,
    //     message: "You are not authorized for this",
        
    // })
    // }
   ;
    console.log("status", status)

    await prisma.user.update({
          where: {
            userid: parseInt(id)
          },
          data: {
            isVerifiedArtist: Boolean(status)
          }
      })



      console.log("Users updated successfully");


      res.status(200).json({
          success: true,
          message: "Users updated successfully",
          
      })


  } catch (error) {
      return next(new errorHandler(error, 500))
  }


})


module.exports = {
  getAllArtists,
  getUpdateStatus
}