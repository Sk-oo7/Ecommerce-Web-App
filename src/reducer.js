export const initialState = {
  Cart: [],
  Wishlist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        Cart: [...state.Cart, action.item],
      };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        Wishlist: [...state.Wishlist, action.item],
      };
    default:
      return state;
  }
};
export default reducer;
