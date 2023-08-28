import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@app/shared';
import { POSTS_FEATURE_KEY } from '@app/shared/+state';

import { PostsContainerComponent, PostsPagingContainerComponent, PostsSearchFieldContainerComponent } from './containers';
import { PostsListPageComponent, PostCreatePageComponent, PostUpdatePageComponent, PostViewPageComponent } from './pages';
import { initialPostsState, PostsEffects, postsReducer } from './+state';
import { routes } from './posts.routes';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(POSTS_FEATURE_KEY, postsReducer, { initialState: initialPostsState }),
    EffectsModule.forFeature([PostsEffects]),
    RouterModule.forChild(routes),
  ],
  declarations: [
    /* Pages */
    PostsListPageComponent,
    PostCreatePageComponent,
    PostUpdatePageComponent,
    PostViewPageComponent,
    /* Containers */
    PostsContainerComponent,
    PostsPagingContainerComponent,
    PostsSearchFieldContainerComponent
  ],
  providers: []
})
export class PostsModule {}
