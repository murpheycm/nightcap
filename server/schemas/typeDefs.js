const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        profile: Profile
        likedBusinesses: [Business]
        reviews: [Review]
        cocktails: [Cocktail]
        friends: [Friends]
    }

    type Business {
        _id: ID!
        name: String!
        email: String!
        profile: BusinessProfile
        likes: [User]
        image: String
        website: String
        location: String
        reviews: [Review]
        cocktails: [Cocktail]
    }

    type Profile {
        _id: ID!
        user: User!
        bio: String
        birthday: String
        location: String
        country: String
        image: String
    }

    type BusinessProfile {
        _id: ID!
        name: String!
        email: String
        phoneNumber: String
        bio: String
        businessImage: String
        website: String
        location: String
        reviews: [Review]
    }

    type Review {
        _id: ID!
        user: User!
        cocktail: Cocktail!
        title: String!
        text: String!
        rating: Float!
        image: String
        comments: [Comment]
        cheers: [Cheers]
        createdAt: String!
    }

    type Cocktail {
        _id: ID!
        name: String!
        description: String
        ingredients: [String]
        allergens: [String]
        reviews: [Review]
        tags: [Tag]
        user: User!
        business: Business
        image: String
    }

    type Tag {
        _id: ID!
        name: String!
    }

    type Comment {
        _id: ID!
        review: Review!
        user: User!
        comment: String!
        createdAt: String!
    }
    
    type Reaction {
        _id: ID!
        review: Review!
    }

    type Cheers {
        _id: ID!
        user: User!
        review: Review!
    }

    type Friends {
        user: User!
        friend: User!
        status: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(_id: ID!): User
        users: [User]
        business(_id: ID!): Business
        businesses: [Business]
        businessesLikedByUser(_id: ID!): [Business]
        profile(_id: ID!): Profile
        profiles: [Profile]
        cocktail(_id: ID!): Cocktail
        cocktails: [Cocktail]
        review(_id: ID!): Review
        reviews: [Review]
        userReviews(user: ID!): [Review]
        friendReviews(user: ID!, friend: ID!): [Review]
        tag(_id: ID!): Tag
        tags: [Tag]
        comment(_id: ID!): Comment
        comments: [Comment]
        cheers(_id: ID!): Cheers
        friends: [Friends]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, firstName: String, lastName: String): Auth
        updateUser(_id: ID!, email: String!, password: String!, firstName: String, lastName: String): User
        addBusiness(_id: ID!, name: String!, email: String, phoneNumber: String, bio: String, image: [String], website: String, location: String): Business
        updateBusiness(_id: ID!, name: String!, email: String, phoneNumber: String, bio: String, image: [String], website: String, location: String): BusinessProfile
        addProfile(_id: ID!, bio: String, birthday: String, location: String, country: String, image: String): Profile
        updateProfile(_id: ID!, bio: String, birthday: String, location: String, country: String, image: String): Profile
        addCocktail(_id: ID!, name: String!, description: String!, image: String, ingredients: [String], allergens: [String], tags: [String], business: ID, user: ID!): Cocktail
        updateCocktail(_id: ID!, name: String!, description: String!, image: String, ingredients: [String], allergens: [String], tags: [String], business: ID, user: ID): Cocktail
        removeCocktail(_id: ID!, User: ID!): Cocktail
        addReview(_id: ID!, user: ID!, cocktail: ID! title: String!, text:String!, rating: Float!, image: [String]): Review
        updateReview(_id: ID!, user: ID!, cocktail: ID! title: String!, text:String!, rating: Float!, image: [String]): Review
        removeReview(_id: ID!, user: ID!, cocktail: ID!): Review
        addComment(_id: ID!, review: ID!, user: ID!, comment: String!): Comment
        updateComment(_id: ID!, review: ID!, user: ID!, comment: String!): Comment
        removeComment(_id: ID!, review: ID!, user: ID!): Comment
        addCheers(_id: ID!, user: ID!, comment: ID, review: ID): Cheers
        removeCheers(_id: ID!, user: ID!, comment: ID, review: ID): Cheers
        addTag(_id: ID!, name: String!): Tag
        addFriend(_id: ID!, user: ID!, friend: ID!, status: String!): Friends
        acceptFriendRequest(_id: ID!, user: ID!, friend: ID!, status: String!): Friends
        removeFriend(_id: ID!, user: ID!, friend: ID!): Friends
        likeBusiness(_id: ID!): Business
        unlikeBusiness(_id: ID!): Business
        login(identifier: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
