import { useLocation } from "react-router";
import styled from "styled-components";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import axios from "axios";
import React, { useState } from "react";
import { SingleContent } from "../components/SingleContent/SingleContent";
import SearchIcon from "@material-ui/icons/Search";


const ContentBuscar = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color: #141414;
  margin-top:72px;
`;
const ContentInput = styled.div`
  width: 100%;
`;
const ButtonSearch = styled.button`
  width: 10%;
  height:100px;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-size: 40px;
  cursor: pointer;
/*   @media (max-width: 1200px) {
    width: 15%;
  } */
`
const InputSearch = styled.input`
  width: 90%;
  background-color: rgb(75, 78, 90);
  border: none;
  outline: none;
  height: 100px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  padding-left: 5%;
/*   @media (max-width: 1200px) {
    width: 85%;

  } */
`;

const BodySearch = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding:20px;
  width: 70%;
  min-height:100vh;
`;

export const BusquedaScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    searchText: q,
  });
  const { searchText } = formValues;
  const [content, setContent] = useState([]);
  
  const buscarPelicula = async (query) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=3c10d1cb4174fb0e29e61cd194e5ecf4&query=${query}`
    );
    
    setContent(data.results);
    console.log(data.results);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    history.push(`?q=${searchText}`);
    buscarPelicula(searchText)
  };
  console.log(history);

  return (
    <ContentBuscar>
      <ContentInput>
        <form onSubmit={handleSearch}>
          <InputSearch
            type="text"
            placeholder="Titulo de la pelicula"
            name="searchText"
            autoComplete="off"
            value={searchText}
            onChange={handleInputChange}
          />
          <ButtonSearch type="submit"> <SearchIcon fontSize="large" /></ButtonSearch>
        </form>
      </ContentInput>

      <BodySearch>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </BodySearch>

    </ContentBuscar>
  );
};
