import * as api from '../api/index'
import * as code from './actionTypes'

export const getPostsBySearch = (query) => async(dispatch) =>{
    try {
        const { data } = await api.searchPost(query)
        if(data['message'] === "No Record Found"){
            await dispatch ({ type: code.SEARCH, payload: [] })
        } 
        else{
            await dispatch ({ type: code.SEARCH, payload: data})
        } 
        return dispatch({type: code.END});
    } catch (err) {
        console.log(err.message); 
        dispatch({type: code.END})
        return dispatch({ type: code.SEND, payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
} 

export const getPostByTag = (query, id) => async(dispatch) =>{
    try {
        const { data } = await api.searchPost(query)
        if(data['message'] === "No Record Found"){
            return ;
        } 
        else{ 
            const newData = data.data.filter((p) => { if (p._id !== id) return p} )
            return await dispatch ({ type: code.OTHER_POST, payload: newData})
        } 
    } catch (err) {
        console.log(err.message);
        // return dispatch({ type: code.SEND, payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
} 

export const createPost = (post) => async (dispatch)=> {
    try {
        dispatch({ type : code.SEND, payload : { message : "Post Uploading, Please Wait", mode : 'info' } });
        const { data } = await api.createPost(post); 
        dispatch({type: code.CREATE, payload: data});
        return dispatch({ type: code.SEND, payload : { message : "Post Successfully Created, Now Enjoy", mode : 'success' } });
    } catch (error) {
        console.log(error.message);
        return dispatch({ type: code.SEND, payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}
 
export const updatePost = (updata, id)=> async (dispatch) => {
    try { 
        dispatch({ type: code.SEND, payload : { message : "Post Updating, Please Wait", mode : 'info' } });
        const { data } = await api.updatePost(updata, id) 
        await dispatch({ type: code.SET_TAG, payload: data})
        dispatch({ type: code.UPDATE, payload: data})
        return dispatch({ type: code.SEND, payload : { message : "Post Successfully Updated, Now Enjoy", mode : 'success' } });
    } catch (error) {
        console.log(error)
        return dispatch({ type: code.SEND, payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}
 

export const deletePost = (id)=> async (dispatch) => {
    try {
        dispatch({ type: code.SEND, payload : { message : "Post Deleting, Please Wait", mode : 'warning' } });
        const { data } = await api.deletePost(id)
        dispatch({ type: code.DELETE, payload: data._id}) 
        return dispatch({ type: code.SEND, payload : { message : "Post Deleted, Please Created New Post", mode : 'info' } });
    } catch (error) {
        console.log(error)
        return dispatch({ type: code.SEND, payload : { message : "Something Went Wrong, Please Try Again Later", mode : 'error' } });
    }
}
 

export const likePost = (id)=> async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        return dispatch({ type: code.LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
} 
 

export const singlePost = (id)=> async (dispatch) => {
    try {
        const { data } = await api.singlePost(id) 
         dispatch({ type: code.FETCH_SINGLE, payload: data})
        return dispatch(getPostByTag({tags: data?.tags.join(',')}, id))
    } catch (error) { 
        dispatch({ type: code.FETCH_SINGLE, payload: {message : 'Request failed with status code 403'}})
        console.log(error) 
        return dispatch({ type: code.SEND, payload : { message : "Going Wrong Way, Please Try Again Later", mode : 'error' } });
    }
} 
 

export const getComments = (details) => async (dispatch) => {
    try {
        const { data } = await api.getComments(details) 
        if (details && details['page'] && details['page'] > 1) { 
            return dispatch({type: code.EXRTA_COMMENT, payload: data})
        } 
        else return dispatch({type: code.FETCH_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
} 

export const createComment = (newData, postID) => async (dispatch) => {
    try {
            const { data } = await api.postComment(newData, postID)
            if(data['parentID']){
                dispatch({type: code.NEW_CHILD, payload : data})
                return dispatch({type: code.UPDATE_COMMENT, payload : data})
            }
            else {
             return dispatch({type: code.CREATE_COMMENT, payload : data}) 
            }
                
    } catch (err) {
        console.log(err);
    }
}
 

export const getCommentChild = (newData) => async (dispatch)  => {
    try {
        const { data } = await api.getCommentChild(newData)
        if (data && data['totalPage'] && data['totalPage'] > 1) { 
            return dispatch({type: code.EXRTA_CHILD, payload: data})
        } 
        return dispatch({type: code.CHILD_COMMENT, payload: data})
    } catch (err) {
        console.log(err);
    }
}

export const setPostID = (id)=>{
    return { type: code.SET_ID, payload : id}
}

export const erasePostID = ()=>{
    return { type: code.ERASE_ID }
}
 