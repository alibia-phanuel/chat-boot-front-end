import LayoutSystem from "./share/LayoutSystem";
import { ScrollArea } from "../components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { GrSend } from "react-icons/gr";
import { useState } from "react";

import { motion } from "framer-motion";
import logo from "../public/assets/logo.png";
import { FaImage } from "react-icons/fa6";
const getRandomPhoneNumber = () => {
  return `+237 ${Math.floor(Math.random() * 1000)} ${Math.floor(
    Math.random() * 100
  )} ${Math.floor(Math.random() * 1000)}`;
};

const getRandomTime = () => {
  const times = ["5 min", "10 min", "22 min", "1h", "2h", "Yesterday"];
  return times[Math.floor(Math.random() * times.length)];
};

const contacts = Array.from({ length: 20 }, () => ({
  phoneNumber: getRandomPhoneNumber(),
  message: "Nice to meet you",
  time: getRandomTime(),
}));
// Définition de l'interface pour un message
interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const ChatbootContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // Définition des états pour stocker les messages et l'entrée utilisateur
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  // Fonction pour envoyer un message texte
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: "Je vais vérifier cela pour vous ! 😊",
        },
      ]);
    }, 1000);
  };

  return (
    <LayoutSystem>
      <div className=" h-[calc(100vh-70px)] flex justify-center ">
        <div className="container my-4 flex gap-2 max-md:flex-wrap">
          <div className="w-[500px] max-md:w-full h-full  border rounded-t-lg rounded-lg flex flex-col">
            <div className="w-full h-[100px] border-b flex items-center p-4 gap-3">
              <Avatar className="flex justify-center items-center border">
                <AvatarImage src={logo} className="w-[30px] h-[30px]" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <p>Yoanh</p>
                  <span className="bg-green-600 w-3 h-3 rounded-full">.</span>
                </div>
                <p className="text-sm italic">En ligne</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-hidden">
              <ScrollArea className="h-[calc(100%-0px)] w-full p-4">
                <div className="max-w-lg mx-auto bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-lg">
                  {contacts.map((contact, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`flex items-start relative border-b pb-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 py-2 px-2 ${
                        selectedIndex === index ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="flex-shrink-0 self-center ltr:mr-4 rtl:ml-4 relative">
                        <img
                          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                          className="rounded-full h-8 w-8"
                          alt="Avatar"
                        />
                        <span className="absolute h-1.5 w-1.5 bg-gray-500 rounded-full ring-2 ring-white bottom-0.5"></span>
                      </div>

                      <div className="flex-grow overflow-hidden">
                        <h5 className="text-gray-700 dark:text-gray-100 text-sm mb-1">
                          {contact.phoneNumber}
                        </h5>
                        <p className="mb-0 text-gray-500 dark:text-zinc-100 text-sm">
                          {contact.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="text-11 dark:text-zinc-100">
                          {contact.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className=" flex-1 max-md:w-full  rounded-md border   flex flex-col">
            <div className="w-full h-[100px] bordr-b border-b border-gray-200 flex  items-center ">
              <div className="flex items-center p-4 gap-3">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    className="w-[30px] h-[30px]"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p>+237 391 41 102</p>
                    <span className="bg-green-600 w-3 h-3 rounded-full">.</span>
                  </div>
                  <p className="text-sm italic">En ligne</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-hidden">
              <ScrollArea className="h-[calc(100%-0px)] w-full  p-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg max-w-xs ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white self-end ml-auto" // Aligné à droite pour l'utilisateur
                        : "bg-gray-200 text-gray-900 self-start" // Aligné à gauche pour le bot
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </ScrollArea>
            </div>
            <div className="w-full h-[100px] bg-white border-t border-gray-200">
              <div className="p-3 'border-t border-gray-100 dark:border-zinc-600">
                <div className="flex items-center ">
                  <div className="col-span-10 xl:col-span-11 ltr:pr-5 rtl:pl-5 flex-1">
                    <div className="position-relative flex  items-cente  justify-center gap-3  'border-gray-100 dark:border-zinc-600">
                      <label className="cursor-pointer mr-2">
                        <FaImage className="text-gray-500 text-xl" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Écrivez un message..."
                        className="py-1.5  outline-none border-b px-4 rounded border-gray-100 w-full placeholder:text-sm placeholder:text-gray-400 dark:bg-zinc-700/50 dark:border-zinc-600"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 xl:col-span-1  mx-2 h-full">
                    <button
                      onClick={sendMessage}
                      type="submit"
                      className="btn flex items-center p-2 rounded-lg bg-[#3B82F6] border-transparent text-white shadow-md shadow-violet-200 w-full focus:ring focus:ring-violet-200 dark:shadow-zinc-600"
                    >
                      <span className="d-none d-sm-inline-block mr-2">
                        Envoyer
                      </span>{" "}
                      <GrSend />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutSystem>
  );
};

export default ChatbootContainer;
const initialMessages: Message[] = [
  {
    id: 1,
    sender: "bot",
    text: "Bonjour ! Vous cherchez un produit spécifique en e-commerce ?",
  },
  {
    id: 2,
    sender: "user",
    text: "Oui, je cherche un smartphone performant à bon prix.",
  },
  {
    id: 3,
    sender: "bot",
    text: "Je vous recommande le Xiaomi Redmi Note 12, un excellent rapport qualité/prix !",
  },
  { id: 4, sender: "user", text: "Super ! Est-il disponible en stock ?" },
  {
    id: 5,
    sender: "bot",
    text: "Oui, en plusieurs coloris. Vous souhaitez une livraison rapide ?",
  },
  {
    id: 6,
    sender: "user",
    text: "Oui, en combien de temps puis-je le recevoir ?",
  },
  {
    id: 7,
    sender: "bot",
    text: "La livraison express prend 24h, sinon sous 3 jours ouvrés.",
  },
];
