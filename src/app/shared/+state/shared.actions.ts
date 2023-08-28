import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const noop = createAction(
  '[Shared] Noop',
);

export const batchActions = createAction(
  '[Shared] Batch Actinos',
  props<{ actions: TypedAction<any>[] }>()
);
