import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile(
    $firstName: String!
    $lastName: String!
    $bio: String!
    $profileImage: String!
  ) {
    addProfile(
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      profileImage: $profileImage
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COCKTAIL = gql`
  mutation addCocktail(
    $name: String!
    $description: String!
    $ingredients: [String]!
    $allergens: [String]!
  ) {
    addCocktail(
      name: $name
      description: $description
      ingredients: $ingredients
      allergens: $allergens
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($title: String!, $text: String!, $image: String!) {
    addReview(title: $title, text: $text, image: $image) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($comment: String!) {
    addComment(comment: $comment) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_CHEERS = gql`
  mutation addCheers($cheers: String!) {
    addCheers(cheers: $cheers) {
      token
      user {
        _id
      }
    }
  }
`;

