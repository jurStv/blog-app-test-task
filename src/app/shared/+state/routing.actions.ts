import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const go = createAction(
  '[Routing] Go',
  props<{ to: any[], extras?: NavigationExtras }>()
);

export const back = createAction(
  '[Routing] Back',
);
