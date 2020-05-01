import * as actionTypes from './../actions/types'
let initialState = {
    posts:[],
    showLoading:false,
    showError:false,
    errorMessage:'',
    pageCount:10,
    totalPostsCount:0
}

const postReducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_LOADING:
        return {
          ...state,
          showLoading:action.payload.showLoading
        }

    case actionTypes.VIEW_ALL:
      const allPosts =  action.payload;
      return {
        ...state,
        posts:allPosts,
        totalPostsCount:action.totalPostsCount
      }

    case actionTypes.SHOW_ERROR:
      return {
        ...state,
        showError:true,
        errorMessage:action.payload.message
      }
    

  }
  return state;
}
export default postReducer;