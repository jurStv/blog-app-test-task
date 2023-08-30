import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';

import { IRequestCreatePostOptions, IRequestPostsOptions, IRequestUpdatePostOptions, IResponsePost, IResponsePostsData } from '@app/feature-posts/models';
import { IPost } from '@app/shared/models';

import { getPost, getPosts } from './queries';
import { createPost, deletePost, updatePost } from './mutations';

@Injectable({ providedIn: 'root' })
export class PostsGqlService {
  constructor(private apollo: Apollo) {}

  getPosts(pageSize: number, pageIndex: number, searchQuery: string): Observable<IResponsePostsData> {
    const options: IRequestPostsOptions = {
      paginate: {
        limit: pageSize,
        page: pageIndex,
      },
      search: {
        q: searchQuery,
      }
    };

    return this.apollo.query<IResponsePostsData>({
      query: getPosts,
      variables: { options }
    }).pipe(
      map(({ data }) => data)
    );
  }

  getPost(id: string) {
    return this.apollo.query<{ post: IPost }>({
      query: getPost,
      variables: { id }
    })
  }

  createPost(options: IRequestCreatePostOptions) {
    return this.apollo.mutate<IResponsePost>({
      mutation: createPost,
      variables: { ...options }
    });
  }

  updatePost(options: IRequestUpdatePostOptions) {
    return this.apollo.mutate<IResponsePost>({
      mutation: updatePost,
      variables: { ...options }
    });
  }

  deletePost(id: string) {
    return this.apollo.mutate({
      mutation: deletePost,
      variables: { id }
    });
  }
}
