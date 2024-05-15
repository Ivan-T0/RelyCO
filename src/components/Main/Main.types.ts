export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  location: {
    name: string;
  };
  episode: string[];
}

export interface MainState {
  input: string;
  characters: Character[];
  searchResults: Character[];
  status: string;
  episode: string;
  currentPage: number;
  totalPages: number;
  searched: boolean;
}
