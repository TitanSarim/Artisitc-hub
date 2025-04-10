import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllArtists } from "../../actions/usersAction";
import axios from "axios";
import SideBar from "./SideBar";

const ArtistsLists = () => {
  const dispatch = useDispatch();
  const { artists, loading, error } = useSelector((state) => state.allArtists);
  const [errorMessage, setErrorMessage] = useState("");
  const [changeStatus, setChangeStatus] = useState("");

  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch, error]);

  const handleChangeStatus = async (id, newStatus) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the status to ${
        newStatus === "true" ? "Approve" : "Block"
      }?`
    );

    if (confirmChange) {
      try {
        const formData = {
          id: id,
          status: newStatus === "true" ? true : false,
        };
        const res = await axios.post(
          `http://192.168.18.8:4000/api/v1/update-artists`,
          formData
        );
        console.log("res", res);
        if (res.status === 200) {
          alert("Status updated successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to update the status. Please try again.");
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <SideBar />

      <div className="admin-artists-lists">
        <h1>Artists List</h1>
        {loading && <p>Loading...</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {artists && artists.length > 0 ? (
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Type</th>
                <th>Is Verified Artist</th>
                <td>Attachment</td>
                <td>Action</td>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.userid}>
                  <td>{artist.userid}</td>
                  <td>{artist.email}</td>
                  <td>{artist.username}</td>
                  <td>{artist.type}</td>
                  <td>{artist.isVerifiedArtist ? "Yes" : "No"}</td>

                  <td>
                    <button
                      onClick={() => window.open(artist.fileUrl, "_blank")}
                    >
                      PDF
                    </button>
                  </td>
                  <td>
                    <select
                      defaultValue={
                        artist.isVerifiedArtist === true ? "true" : "false"
                      }
                      onChange={(e) =>
                        handleChangeStatus(artist.userid, e.target.value)
                      }
                    >
                      <option></option>
                      <option value="true">Approve</option>
                      <option value="false">Block</option>
                    </select>
                  </td>
                  <td>{new Date(artist.updatedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No artists found.</p>
        )}
      </div>
    </div>
  );
};

export default ArtistsLists;
