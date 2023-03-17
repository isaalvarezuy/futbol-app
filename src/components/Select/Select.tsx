import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDown } from "react-feather";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  register?: any;
  errors?: any;
  name: string;
  options: SelectOption[];
  control: any;
}
interface SelectOption {
  label: string;
  value: string;
}
const Select = ({ register, name, options, errors, control }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter(({ label }) => {
          return label.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelectOption = (
    field: ControllerRenderProps<FieldValues, string>,
    option: SelectOption
  ) => {
    const { onChange } = field;
    setSelectedOption(option);
    onChange(option.value);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          <Combobox
            value={selectedOption}
            onChange={(value) => {
              handleSelectOption(field, value);
            }}
          >
            <div className="relative ">
              <div className="relative w-full cursor-default overflow-hidden bg-white text-left border rounded-md border-gray-200 hover:border-gray-300 ">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 text-sm leading-5 text-gray-900 focus:ring-0  focus:outline-none  "
                  displayValue={(option: SelectOption) => option.label}
                  onChange={(event) => setQuery(event.target.value)}
                  name={name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1  px-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <Combobox.Option
                        key={option.value}
                        className={({ active }) =>
                          `relative cursor-default select-none px-2 py-2 rounded-md ${
                            active ? "bg-gray-100" : ""
                          }`
                        }
                        value={option}
                      >
                        {option.label}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}
    />
  );
};

export default Select;
