import { SET_SCREAMS,SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, POST_SCREAM, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

//Get all Screams
export const getScreams = () => dispatch =>{
    dispatch({ type: LOADING_DATA});
    axios.get('https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/screams')
        .then(res =>{
            dispatch({ 
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({ 
                type: SET_SCREAMS,
                payload: []
            })
        })
}
//Get a Scream
export const getScream = (screamId) => dispatch =>{
    dispatch({ type: LOADING_UI});
    axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream/${screamId}`)
        .then(res =>{
            dispatch({ 
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI});
        })
        .catch(err =>{ console.log(err)})
};
//Post a scream
export const postScream = (newScream) => dispatch =>{
    dispatch({ type: LOADING_UI});
    axios.post('https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream', newScream)
        .then((res) =>{
            dispatch({ 
                payload: res.data,
                type: POST_SCREAM
            });
            dispatch({ type: CLEAR_ERRORS});
        })
        .catch((err) =>{
            dispatch({ 
                payload: err.response.data,
                type: SET_ERRORS
                
            })
        });
};

//Like a Scream 
export const likeScream = (screamId) => dispatch =>{
    axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream/${screamId}/like`)
        .then(res =>{
            dispatch({ 
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err =>{ console.log(err)})
};
//UnLike a Scream
export const unlikeScream = (screamId) => dispatch =>{
    axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream/${screamId}/unlike`)
        .then(res =>{
            dispatch({ 
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err =>{ console.log(err)})
};
//SUBMIT A COMMENT
export const submitComment = (screamId, commentData) => dispatch =>{
    axios.post(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream/${screamId}/comment`, commentData)
        .then((res) =>{
            dispatch({ 
                payload: res.data,
                type: SUBMIT_COMMENT
                
            });
            dispatch(clearErrors());
        })
        .catch(err =>{  
            dispatch({ 
            payload: err.response.data,
            type: SET_ERRORS
           });
        })
}


//Delete a Scream
export const deleteScream = (screamId) => dispatch =>{
    axios.delete(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/scream/${screamId}`)
        .then(() =>{
            dispatch({ 
                payload: screamId,
                type: DELETE_SCREAM,
                
            })
        })
        .catch(err =>{ console.log(err)})
}

//Get a user
export const getUserData = (userHandle) => dispatch =>{
    dispatch({ type: LOADING_DATA});
    axios.get(`https://europe-west1-socialyarns-ad06f.cloudfunctions.net/api/user/${userHandle}`)
        .then((res)=>{
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(()=>{
            dispatch({
                type: SET_SCREAMS,
                payload: null
            });
        });
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS});
}