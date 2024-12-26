import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  async function signup() {
    const username = usernameRef.current?.value;
    console.log(username)
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
    });
    alert("signup succesfully");
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-md border min-w-72 p-5">
        <h1 className="text-center mb-5 text-2xl font-bold">Sign up</h1>
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <Button
          variant="primary"
          text="Sign up"
          size="md"
          fullWidth={true}
          onClick={() => {
            signup();
          }}
        />
      </div>
    </div>
  );
}
