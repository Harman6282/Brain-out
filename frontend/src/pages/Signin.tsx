import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  async function signin() {
    const username = usernameRef.current?.value;
    console.log(username)
    const password = passwordRef.current?.value;
    const response =  await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
    });

    const jwt = response.data.token;
    localStorage.setItem("token" , jwt)

  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-md border min-w-72 p-5">
        <h1 className="text-center mb-5 text-2xl font-bold">Sign in</h1>
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <Button
          variant="primary"
          text="Sign in"
          size="md"
          fullWidth={true}
          onClick={() => {
            signin();
          }}
        />
      </div>
    </div>
  );
}
