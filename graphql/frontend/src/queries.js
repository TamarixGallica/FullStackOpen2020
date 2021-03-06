import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            title
            published
            author {
                id
                name
                born
            }
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            id
            title
            published
            author
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $birthYear: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $birthYear,
        ) {
            id
            name
            born
        }
    }
`