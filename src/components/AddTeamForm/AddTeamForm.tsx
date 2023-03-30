import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import CardWrapper from "../CardWrapper/CardWrapper";
import Input from "../Input/Input";
import { Shield } from "react-feather";

const AddTeamForm = () => {
  const { register, formState: errors, handleSubmit, watch } = useForm();

  const fileWatcher = watch("crest");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (fileWatcher && fileWatcher[0]) {
      setPreview(URL.createObjectURL(fileWatcher[0]));
    }
  }, [fileWatcher]);

  useEffect(() => {
    console.log(preview);
  }, [preview]);

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("crest", data.crest);
    formData.append("name", data.name);
    

    /*  const res = await fetch("http://localhost:3001/add-team", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    console.log(res); */
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadCrest = () => {
    inputRef!.current!.click();
  };

  return (
    <CardWrapper title="Add Team">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <Input errors={errors} type="text" {...register(`name`)} />
        <div className="flex gap-2">
          <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            {!preview ? (
              <Shield className="h-6 w-6 text-gray-400" />
            ) : (
              <img src={preview} className="h-7" />
            )}
          </div>
          <Button variant="secondary" onClick={handleUploadCrest}>
            Upload crest
          </Button>
        </div>
        <input
          type="file"
          {...register(`crest`)}
          ref={(e) => {
            const { ref } = { ...register("crest") };
            ref(e);
            inputRef.current = e;
          }}
          multiple={false}
          hidden
        />
        <button type="submit">submit</button>
      </form>
    </CardWrapper>
  );
};

export default AddTeamForm;
