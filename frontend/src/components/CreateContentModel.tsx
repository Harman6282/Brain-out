import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModel({ open, onClose }: { open: boolean, onClose: () => void }) {
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
                <label htmlFor="" className="flex">Title</label>
              <Input placeholder={"Title"} onChange={() => {}} />
              <label htmlFor="" className="flex">Type</label>

              <Input placeholder={"Type"} onChange={() => {}} />
              <label htmlFor="" className="flex">Link</label>

              <Input placeholder={"Link"} onChange={() => {}} />
              <Button
                size="md"
                variant="primary"
                text="Add"
                onClick={() => {}}
              />
            </div>
          </span>
        </div>
      )}
    </div>
  );
}

