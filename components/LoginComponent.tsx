"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function LoginComponent() {
  return (
    <div className="bg-[#11A37F] flex flex-col h-screen items-center text-center space-y-3">
      <Image
        src={"https://links.papareact.com/2i6"}
        width={300}
        height={300}
        alt=""
      />

      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse border p-2"
      >
        Sign In
      </button>
    </div>
  );
}

export default LoginComponent;
