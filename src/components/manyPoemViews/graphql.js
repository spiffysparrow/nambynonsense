import gql from 'graphql-tag'

export const POEM_LIMIT = 4

export const GET_POEMS = gql`
  query GetPoems($offset: Int!, $authorId: ID) {
    poems(limit: ${POEM_LIMIT}, offset: $offset, authorId: $authorId) {
      count
      hasMore
      items {
        id
        styleId
        backgroundId
        colorRange
        textChunks {
          text
          isSelected
        }
        author {
          id
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`
