import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
};
function ChatRow({ id }: Props) {
  const { data: session } = useSession();
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
    // sets to true if the pathname includes the id
    // running once --> then still after the {pathname} rerenders
    // remember variables out of the useEffect must be included in the [dependancy array]
  }, [pathname]);

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  // messages?.docs.map((doc) => console.log(doc.data()));
  const newMessages = messages?.docs[messages?.docs.length - 1]?.data();
  const realMessage = newMessages?.message?.text;
  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5 text-gray-700" />
      <p className="flex-1 hidden md:inline-flex truncate ">
        {messages?.docs[messages?.docs.length - 1]?.data().message?.text ||
          realMessage ||
          "New Chat"}
      </p>

      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
}

export default ChatRow;
