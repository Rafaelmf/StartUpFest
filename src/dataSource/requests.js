import gql from 'graphql-tag';

// Definition of the query used on GraphQl.
// Retrieved just necessary data
export const ALL_SEGMENTS = gql`
  query {
    allSegments {
      id
      code
      name
      Startups {
        name
        imageUrl
        segment_id
        description
      }
    }
  }
`;
