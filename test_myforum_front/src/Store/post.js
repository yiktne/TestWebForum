const SET_LAST_PAGE = "post/SET_LAST_PAGE";

export const setLastPage = (page) => ({type:SET_LAST_PAGE, page});

const initialState = {
    lastPage:1,
};

export default function post(state=initialState, action) {
    switch(action.type) {
        case SET_LAST_PAGE:
            return {
                ...state,
                lastPage:action.page
            };
    }
    return state;
}