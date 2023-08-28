import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { batchActions } from '@app/shared/+state';

@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
  ) {}

  batchActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(batchActions),
      switchMap(({ actions }) => from(actions)),
    )
  );
}

