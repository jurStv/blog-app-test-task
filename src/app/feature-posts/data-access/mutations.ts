import { gql } from 'apollo-angular';

export const createPost = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const updatePost = gql`
  mutation ($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;

export const deletePost = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
