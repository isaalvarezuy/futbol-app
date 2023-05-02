import React, {
  ChangeEvent,
  ComponentType,
  useEffect,
  useRef,
  useState,
} from "react";
import { File, IconProps } from "react-feather";
import Button from "../Button/Button";

interface Props {
  Placeholder?: ComponentType<IconProps>;
  label?: string;
  register?: any;
  watcher?: any;
}
const FileInput = ({
  Placeholder = File,
  label = "file",
  register,
  watcher,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (watcher && watcher[0]) {
      setPreview(URL.createObjectURL(watcher[0]));
    }
    if (!watcher) {
      setPreview("");
    }
  }, [watcher]);

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(previewUrl);
    }
    register?.onChange(e);
  };
  return (
    <div>
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
          {!preview ? (
            <Placeholder className="h-5 w-5 text-gray-400" />
          ) : (
            <img src={preview} className="h-7" />
          )}
        </div>
        <Button className="shrink-0" variant="secondary" onClick={handleClick}>
          {preview ? "Update" : "Upload"} {label}
        </Button>
      </div>
      <input
        type="file"
        {...register}
        ref={(e) => {
          if (register) {
            register?.ref(e);
          }
          inputRef.current = e;
        }}
        onChange={(e) => {
          handleFileChange(e);
        }}
        multiple={false}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
