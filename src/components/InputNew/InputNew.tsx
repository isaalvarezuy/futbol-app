import {
  ComponentPropsWithoutRef,
  ComponentType,
  ForwardedRef,
  FunctionComponent,
  ReactElement,
  forwardRef,
} from "react";
import classnames from "classnames";
import InputWrapper from "../InputWrapper/InputWrapper";
import { injectProps } from "@/utils/injectProps";
import { Icon, IconProps } from "react-feather";
import { FieldError } from "react-hook-form";

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
      <InputWrapper label={label} error={error}>
        <div className="relative mt-2 rounded-md shadow-sm">
          {iconLeft && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              {injectProps(iconLeft, { className: "h-4 w-4" })}
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
              {injectProps(iconRight, { className: "h-4 w-4" })}
            </div>
          )}
        </div>
      </InputWrapper>
    );
  }
);

export default InputNew;
