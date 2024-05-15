const Filter = ({ value, onChange }) => {
  return (
    <label className=" border border-black rounded-lg px-5 py-3 bg-white hover:border-orange-700">
      Status:
      <select
        value={value}
        onChange={onChange}
        className="ml-2 bg-white border border-black rounded outline-none"
      >
        <option value="">Choose status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
    </label>
  );
};

export default Filter;
