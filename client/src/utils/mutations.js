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
    $firstName: String
    $lastName: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BUSINESS = gql`
  mutation addBusiness(
    $_id: ID!
    $name: String!
    $email: String
    $phoneNumber: String
    $bio: String
    $image: [String]
    $website: String
    $location: String
  ) {
    addBusiness(
      _id: $_id
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      bio: $bio
      image: $image
      website: $website
      location: $location
    ) {
      _id
      name
      email
      phoneNumber
      bio
      image
      website
      location
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile(
    $_id: ID!
    $bio: String
    $birthday: String
    $location: String
    $country: String
    $image: String
  ) {
    addProfile(
      _id: $_id
      bio: $bio
      birthday: $birthday
      location: $location
      country: $country
      image: $image
    ) {
      _id
      bio
      birthday
      location
      country
      image
    }
  }
`;

export const ADD_COCKTAIL = gql`
  mutation addCocktail(
    $_id: ID!
    $name: String!
    $description: String!
    $image: String
    $ingredients: [String]!
    $allergens: [String]!
    $tags: [String]
    $business: ID
    $user: ID!
  ) {
    addCocktail(
      _id: $_id
      name: $name
      description: $description
      image: $image
      ingredients: $ingredients
      allergens: $allergens
      tags: $tags
      business: $business
      user: $user
    ) {
      _id
      name
      description
      image
      ingredients
      allergens
      tags
      business
      user
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $_id: ID!
    $user: ID!
    $cocktail: ID!
    $title: String!
    $text: String!
    $rating: Float!
    $image: [String]
  ) {
    addReview(
      _id: $_id
      user: $user
      cocktail: $cocktail
      title: $title
      text: $text
      rating: $rating
      image: $image
    ) {
      _id
      title
      text
      rating
      image
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $_id: ID!
    $review: ID!
    $user: ID!
    $comment: String!
  ) {
    addComment(
      _id: $_id
      review: $review
      user: $user
      comment: $comment
    ) {
      _id
      comment
      createdAt
    }
  }
`;

export const ADD_CHEERS = gql`
  mutation addCheers(
    $_id: ID!
    $user: ID!
    $comment: ID
    $review: ID
  ) {
    addCheers(
      _id: $_id
      user: $user
      comment: $comment
      review: $review
    ) {
      _id
    }
  }
`;

export const ADD_TAG = gql`
  mutation addTag($name: String!) {
    addTag(name: $name) {
      _id
      name
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($user: ID!, $friend: ID!, $status: String!) {
    addFriend(user: $user, friend: $friend, status: $status) {
      _id
      status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $username: String
    $email: String
    $password: String
    $firstName: String
    $lastName: String
  ) {
    updateUser(
      _id: $_id
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      _id
      username
      email
      firstName
      lastName
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation updateBusiness(
    $_id: ID!
    $name: String!
    $email: String
    $phoneNumber: String
    $bio: String
    $image: [String]
    $website: String
    $location: String
  ) {
    updateBusiness(
      _id: $_id
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      bio: $bio
      image: $image
      website: $website
      location: $location
    ) {
      _id
      name
      email
      phoneNumber
      bio
      image
      website
      location
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $_id: ID!
    $bio: String
    $birthday: String
    $location: String
    $country: String
    $image: String
  ) {
    updateProfile(
      _id: $_id
      bio: $bio
      birthday: $birthday
      location: $location
      country: $country
      image: $image
    ) {
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
    $image: String
    $ingredients: [String]!
    $allergens: [String]!
  ) {
    updateCocktail(
      cocktailId: $cocktailId
      name: $name
      description: $description
      image: $image
      ingredients: $ingredients
      allergens: $allergens
    ) {
      _id
      name
      description
      image
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
    $image: String
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

export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      _id
    }
  }
`;

export const REMOVE_COCKTAIL = gql`
  mutation removeCocktail($cocktailId: ID!) {
    removeCocktail(cocktailId: $cocktailId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($_id: ID!, $user: ID!, $friend: ID!) {
    removeFriend(_id: $_id, user: $user, friend: $friend) {
      _id
    }
  }
`;

export const REMOVE_CHEERS = gql`
  mutation removeCheers($reviewId: ID!) {
    removeCheers(reviewId: $reviewId) {
      _id
    }
  }
`;

export const LIKE_BUSINESS = gql`
  mutation likeBusiness($_id: ID!) {
    likeBusiness(_id: $_id) {
      _id
    }
  }
`;

export const UNLIKE_BUSINESS = gql`
  mutation unlikeBusiness($_id: ID!) {
    unlikeBusiness(_id: $_id) {
      _id
    }
  }
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest(
    $_id: ID!
    $user: ID!
    $friend: ID!
    $status: String!
  ) {
    acceptFriendRequest(
      _id: $_id
      user: $user
      friend: $friend
      status: $status
    ) {
      _id
      status
    }
  }
`;