"use client";
import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModalSelection from "./ModalSelection";

import NewChat from "./NewChat";

function Sidebar() {
  const { data: session } = useSession();

  const [chats] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  // console.log(chats?.docs.map((doc) => doc.data()));

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 space-y-2">
        {/* NewChat Button */}
        <div>
          <NewChat />
        </div>

        {/* ModelSelection */}
        <div className="hidden md:inline">
          <ModalSelection />
        </div>

        {/* Chat list - map through them */}

        {chats?.docs.map((doc) => (
          <ChatRow key={doc.id} id={doc.id} />
        ))}
      </div>

      {/* users imahe */}
      {session && (
        <img
          src={session.user?.image!}
          alt="Profile Picture"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default Sidebar;
