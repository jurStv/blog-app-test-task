import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isEmpty, uniq, without } from 'ramda';

import { TopProgressBarContainerComponent } from './top-progress-bar-container.component';
import { Delay } from '../utils';

const DEFAULT_NAME = 'default';

@Injectable({
  providedIn: 'root',
})
export class TopProgressBarService {
  private topBarShown$: Subject<void> = new Subject();
  private topBarHidden$: Subject<void> = new Subject();
  private _progressStatusChange$: Subject<string[]> = new Subject();
  private topProgressBarPortal = new ComponentPortal(TopProgressBarContainerComponent);
  private bodyPortalHost: DomPortalOutlet;
  private operations: string[] = [];

  get progressStatusChange$() {
    return this._progressStatusChange$.asObservable();
  }

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.bodyPortalHost = new DomPortalOutlet(
      document.body,
      componentFactoryResolver,
      appRef,
      injector
    );

    this.topBarHidden$.asObservable().pipe(
      tap(this.hide)
    ).subscribe();
    this.topBarShown$.asObservable().pipe(
      tap(this.reveal)
    ).subscribe();
  }

  private reveal = () => {
    this.bodyPortalHost.attach(this.topProgressBarPortal);
  }

  private hide = () =>  {
    this.bodyPortalHost.detach();
  }

  @Delay(10)
  public hideAll() {
    if (isEmpty(this.operations)) {
      return;
    }
    this.operations = [];
    this._progressStatusChange$.next(this.operations);
    while (this.bodyPortalHost.hasAttached()) {
      this.bodyPortalHost.detach();
    }
  }

  @Delay(0)
  public showTopProgressBar(name = DEFAULT_NAME) {
    if (isEmpty(this.operations)) {
      this.topBarShown$.next();
    }
    this.operations = uniq([name, ...this.operations]);
    this._progressStatusChange$.next(this.operations);
  }

  @Delay(0)
  public hideTopProgressBar(name = DEFAULT_NAME) {
    if (isEmpty(this.operations)) {
      this.topBarHidden$.next();
      return;
    }
    this.operations = without([name], this.operations);
    this._progressStatusChange$.next(this.operations);
    if (isEmpty(this.operations)) {
      this.topBarHidden$.next();
    }
  }
}
