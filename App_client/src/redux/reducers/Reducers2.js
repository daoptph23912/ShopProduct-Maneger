import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FORM_CART, REMOVE_FORM_WISHLIST } from "../ActionTypes";

export const Reducers2 = (state = [], action) => {
    switch (action.type) {

        case ADD_TO_WISHLIST:
            return [...state, action.payload];
        case REMOVE_FORM_WISHLIST:
            const deletedArray2 = state.filter((item, index) => {
                return index !== action.payload;
            });
            return deletedArray2;
        default: return state;
    }
};