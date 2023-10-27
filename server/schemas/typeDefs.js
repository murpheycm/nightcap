const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        profile: Profile
        reviews: [Review]
    }

    type Business {
        _id: ID!
        name: String!
        email: String!
        profile: BusinessProfile
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
        profileImage: String
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
        rating: Nunber!
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
        business: Business
        image: String
    }

    type Image {
        _id: ID!
        url: String!
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
        comment: Comment
        review: Review
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
        profile(_id: ID!): Profile
        profiles: [Profile]
        businessProfile(_id: ID!): BusinessProfile
        businessProfiles: [BusinessProfile]
        cocktail(_id: ID!): Cocktail
        cocktails: [Cocktail]
        review(_id: ID!): Review
        reviews: [Review]
        image(_id: ID!): Image
        images: [Image]
        tag(_id: ID!): Tag
        tags: [Tag]
        comment(_id: ID!): Comment
        comments: [Comment]
        cheers(_id: ID!): Cheers
        cheersList: [Cheers]
        friends: [Friends]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        
        updateUser(_id: ID!, input: UserInput): User

        addBusiness(name: String!, email: String!, password: String!): Auth
        
        updateBusinessProfile(_id: ID!, input: BusinessProfileInput): BusinessProfile

        updateProfile(_id: ID!, input: ProfileInput): Profile

        addBusinessProfile(input: BusinessProfileInput): BusinessProfile
        
        updateBusinessProfile(_id: ID!, input: BusinessProfileInput): BusinessProfile

        addCocktail(input: CocktailInput): Cocktail
        
        updateCocktail(_id: ID!, input: CocktailInput): Cocktail

        addReview(input: ReviewInput): Review
        
        updateReview(_id: ID!, input: ReviewInput): Review

        addComment(input: CommentInput): Comment
        
        updateComment(_id: ID!, input: CommentInput): Comment

        addCheers(input: CheersInput): Cheers

        addTag(input: TagInput): Tag

        addFriend(input: FriendInput): Friend

        deleteFriend(_id: ID!, input: FriendInput): Friends
        
        updateFriend(_id: ID!, input: FriendInput): Friends
    }
`;

module.exports = typeDefs;
