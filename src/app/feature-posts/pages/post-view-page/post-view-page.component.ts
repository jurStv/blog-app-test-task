import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { Observable, map } from 'rxjs';
import { IPost } from '@app/shared/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './post-view-page.component.html',
  styleUrls: ['./post-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewPageComponent implements OnInit {
  @HostBinding('class.full-page-size') cl = true;
  post$: Observable<IPost>;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.post$ = this.activatedRoute.data.pipe(
      map(({ post }) => post)
    );
  }

}
