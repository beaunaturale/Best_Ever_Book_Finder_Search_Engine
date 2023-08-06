import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username,
        email,
      }
      token
    }
  }
`
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`
export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput) {
  saveBook(BookInput: $input) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
        }
    }
}
`