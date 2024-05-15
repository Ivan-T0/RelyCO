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

export interface ListProps {
  characters: Character[];
}
