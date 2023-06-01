import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactElement,
  forwardRef,
} from "react";
import classnames from "classnames";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import IconWrapper from "../IconWrapper/IconWrapper";

interface InputProps {
  label?: string;
  error?: any;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
}
const InputNew = forwardRef(
  (
    {
      label,
      error,
      iconLeft,
      iconRight,
      ...rest
    }: ComponentPropsWithoutRef<"input"> & InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <FieldWrapper label={label} error={error}>
        <div className="relative mt-2 rounded-md shadow-sm">
          {iconLeft && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconWrapper >{iconLeft}</IconWrapper>
            </div>
          )}
          <input
            ref={ref}
            className={classnames(
              "w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body",
              error && "border-red-600",
              iconLeft && "pl-9",
              iconRight && "pr-9"
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
