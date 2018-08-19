const grapql = require('graphql')
const _ = require('lodash')

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = grapql

var books = [
  {id: '1', name: 'Buku A', ganre: 'Horor', authorId: '1'},
  {id: '2', name: 'Buku B', ganre: 'Komedi', authorId: '2'},
  {id: '3', name: 'Buku C', ganre: 'Historical', authorId: '3'}
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
    ganre: { type: GraphQLString },
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

module.exports = new GraphQLSchema({
  query: RootQuery
})