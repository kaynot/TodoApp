import Image from "next/image";
import { Todo } from "./Components/Todo";
import { Modal } from "antd";
import { ModalTemplate } from "./Components/Modal";

export default function Home() {
  return (
    <main className="h-screen w-screen font-sans bg-slate-100 ">
      <Todo />
    </main>
  );
}
