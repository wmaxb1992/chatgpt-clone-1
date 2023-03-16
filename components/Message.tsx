import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};
function Message({ message }: Props) {
  // console.log(message);
  const isChatGpt = message.user.name == "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto ">
        <img src={message.user.avatar} className="h-8 w-8" alt="" />
        <p className="pt-1 text-xs">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
