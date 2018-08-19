import React from 'react'
import { gql, graphql } from 'react-apollo'

const Contacts = ({ data:{ loading, error, contacts } }) => {
  if (loading) {
    return <p>Loading</p>
  }

  if (error)  {
    return <p>{error.message}</p>
  }

  return (
    <ul>
      {
        contacts.map( contact => (
          <li key={contact.id}>
            {contact.firstName} {contact.lastName}
          </li> 
        ))
      }
    </ul>
  )
}

export const contactsListQuery = gql`
  query ContactsQuery {
    contacts {
      id
      firstName
      lastName
    }
  }
`

export default graphql(contactsListQuery)(Contacts)