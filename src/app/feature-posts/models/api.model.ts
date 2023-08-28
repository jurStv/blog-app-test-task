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
  id: number;
  input: {
    title: string;
    body: string;
  };
}

export interface IResponsePost {
  id: number;
  title: string;
  body: string;
}

export interface IRequestCreatePostOptions {
  input: {
    title: string;
    body: string;
  };
}
