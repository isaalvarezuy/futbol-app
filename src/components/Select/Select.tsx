import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useRef, useState } from "react";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  register?: any;
  errors?: any;
  name: string;
  options: SelectOption[];
}
interface SelectOption {
  label: string;
  value: string;
}
const Select = ({ register, name, options, errors }: SelectProps) => {
  const hasError = !!errors[name];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  useOnClickOutside(selectRef, () => setIsOpen(false));

  const handleChange = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      <input
        type="text"
        readOnly
        className={`w-full h-10 px-3 py-2  border border-gray-200 rounded-md 
        ${hasError ? "border-red-500" : ""} `}
        {...register(name)}
        value={selectedOption.label}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute w-full px-1 bg-white border border-gray-200 rounded-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-2 py-2 rounded hover:bg-gray-100"
              onClick={() => {
                handleChange(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {/*  <select {...register("team1")}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default Select;
