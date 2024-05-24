"use client";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import Delete from "../imgs/delete.png";
import Image from "next/image";
import { ModalTemplate } from "./Modal";
import { title } from "process";
import { message } from "antd";

export const Todo = () => {
  const [task, setTask] = React.useState<any>("");
  const [taskList, setTaskList] = React.useState<any[]>([]);

  const addTask = () => {
    setTaskList([...taskList, { id: taskList.length + 1, task: task }]);
    setTask("");
  };
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const deleteTask = (taskIndex: number) => {
    const filteredTasks = taskList.filter(({ id }) => id !== taskIndex);
    setTaskList(filteredTasks);
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<any>({
    message: "",
    title: "",
    okText: "",
    cancelText: "",
  });
  const validate = {
    message: "Please enter a task!",
    title: "Field Required!",
    okText: "Ok",
  };
  const deleteModal = {
    message: "Are you sure you want to delete this task?",
    title: "Delete Task",
    okText: "Yes",
    cancelText: "No",
  };
  const deleteTaskModal = (id: number) => {
    setTaskIdToDelete(id);
    setShowModal(deleteModal);
    setIsModalOpen(true);
  };
  const validateTask = () => {
    if (task === "") {
      setShowModal(validate);
      setIsModalOpen(true);
    } else {
      addTask();
    }
  };

  return (
    <>
      <ModalTemplate
        title={showModal.title}
        message={showModal.message}
        open={isModalOpen}
        okText={showModal.okText}
        cancelText={showModal.cancelText}
        disabledCancel={
          showModal.message === "Please enter a task!" ? true : false
        }
        onOk={() => {
          showModal.title === "Delete Task"
            ? deleteTask(taskIdToDelete ?? 0)
            : setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
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
             <Tooltip title="Add Task" color={"black"} style={{fontFamily:"sans-serif"}}>
            <button
              className="w-[10%] p-3 bg-black text-white border rounded-xl"
              onClick={validateTask}
            >
              +
            </button>
            </Tooltip>
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
                <Tooltip title="Edit Task" color={"black"}>
                  <EditFilled style={{ fontSize: "24px", cursor: "pointer" }} />
                </Tooltip>
                <Tooltip title="Delete Task" color={"red"} style={{fontFamily:"sans-serif"}} >
                  <DeleteFilled
                    style={{ fontSize: "24px", cursor: "pointer" }}
                    onClick={() => deleteTaskModal(id)}
                  />
                </Tooltip>
                </div>
              </div>
            ))}
            {/* </div> */}
          </section>
        </div>
      </main>
    </>
  );
};
