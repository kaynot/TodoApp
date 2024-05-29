import Image from "next/image";
import { Todo } from "./Components/Todo";
import { Modal } from "antd";
import { ModalTemplate } from "./Components/Modal";

export default function Home() {
  return (
    <main className="h-screen w-screen relative font-sans bg-yellow-img">
      <Todo />
      <div className="absolute bottom-4  flex justify-center w-full  font-light font-mono text-sm   ">{` @  Percy-- && --Jesse `}</div>
    </main>
  );
}
