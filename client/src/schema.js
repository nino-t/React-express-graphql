export const typeDefs = `
  type contact {
    id: ID!
    firstName: String 
    lastName: String
  }

  type Query {
    contacts: [Contact]
  }
`