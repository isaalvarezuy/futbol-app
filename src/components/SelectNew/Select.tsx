import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactElement,
  forwardRef,
  useState,
} from "react";
import classnames from "classnames";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import IconWrapper from "../IconWrapper/IconWrapper";
import { ChevronDown } from "react-feather";
import Paragraph from "../Paragraph/Paragraph";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  error?: any;
  iconLeft?: ReactElement;
  options: SelectOption[];
}
const SelectNew = forwardRef(
  (
    {
      label,
      error,
      iconLeft,
      options,
      ...rest
    }: ComponentPropsWithoutRef<"select"> & SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <FieldWrapper label={label} error={error}>
        <div className="relative mt-2 rounded-md shadow-sm ">
          {iconLeft && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconWrapper>{iconLeft}</IconWrapper>
            </div>
          )}
          <select
            ref={ref}
            className={classnames(
              "w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body  ",
              error && "border-red-600",
              iconLeft && "pl-9"
            )}
            {...rest}
            /* className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" */
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 h-full">
            <IconWrapper>{<ChevronDown />}</IconWrapper>
          </div>
        </div>
      </FieldWrapper>
    );
  }
);

export default SelectNew;
