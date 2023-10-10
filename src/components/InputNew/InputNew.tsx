import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from "react";
import classnames from "classnames";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import IconWrapper from "../IconWrapper/IconWrapper";
import { twMerge } from "tailwind-merge";

interface InputProps {
  label?: string;
  error?: any;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  containerClassName?: string;
}
const InputNew = forwardRef(
  (
    {
      label,
      error,
      iconLeft,
      iconRight,
      className,
      containerClassName,
      ...rest
    }: ComponentPropsWithoutRef<"input"> & InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <FieldWrapper label={label} error={error} className={containerClassName}>
        <div className="relative mt-2 rounded-md shadow-sm">
          {iconLeft && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconWrapper>{iconLeft}</IconWrapper>
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              "w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body",
              error && "border-red-600",
              iconLeft && "pl-9",
              iconRight && "pr-9",
              className
            )}
            {...rest}
          />
          {iconRight && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconWrapper size={16}>{iconRight}</IconWrapper>
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  }
);

export default InputNew;
