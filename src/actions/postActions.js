import * as actionTypes from './types'
import Axios from 'axios';

export const showLoading=(status=false)=>{
    return {type:actionTypes.SHOW_LOADING,payload:{showLoading:status}}
}

export const showError=(message='')=>{
    return {type:actionTypes.SHOW_ERROR,payload:{message:message}}
}

export const fetchPosts=(data)=>{
    return (dispatch)=>{
        dispatch(showLoading(true));
        Axios.get('http://localhost:1337/api/posts/getall').then(response=>{
            if(response.status === 200) {
                dispatch({type:actionTypes.VIEW_ALL,payload:response.data.data, totalPostsCount:response.data.totalPostCount});
                dispatch(showLoading(false));
            } else {
                dispatch(showLoading(false));
                dispatch(showError('Error Occure During fetching posts'));
            }
        }).catch(function(err){
            dispatch(showLoading(false));
            dispatch(showError(err));
        });
    }
}






