import { Directive, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { back } from '@app/shared/+state';

@Directive({
    selector: '[appGoBack]'
})
export class GoBackDirective {
  constructor(private store: Store<any>) {}

  @HostListener('click')
  onClick(): void {
      this.store.dispatch(back());
  }
}
