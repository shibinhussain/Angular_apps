import { Action } from '@ngrx/store';

export enum cartActionTypes {
  ADD_PRODUCT = 'ADD_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
}

export class AddProduct implements Action {
  readonly type = cartActionTypes.ADD_PRODUCT;
  constructor(public payload: any) {}
}

export class RemoveProduct implements Action {
  readonly type = cartActionTypes.REMOVE_PRODUCT;
  constructor(public payload: any) {}
}

export type cartActions = AddProduct | RemoveProduct;
