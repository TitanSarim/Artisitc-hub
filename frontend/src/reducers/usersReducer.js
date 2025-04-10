import{
  GET_ALL_USERS_SUCCESS,
GET_ALL_USERS_REQUEST,
GET_ALL_USERS_FAILED,

  CLEAR_ERRORS

} from '../constants/UserConstants'


export const allArtistsReducer = (state = { artists: [] }, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                artists: action.payload,
            };

        case GET_ALL_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};