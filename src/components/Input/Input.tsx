import { InputProps } from "./Input.types";
const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <label className=" border border-black rounded-lg px-5 py-3 bg-white hover:border-orange-700">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-0"
      />
    </label>
  );
};

export default Input;
