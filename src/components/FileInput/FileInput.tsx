import React, { ChangeEvent, ComponentType, useRef, useState } from "react";
import { File, IconProps } from "react-feather";
import Button from "../Button/Button";

interface Props {
  Placeholder?: ComponentType<IconProps>;
  label?: string;
}
const FileInput = ({ Placeholder = File, label = "file" }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(previewUrl);
    }
  };
  return (
    <div>
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
          {!preview ? (
            <Placeholder className="h-5 w-5 text-gray-400" />
          ) : (
            <img src={preview} className="h-7" />
          )}
        </div>
        <Button variant="secondary" onClick={handleClick}>
          {preview ? "Update" : "Upload"} {label}
        </Button>
      </div>
      <input
        type="file"
        ref={inputRef}
        /*  {...register(`crest`)} */
        /*   ref={(e) => {
          const { ref } = { ...register("crest") };
          ref(e);
          inputRef.current = e;
        }} */
        onChange={handleFileChange}
        multiple={false}
        hidden
      />
    </div>
  );
};

export default FileInput;
