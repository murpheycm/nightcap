import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profile
      reviews
    }
  }`;
