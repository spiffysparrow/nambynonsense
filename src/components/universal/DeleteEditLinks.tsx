import * as React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  GET_POEMS,
  IGetPoemsResponse,
} from "src/components/manyPoemViews/graphql";

const DELETE_POEM = gql`
  mutation DeletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
      passage
    }
  }
`;

const GET_POEM_AUTHOR = gql`
  query GetSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      author {
        id
      }
    }
    current {
      id
    }
  }
`;

const DeleteEditLinksWData = ({ poemId }: { poemId: number }) => (
  <Query query={GET_POEM_AUTHOR} variables={{ id: Number(poemId) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <DeleteEditLinks
          isCurrentUser={
            data.current && data.current.id === data.poem.author.id
          }
          poemId={poemId}
        />
      );
    }}
  </Query>
);

const DeleteEditLinks = ({
  isCurrentUser,
  poemId,
}: {
  isCurrentUser: boolean;
  poemId: number;
}) => (
  <div className="delete-edit-links">
    {isCurrentUser && (
      <span>
        <Mutation
          mutation={DELETE_POEM}
          update={(cache, { data: { deletePoem } }) => {
            let allPoems;
            let myPoems;
            try {
              // update two different fetches (one with author)
              // inside try cause throws error if cache isn't found
              // which happens if you haven't gone to both pages
              allPoems = cache.readQuery<IGetPoemsResponse, {}>({
                query: GET_POEMS,
                variables: { offset: 0, authorId: 3 },
              });
              const items = allPoems.poems.items.filter(
                p => p.id !== deletePoem.id,
              );
              cache.writeQuery({
                query: GET_POEMS,
                variables: { offset: 0, authorId: 3 },
                data: {
                  poems: {
                    items,
                  },
                },
              });
            } catch (e) {
              console.warn(e);
            }
            try {
              myPoems = cache.readQuery({
                query: GET_POEMS,
                variables: { offset: 0 },
              });
              cache.writeQuery({
                query: GET_POEMS,
                variables: { offset: 0 },
                data: {
                  poems: myPoems.poems.filter(p => p.id !== deletePoem.id),
                },
              });
            } catch (e) {
              console.warn(e);
            }
          }}
        >
          {(deletePoem, { data }) => (
            <a
              href="#"
              onClick={() =>
                confirm("Are you sure you want to delete your poem?") &&
                deletePoem({ variables: { id: poemId } })
              }
            >
              delete
            </a>
          )}
        </Mutation>
        {" / "}
        <Link to={`/edit/write/${poemId}`}>edit</Link>
      </span>
    )}
  </div>
);
export default DeleteEditLinksWData;
