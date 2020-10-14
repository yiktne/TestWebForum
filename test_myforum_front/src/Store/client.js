const SET_USERTOKEN = 'client/SET_USERTOKEN';

export const setUserToken = (token) => ({type:SET_USERTOKEN, token});

const initialState = {
    serverURL:'http://localhost:3001',
    userToken:'',
}

export default function client(state = initialState, action) {
    switch(action.type) {
        case SET_USERTOKEN:
            return {
                ...state,
                userToken:action.token
            }
    }

    return state;
}