import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import * as customerActions from '../state/customer.action';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
  constructor(
    private action$: Actions,
    private customerService: CustomerService
  ) {}

  LoadCustomers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionsTypes.LOAD_CUSTOMERS
      ),
      mergeMap((actions: customerActions.LoadCustomers) =>
        this.customerService.getCustomers().pipe(
          map(
            (customers: Customer[]) =>
              new customerActions.LoadCustomersSuccess(customers)
          ),
          catchError((err) => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    )
  );
  LoadCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.LoadCustomer>(
        customerActions.CustomerActionsTypes.LOAD_CUSTOMER
      ),
      mergeMap((action: customerActions.LoadCustomer) =>
        this.customerService.getCustomerById(action.payload).pipe(
          map(
            (customer: Customer) =>
              new customerActions.LoadCustomerSuccess(customer)
          ),
          catchError((err) => of(new customerActions.LoadCustomerFail(err)))
        )
      )
    )
  );
  CreateCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.CreateCustomer>(
        customerActions.CustomerActionsTypes.CREATE_CUSTOMER
      ),
      map((action: customerActions.CreateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.createCustomer(customer).pipe(
          map(
            (newCustomer: Customer) =>
              new customerActions.CreateCustomerSuccess(newCustomer)
          ),
          catchError((err) => of(new customerActions.CreateCustomerFail(err)))
        )
      )
    )
  );

  UpdateCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.UpdateCustomer>(
        customerActions.CustomerActionsTypes.UPDATE_CUSTOMER
      ),
      map((action: customerActions.UpdateCustomer) => action.payload),
      mergeMap((customer: Customer) =>
        this.customerService.updateCustomer(customer).pipe(
          map(
            (updateCustomer: Customer) =>
              new customerActions.UpdateCustomerSuccess({
                id: updateCustomer.id,
                changes: updateCustomer,
              })
          ),
          catchError((err) => of(new customerActions.UpdateCustomerFail(err)))
        )
      )
    )
  );
  DeleteCustomer$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType<customerActions.DeleteCustomer>(
        customerActions.CustomerActionsTypes.DELETE_CUSTOMER
      ),
      map((action: customerActions.DeleteCustomer) => action.payload),
      mergeMap((id: number) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => new customerActions.DeleteCustomerSuccess(id)
          ),
          catchError((err) => of(new customerActions.DeleteCustomerFail(err)))
        )
      )
    )
  );
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Action } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import * as ToDoActions from './todo.action';
// import ToDo from './todo.model';

// @Injectable()
// export class ToDoEffects {
//   constructor(private http: HttpClient, private action$: Actions) {}

//   private ApiURL: string = 'https://localhost:44308/api/ToDo';

//   CreateToDos$: Observable<Action> = createEffect(() =>
//     this.action$.pipe(
//       ofType(ToDoActions.BeginCreateToDoAction),
//       mergeMap(action =>
//         this.http
//           .post(this.ApiURL, JSON.stringify(action.payload), {
//             headers: { 'Content-Type': 'application/json' }
//           })
//           .pipe(
//             map((data: ToDo) => {
//               return ToDoActions.SuccessCreateToDoAction({ payload: data });
//             }),
//             catchError((error: Error) => {
//               return of(ToDoActions.ErrorToDoAction(error));
//             })
//           )
//       )
//     )
//   );
// }
