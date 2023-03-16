"use client";
import useSWR from "swr";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../firebase";

type Props = {
  chatId: string;
};
function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  // fetcher
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  // const model = "text-davinci-003";
  const [prompt, setPrompt] = useState<string>("");
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      {
        message,
      }
    );

    // toast notifiction

    const notification = toast.loading("I'm thinking :)");
    await fetch(`/api/sendPrompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input, chatId, model, session }),
    }).then(() => {
      toast.success("chatGPT responded succesfully", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/70 text-gray-400 rounded-lg text-sm ">
      <form className="p-5 flex space-x-5" onSubmit={sendMessage}>
        <input
          type="text"
          value={prompt}
          disabled={!session}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt here..."
          className="bg-transparent focus:outline-none flex-1  disabled:text-gray-300"
        />
        <button
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
