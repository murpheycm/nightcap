const { gql } = require("apollo-server-express");

const typeDefs = gql`
    User {
        _id: ID!
        username: String!
        email: String!
        profile: Profile
        reviews: [Review]
    }

    Business {
        _id: ID!
        name: String!
        email: String!
        profile: BusinessProfile
        reviews: [Review]
    }

    Profile {
        _id: ID!
        user: User!
        firstName: String
        lastName: String
        bio: String
        profileImage: String
    }

    BusinessProfile {
        _id: ID!
        user: BusinessUser!
        bio: String
        profileImage: String
        website: String
        location: String
        reviews: [Review]
    }

    Review {
        _id: ID!
        user: User!
        cocktail: Cocktail!
        title: String!
        text: String!
        image: String
        comments: [Comment]
        reactions: [Reaction]
        createdAt: String!
    }

    Cocktail {
        _id: ID!
        name: String!
        description: String
        ingredients: [String]
        allergens: [String]
        tags: [Tag]
    }

    Image {
        _id: ID!
        url: String!
    }

    Tag {
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

    type Follower {
        _id: ID!
        follower_id: User
        following_id: User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
        users: [User]
        cocktails: [Cocktail]
        cocktail(_id: ID!): Cocktail
        reviews: [Review]
        review(_id: ID!): Review
        images: [Image]
        image(_id: ID!): Image
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth

        addBusiness(name: String!, email: String!, password: String!): Auth

        login(email: String!, password: String!): Auth
        
        addProfile(firstName: String!, lastName: String, bio: String, profileImage: String): Profile

        addBusinessProfile(bio: String, profileImage: String, website: String, location: String): BusinessProfile

        addCocktail(name: String!, description: String, ingredients: [String], allergens: [String]): Cocktail

        addImage(url: String!): Image

        addReview(title: String!, text: String!): Review

        deleteReview(_id: ID!): Review

        addTag(name: String!): Tag

        addComment(comment: String!): Comment

        addReaction(reaction: String!): Reaction       
    }
`;

module.exports = typeDefs;
