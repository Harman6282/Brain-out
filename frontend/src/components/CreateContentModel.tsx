import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function CreateContentModel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",
  }
  const [type, setType] = useState(ContentType.Youtube);
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
 
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/content`, { title, link, type }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });

    onClose();
  }
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center">
          <span className="bg-white w-80  p-4 rounded">
            <div className="flex justify-end">
              <div onClick={onClose}>
                <CrossIcon />
              </div>
            </div>
            <div>
              <label htmlFor="" className="flex">
                Title
              </label>
              <Input reference={titleRef} placeholder={"Title"} />
              <label htmlFor="" className="flex">
                Link
              </label>
              <Input reference={linkRef} placeholder={"Link"} />
              <div className="flex gap-2 mb-5">
                <Button
                  size="md"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  text="Youtube"
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  size="md"
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  text="Twitter"
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>
              <Button
                size="md"
                variant="primary"
                text="Add"
                onClick={addContent}
              />
            </div>
          </span>
        </div>
      )}
    </div>
  );
}
