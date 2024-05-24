"use client";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React from "react";
import Delete from "../imgs/delete.png";
import Image from "next/image";

export const Todo = () => {
  const [task, setTask] = React.useState<any>("");
  const [taskList, setTaskList] = React.useState<any[]>([]);

  const addTask = () => {
    setTaskList([...taskList, { id: taskList.length + 1, task: task }]);
    setTask("");
  };
  const deleteTask = (taskIndex: number) => {
    const filteredTasks = taskList.filter(({ id }) => id !== taskIndex);
    setTaskList(filteredTasks);
  };
  return (
    <main className="w-full h-full grid justify-center items-center p-[5%]">
      <h1 className="text-center text-3xl font-bold py-2">TODO 📋</h1>
      <div className="w-[35rem] h-[45rem] p-5 border rounded-lg bg-white shadow-xl">
        <div className="flex justify-center space-x-2 rounded-2xl ">
          <input
            type="text"
            className="w-[90%] h-full border border-black p-5 rounded-2xl"
            onChange={(e: any) => {
              setTask(e.target.value);
            }}
            value={task}
          />
          <button
            className="w-[10%] p-3 bg-black text-white border rounded-xl"
            onClick={addTask}
          >
            +
          </button>
        </div>
        <section className="border   rounded-lg p-5 w-full h-[35rem] mt-[8%] relative overflow-scroll">
          {/* <div className=""> */}
            {taskList.map(({ task, id }) => (
              <div
                key={id}
                className="flex justify-between p-2 border rounded-lg w-[29rem] h-[5rem] mt-1 border-black "
              >
                <p className="py-5 pl-2 text-black">{task}</p>
                <div className="flex space-x-2">
                  <EditFilled style={{ fontSize: "24px", cursor: "pointer" }} />
                  <DeleteFilled
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => deleteTask(id)}
                  />
                </div>
              </div>
            ))}
          {/* </div> */}
        </section>
      </div>
    </main>
  );
};
