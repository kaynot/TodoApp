import Image from "next/image";
import { Todo } from "./Components/Todo";

export default function Home() {
  return (
    <main className="h-screen w-screen font-sans bg-slate-100 ">
      <Todo />
    </main>
  );
}
