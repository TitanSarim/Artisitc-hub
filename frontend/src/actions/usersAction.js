import{
GET_ALL_USERS_REQUEST,
GET_ALL_USERS_FAILED,
GET_ALL_USERS_SUCCESS,
  CLEAR_ERRORS

} from '../constants/UserConstants'
import axios from 'axios'

export const getAllArtists = () => async (dispatch) => {
  console.log("Dispatching GET_ALL_USERS_REQUEST...");
  try {
      dispatch({ type: GET_ALL_USERS_REQUEST });
      console.log("Making API call...");
      
      const { data } = await axios.get('/api/v1/getallArtists');
      console.log("API Response:", data);

      dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data.artists });
  } catch (error) {
      console.error("API Error:", error);
      dispatch({
          type: GET_ALL_USERS_FAILED,
          payload: error.response ? error.response.data.message : error.message,
      });
  }
};




export const clearErrors = () => async (dispatch) => {

  dispatch({type: CLEAR_ERRORS})

}