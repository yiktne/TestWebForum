const SET_CURR_POST = "post/SET_CURR_POST";

export const setCurrPost = (post) => ({type:SET_CURR_POST, post});

const initialState = {
    currPost:0,
};

export default function post(state=initialState, action) {
    switch(action.type) {
        case SET_CURR_POST:
            return {
                ...state,
                currPost: action.post,
            }
    }
    return state;
}