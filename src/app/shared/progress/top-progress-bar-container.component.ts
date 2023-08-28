import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-top-progress-bar-container',
  template: '<mat-progress-bar color="accent" mode="indeterminate"></mat-progress-bar>',
  styles: [`
    .top-progress-bar-container {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 101;
      height: 3px;
      overflow: hidden;
    }

    .top-progress-bar-container svg {
      fill: transparent !important;
    }

    .top-progress-bar-container .mat-progress-bar-buffer {
      background-color: transparent !important;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class TopProgressBarContainerComponent {
  @HostBinding('class.top-progress-bar-container') className = true;
}
