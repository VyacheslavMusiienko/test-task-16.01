interface InputProps {
  filter: string;
  handleFilterChange: (value: string) => void;
  placeholder: string;
}
const Input = ({ filter, handleFilterChange, placeholder }: InputProps) => {
  return (
    <div className="text-center mb-3">
      <input
        type="text"
        placeholder={placeholder}
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="text-center"
      />
    </div>
  );
};

export default Input;
