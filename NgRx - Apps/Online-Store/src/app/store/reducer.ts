import { cartActionTypes, cartActions } from './actions';

export let initialState = [];

export function reducer(state = initialState, action: cartActions) {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT:
      return [...state, action.payload];
    case cartActionTypes.REMOVE_PRODUCT:
      let product = action.payload;
      return state.filter((el: any) => el.id != product.id);
    default:
      return state;
  }
}
