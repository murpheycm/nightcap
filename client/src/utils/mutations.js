import { gql } from "@apollo/client";

// LOGIN should return a user, not just the user's ID
export const LOGIN = gql`
  mutation login($identifier: String!, $password: String!) {
  login(identifier: $identifier, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
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
        username
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
      _id
      name
      description
      ingredients
      allergens
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $title: String!
    $text: String!
    $image: String!
    $cocktailId: ID!
  ) {
    addReview(
      title: $title
      text: $text
      image: $image
      cocktailId: $cocktailId
    ) {
      _id
      title
      text
      image
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($comment: String!, $reviewId: ID!) {
    addComment(comment: $comment, reviewId: $reviewId) {
      _id
      comment
      createdAt
    }
  }
`;

export const ADD_CHEERS = gql`
  mutation addCheers($reviewId: ID!) {
    addCheers(reviewId: $reviewId) {
      _id
      thumbUpCount
      thumbDownCount
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($firstName: String!, $lastName: String!, $bio: String!, $profileImage: String!) {
    updateProfile(firstName: $firstName, lastName: $lastName, bio: $bio, profileImage: $profileImage) {
      _id
      username
    }
  }
`;

export const UPDATE_COCKTAIL = gql`
  mutation updateCocktail(
    $cocktailId: ID!
    $name: String!
    $description: String!
    $ingredients: [String]!
    $allergens: [String]!
  ) {
    updateCocktail(
      cocktailId: $cocktailId
      name: $name
      description: $description
      ingredients: $ingredients
      allergens: $allergens
    ) {
      _id
      name
      description
      ingredients
      allergens
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation updateReview(
    $reviewId: ID!
    $title: String!
    $text: String!
    $image: String!
  ) {
    updateReview(
      reviewId: $reviewId
      title: $title
      text: $text
      image: $image
    ) {
      _id
      title
      text
      image
      createdAt
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $comment: String!) {
    updateComment(commentId: $commentId, comment: $comment) {
      _id
      comment
      createdAt
    }
  }
`;

export const UPDATE_CHEERS = gql`
  mutation updateCheers($reviewId: ID!) {
    updateCheers(reviewId: $reviewId) {
      _id
      thumbUpCount
      thumbDownCount
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      _id
    }
  }
`;

export const DELETE_COCKTAIL = gql`
  mutation deleteCocktail($cocktailId: ID!) {
    deleteCocktail(cocktailId: $cocktailId) {
      _id
    }
  }
`;
