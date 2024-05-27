import Image from "next/image";
import { Todo } from "./Components/Todo";
import { Modal } from "antd";
import { ModalTemplate } from "./Components/Modal";

export default function Home() {
  console.log('%c Is it green ?: %c  No blue', `color: green; font-size: 20px`, `color: blue; font-size: 20px`)
  return (
    <main className="h-screen w-screen relative font-sans bg-slate-200 ">
      <Todo />
      <div className="absolute bottom-4  flex justify-center w-full  font-light font-mono text-sm  ">{` @  Percy-- &&-- Jesse `}</div>
    </main>
  );
}
