import { ListProps } from "./List.types";
import { HeartIcon } from "@heroicons/react/solid";

const List: React.FC<ListProps> = ({ characters }) => {
  const getStatusIconColor = (status: string): string => {
    switch (status) {
      case "Alive":
        return "text-green-500";
      case "Dead":
        return "text-black-500";
      default:
        return "text-gray-500";
    }
  };
  return (
    <ul className="flex flex-wrap justify-center items-center gap-10 bg-black pt-20">
      {characters.map((char, index) => (
        <li
          className="inline-block shadow-lg shadow-slate-400 p-5 border-teal-800 rounded bg-zinc-600  hover:bg-zinc-700 ease-in duration-200"
          key={index}
        >
          <img className="block mx-auto" src={char.image} alt={char.name} />
          <div className="ml-3">
            <h2 className="mt-5 text-sm font-medium text-white ">
              {char.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-white">
              Last known location: {char.location.name}
            </p>
            <div className="flex mt-2 ">
              <HeartIcon
                className={`w-5 h-5 ${getStatusIconColor(char.status)}`}
              />
              <p className="ml-2  text-sm font-medium text-white">
                Status: {char.status}
              </p>
            </div>

            <p className=" mt-2 text-sm font-medium text-white">
              Episode: {char.episode[0]}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default List;
