import { Route } from '@angular/router';

import { PostsContainerComponent } from './containers';
import { PostsListPageComponent, PostCreatePageComponent, PostUpdatePageComponent, PostViewPageComponent } from './pages';
import { postResolver } from './resolvers';

export const routes: Route[] = [
  {
    path: '',
    component: PostsContainerComponent,
    children: [
      {
        path: 'list',
        pathMatch: 'full',
        component: PostsListPageComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PostCreatePageComponent,
      },
      {
        path: ':postId',
        pathMatch: 'full',
        component: PostViewPageComponent,
        resolve: {
          post: postResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: ':postId/edit',
        pathMatch: 'full',
        component: PostUpdatePageComponent,
        resolve: {
          post: postResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ]
  },

];
