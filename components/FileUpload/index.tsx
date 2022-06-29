import React, { useState } from "react";

const FileUpload: React.FC<{
  onDataDelivered: (data: Workout[]) => void;
}> = ({ onDataDelivered }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {
    /* Prevent form from submitting by default */
    e.preventDefault();

    /* If file is not selected, then show alert message */
    if (!inputFileRef.current?.files?.length) {
      alert("Please, select file you want to upload");
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      message: string;
      workouts: Workout[];
    };

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
      if (body.workouts) {
        // sort workouts by date
        const sortedWorkouts = body.workouts.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate.getTime() - aDate.getTime();
        });
        onDataDelivered(sortedWorkouts);
      }
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form className="">
      <div>
        <input type="file" name="myfile" ref={inputFileRef} />
      </div>
      <div>
        <input
          type="submit"
          value="Upload"
          disabled={isLoading}
          onClick={handleOnClick}
        />
        {isLoading && ` Wait, please...`}
      </div>
    </form>
  );
};

export default FileUpload;
