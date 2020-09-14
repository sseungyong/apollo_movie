import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    # for Apollo
    movie(id: $id) {
      # for server
      id
      title
      rating
      language
      medium_cover_image
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 100px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 25px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  margin-right: 100px;
`;

export default () => {
  let { id } = useParams();
  id = parseInt(id);
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>
          {loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "♥" : "♨"}`}
        </Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster></Poster>
      {/* <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}></Poster> */}
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};
