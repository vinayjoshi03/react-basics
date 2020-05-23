import * as actionTypes from './../actions/types'

let initialState = {
    posts:[],
    showLoading:false,
    showError:false,
    errorMessage:'',
    pageCount:10,
    totalPostsCount:0, 
    addPostSuccess:false
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

      case actionTypes.SHOW_ADD_SUCCESS:
        console.log("Into SHOW_ADD_SUCCESS");
        console.log("Reducer Data:-->", action.type, action.payload);
        return {
          ...state,
          addPostSuccess:action.payload.status
        }

      default:
  }
  return state;
}
export default postReducer;