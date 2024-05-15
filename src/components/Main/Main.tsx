/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Input from "../Input/Input";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import List from "../List/List";
import { Character } from "./Main.types";

const Main = () => {
  const [input, setInput] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [status, setStatus] = useState<string>("");
  const [episode, setEpisode] = useState<string>("Up");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searched, setSearched] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    filterAndSortCharacters(characters, e.target.value, episode);
  };

  const handleEpisodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setEpisode(e.target.value);
    filterAndSortCharacters(characters, status, e.target.value);
  };

  const fetchData = async () => {
    try {
      const url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
      const response = await axios.get(url);
      const { data } = response;

      if (currentPage === 1) {
        setCharacters(data.results || []);
        setSearchResults(data.results || []);
      } else {
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...(data.results || []),
        ]);
        setSearchResults((prevResults) => [
          ...prevResults,
          ...(data.results || []),
        ]);
      }
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searched) {
      searchCharacters();
    }
  };

  const handlePageChange = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchData();
  };

  const searchCharacters = async () => {
    try {
      const url = `https://rickandmortyapi.com/api/character/?name=${input}`;
      const response = await axios.get(url);
      const { data } = response;
      setSearchResults(data.results || []);
      setSearched(true);
      // Оновлюємо сторінку після виконання пошуку
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching characters:", error);
    }
  };

  const filterAndSortCharacters = (
    characters: Character[],
    status: string,
    episode: string
  ) => {
    const filteredByStatus: Character[] =
      status === ""
        ? characters
        : characters.filter((char: Character) => char.status === status);

    const sortedCharacters: Character[] =
      episode === "Up"
        ? filteredByStatus.sort((charFir: Character, charSec: Character) => {
            const episodeNumberA: number = parseInt(
              charFir.episode[0].replace(
                "https://rickandmortyapi.com/api/episode/",
                ""
              )
            );
            const episodeNumberB: number = parseInt(
              charSec.episode[0].replace(
                "https://rickandmortyapi.com/api/episode/",
                ""
              )
            );
            return episodeNumberA - episodeNumberB;
          })
        : filteredByStatus.sort((charA: Character, charB: Character) => {
            const episodeNumberA: number = parseInt(
              charA.episode[0].replace(
                "https://rickandmortyapi.com/api/episode/",
                ""
              )
            );
            const episodeNumberB: number = parseInt(
              charB.episode[0].replace(
                "https://rickandmortyapi.com/api/episode/",
                ""
              )
            );
            return episodeNumberB - episodeNumberA;
          });

    setSearchResults(sortedCharacters);
  };

  return (
    <div className="">
      <form
        className="flex justify-center py-10 bg-gray-500 gap-5"
        onSubmit={handleSubmit}
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Search characters..."
        />
        <button
          className="border border-amber-500 rounded-lg px-6 py-2 bg-white hover:bg-orange-400 hover:text-white ease-in duration-200 "
          type="submit"
          onClick={searchCharacters}
        >
          Search
        </button>
        <Filter value={status} onChange={handleStatusChange} />
        <Sort value={episode} onChange={handleEpisodeChange} />
      </form>
      <div className="bg-black py-20">
        <List characters={searchResults} />

        {searchResults.length >= 10 && (
          <button
            onClick={handlePageChange}
            className="block border border-amber-500 rounded-lg px-6 py-2 mx-auto mt-10  bg-white hover:bg-orange-400 hover:text-white ease-in duration-200 "
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
