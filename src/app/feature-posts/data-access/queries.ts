import { gql } from 'apollo-angular';

export const getPosts = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

export const getPost = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;
