import { SortProps } from "./Sort.types";

const Sort: React.FC<SortProps> = ({ value, onChange }) => {
  return (
    <label className=" border border-black rounded-lg px-5 py-3 bg-white hover:border-orange-700">
      Episode:
      <select
        value={value}
        onChange={onChange}
        className="ml-2 bg-white border border-black rounded outline-none"
      >
        <option value="Up">Ascending</option>
        <option value="Down">Descending</option>
      </select>
    </label>
  );
};

export default Sort;
