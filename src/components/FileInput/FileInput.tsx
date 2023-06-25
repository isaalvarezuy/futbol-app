import classnames from "classnames";
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ComponentType,
  ForwardedRef,
  forwardRef,
  useRef,
  useState,
} from "react";
import Button from "../Button/Button";
import { File, IconProps } from "react-feather";

interface FileInputProps {
  label?: string;
  error?: any;
  Placeholder?: ComponentType<IconProps>;
}

const FileInputNew = forwardRef(
  (
    {
      label = "File",
      error,
      Placeholder = File,
      ...rest
    }: ComponentPropsWithoutRef<"input"> & FileInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
      if (!inputRef.current) return;
      inputRef.current.click();
    };
    const [preview, setPreview] = useState("");

    const updateFilePreview = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const previewUrl = URL.createObjectURL(e.target.files[0]);
        setPreview(previewUrl);
      }
    };
    return (
      <div className="flex gap-2 items-center">
        <input
          type="file"
          ref={(e) => {
            if (ref) {
              if (typeof ref === "function") {
                ref(e);
              } else {
                ref.current = e;
              }
            }
            inputRef.current = e;
          }}
          className={classnames(
            "hidden w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md font-body",
            error && "border-red-600"
          )}
          {...rest}
          onChange={(e) => {
            rest.onChange && rest.onChange(e);
            updateFilePreview(e);
          }}
        />
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
          {!preview ? (
            <Placeholder className="h-5 w-5 text-gray-400" />
          ) : (
            <img src={preview} className="h-7" alt="Upload preview" />
          )}
        </div>
        <Button className="shrink-0" variant="secondary" onClick={handleClick}>
          {preview ? "Update" : "Upload"} {label}
        </Button>
      </div>
    );
  }
);

export default FileInputNew;
