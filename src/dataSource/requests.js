import gql from 'graphql-tag';

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
        teamCount
        annualReceipt
        description
      }
    }
  }
`;
