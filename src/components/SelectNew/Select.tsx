import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from "react";
import classnames from "classnames";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import IconWrapper from "../IconWrapper/IconWrapper";
import { ChevronDown } from "react-feather";
import "./Select.css";

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
          >
            {options.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 h-full pointer-events-none">
            <IconWrapper>{<ChevronDown />}</IconWrapper>
          </div>
        </div>
      </FieldWrapper>
    );
  }
);

export default SelectNew;
