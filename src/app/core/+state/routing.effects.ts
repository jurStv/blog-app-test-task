import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { go, back } from '@app/shared/+state';

@Injectable()
export class RoutingEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  go$ = createEffect(() =>
    this.actions$.pipe(
      ofType(go),
      tap(({ to, extras }) => this.router.navigate(to, extras)),
    ),
    { dispatch: false }
  );

  back$ = createEffect(() =>
    this.actions$.pipe(
      ofType(back),
      tap(() => this.location.back()),
    ),
    { dispatch: false }
  );
}

