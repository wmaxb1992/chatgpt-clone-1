"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();
  // const [message] = useCollection(
  //   collection(db, "users", session?.user?.email!, "chats", id, "messages")
  // );

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );
  // console.log(messages?.docs.map((doc) => doc.data()));
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto ">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-[16px] text-white">
            Type a prompt to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}
      {messages?.docs.map((doc) => (
        <Message key={doc.id} message={doc.data()} />
      ))}
    </div>
  );
}

export default Chat;
