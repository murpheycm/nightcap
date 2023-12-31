import { gql } from "@apollo/client";


export const QUERY_USER_PROFILE = gql`
query getUser($username: String!) {
  user(username: $username) {
    _id
    username
    email
    firstName  # Corrected the field name
    lastName
    profile {
      _id
      bio
      profileImage
      birthday
      location
      country
    }
  }
}
`;

  export const QUERY_USER = gql`
    query getUser($username: String!) {
          user(username: $username) {
            _id
            username
            email
            profile {
              _id
              bio
              profileImage
            }
            reviews {
              _id
              title
              text
              image
              thumbUpCount
              thumbDownCount
              comments {
                _id
                comment
                createdAt
          }
        }
      }
    }
  `;

  export const GET_ALLERGENS = gql`
    query getAllergens {
      allergens {
        _id
        name
      }
    }
  `;

  export const GET_TAGS = gql`
    query getTags {
      tags {
        _id
        name
      }
    }
  `;


// export const QUERY_HOME = gql`
//   query getUser($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       profile {
//         _id
//         bio
//         profileImage
//       }
//       reviews {
//         _id
//         title
//         text
//         image
//         thumbUpCount
//         thumbDownCount
//         comments {
//           _id
//           comment
//           createdAt
//         }
//       }
//     }
//   }
// `;

// // left this super simple for now - if we wanted a simple list of all users
// export const QUERY_USERS = gql`
//   query getUsers {
//     users {
//       _id
//       username
//       profile {
//         profileImage
//       }
//     }
//   }
// `;


// export const QUERY_BUSINESS = gql`
//   query getFriendsReviews($username: String!) {
//     getFriendsReviews(username: $username) {
//       _id
//       username
//       reviewDate: date
//       review {
//         _id
//         cocktail {
//           _id
//           name
//           business {
//             _id
//             name
//           }
//         }
//         title
//         text
//         image
//         rating
//         date
//       }
//     }
//   }
// `;

// export const QUERY_BUSINESSES = gql`
//   query getUserReviews($username: String!) {
//     getUserReviews(username: $username) {
//       _id
//       username
//       reviewDate: date
//       review {
//         _id
//         cocktail {
//           _id
//           name
//           business {
//             _id
//             name
//           }
//         }
//         title
//         text
//         image
//         rating
//         date
//       }
//     }
//   }
// `;

// export const QUERY_REVIEW = gql`
//   query getReview($reviewId: ID!) {
//     review(reviewId: $reviewId) {
//       _id
//       user {
//         _id
//         username
//       }
//       cocktail {
//         _id
//         name
//       }
//       title
//       text
//       image
//       thumbUpCount
//       thumbDownCount
//       comments {
//         _id
//         comment
//         createdAt
//       }
//     }
//   }
// }`;

// export const QUERY_ALL_REVIEWS = gql`
//   query getReviews {
//     reviews {
//       _id
//       title
//       createdAt
//       user {
//         _id
//         username
//       }
//       cocktail {
//         _id
//         name
//       }
//     }
//   }
// `;

// export const QUERY_ALL_REVIEWS_BY_COCKTAIL = gql`
//   query getReviewsByCocktail($cocktailId: ID!) {
//     reviews(cocktailId: $cocktailId) {
//       _id
//       title
//       createdAt
//       user {
//         _id
//         username
//       }
//       cocktail {
//         _id
//         name
//       }
//     }
//   }
// `;

// export const QUERY_ALL_COCKTAILS = gql`
//   query getCocktails {
//     cocktails {
//       _id
//       name
//       description
//       ingredients
//     }
//   }
// `;

// export const QUERY_COCKTAIL = gql`
//   query getCocktail($cocktailId: ID!) {
//     cocktail(cocktailId: $cocktailId) {
//       _id
//       name
//       description
//       ingredients
//       allergens
//       tags {
//         _id
//         name
//       }
//     }
//   }
// `;
