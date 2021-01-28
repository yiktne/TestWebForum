const SET_CURR_POST = "post/SET_CURR_POST";
const SET_POST_LIST = "post/SET_POST_LIST";
const ADD_POST = "post/ADD_POST";
const REMOVE_POST = "post/REMOVE_POST";

export const setCurrPost = (post) => ({type:SET_CURR_POST, post});
export const setPostList = (posts) => ({type:SET_POST_LIST, posts});
export const addPost = (post) => ({type:ADD_POST, post});
export const removePost = (postID) => ({type:REMOVE_POST, postID});

const initialState = {
    currPost:0,
    lastPost:0,
    posts:[]
};

export default function post(state=initialState, action) {
    switch(action.type) {
        case SET_CURR_POST:
            return {
                ...state,
                currPost: action.post,
            }
        case SET_POST_LIST:
            return {
                ...state,
                posts:action.posts
            };
        case ADD_POST:
            return {
                ...state,
                posts:state.posts.push(action.post),
            }
        case REMOVE_POST:
            return {
                ...state,
                posts:state.posts.filter((value) => {
                    return value.postID !== action.postID;
                }),
            }
    }
    return state;
}