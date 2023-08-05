import { gql } from '@apollo/client';

export const GET_ME = gql`
    query meQuery {
        me {
            _id
            bookCount
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
            username
        }
    }
`