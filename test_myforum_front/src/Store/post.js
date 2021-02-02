const SET_POST_LIST = "post/SET_POST_LIST";
const ADD_POST = "post/ADD_POST";
const REMOVE_POST = "post/REMOVE_POST";

export const setPostList = (posts) => ({type:SET_POST_LIST, posts});
export const addPost = (post) => ({type:ADD_POST, post});
export const removePost = (postID) => ({type:REMOVE_POST, postID});

const initialState = {
    lastPost:0,
    posts:[]
};

export default function post(state=initialState, action) {
    switch(action.type) {
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