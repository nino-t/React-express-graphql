const grapql = require('graphql')
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = grapql

var books = [
  {id: '1', name: 'Buku A', genre: 'Horor', authorId: '1'},
  {id: '2', name: 'Buku B', genre: 'Komedi', authorId: '2'},
  {id: '3', name: 'Buku C', genre: 'Historical', authorId: '3'}
]

var authors = [
  {id: '1', name: 'Nino', age: 20},
  {id: '2', name: 'Hendra', age: 24},
  {id: '3', name: 'Budi', age: 30}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        console.log(typeof(args.id))
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return _.find(authors, {id: args.id})
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve (parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})