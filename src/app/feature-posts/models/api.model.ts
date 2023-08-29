import { IPost } from '@app/shared/models';

export interface IRequestPostsOptions {
  paginate: {
    page: number;
    limit: number;
  };
  search: {
    q: string;
  };
}


export interface IResponsePostsData {
  posts: {
    data: IPost[];
    meta: {
      totalCount: number;
    };
  };
}

export interface IRequestUpdatePostOptions {
  id: string;
  input: {
    title: string;
    body: string;
  };
}

export interface IResponsePost {
  id: string;
  title: string;
  body: string;
}

export interface IRequestCreatePostOptions {
  input: {
    title: string;
    body: string;
  };
}
