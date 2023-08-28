import { Injectable } from '@angular/core';
import { Params, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { map, compose, head, split } from 'ramda';

@Injectable({ providedIn: 'root' })
export class RouterParamsService {
  public params: BehaviorSubject<Params>;
  public paramsSnapshot: Params = {};
  private router: Router;

  constructor(router: Router) {
    this.router = router;
    this.paramsSnapshot = {};
    this.params = new BehaviorSubject( this.paramsSnapshot );

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(true),
    ).subscribe(() => {
      const snapshot = this.router.routerState.snapshot.root;
      const nextParams = this.collectParams( snapshot );

      if ( this.paramsAreDifferent( this.paramsSnapshot, nextParams ) ) {
        this.params.next( this.paramsSnapshot = nextParams );
      }
    });
  }

  private collectParams( root: ActivatedRouteSnapshot ): Params {
    const mergeParamsFromSnapshot = (snapshot: ActivatedRouteSnapshot, params) => {
      const clearedParams: Params = map(compose(head, split('?')), snapshot.params);
      const updatedParams = { ...params, ...clearedParams };
      snapshot.children.forEach( mergeParamsFromSnapshot );

      return snapshot.children.reduce((acc, cur) => mergeParamsFromSnapshot(cur, acc), updatedParams);
    };

    return mergeParamsFromSnapshot(root, {});
  }

  private paramsAreDifferent(currentParams: Params, nextParams: Params): boolean {
    const currentKeys = Object.keys(currentParams);
    const nextKeys = Object.keys(nextParams);

    if (currentKeys.length !== nextKeys.length) {
      return true;
    }

    for ( let i = 0, length = currentKeys.length ; i < length ; i++ ) {
      const key = currentKeys[ i ];

      if (currentParams[key] !== nextParams[key]) {
        return true;
      }
    }

    return false;
  }
}
