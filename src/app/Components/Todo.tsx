"use client";
import {
  CalendarFilled,
  CheckCircleFilled,
  ClockCircleFilled,
  DeleteFilled,
  EditFilled,
  HourglassFilled,
  SaveFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useState } from "react";
import Delete from "../imgs/delete.png";
import Image from "next/image";
import { ModalTemplate } from "./Modal";
import { title } from "process";
import { message } from "antd";
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import { DatePicker } from "antd";
import { Checkbox } from "antd";

export const Todo = () => {
  const [task, setTask] = useState<any>(""); // task state
  const [linethrough, setLinethrough] = useState<string>(""); // task state
  const [taskList, setTaskList] = useState<any[]>([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // date picker state
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task);

  const addTask = () => {
    // add task to the list
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
    // modal state
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
  //   const handleDone = (id: number) => {
  //     setTaskList(
  //       taskList.map((task) => {
  //         if (task.id === id) {
  //           return { ...task, isDone: !task.isDone };
  //         } else {
  //           return task;
  //         }
  //       })
  //     );
  //   };
  //   const handleCheck = (e: any) => {};

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
      <main className="w-full h-full grid justify-center items-center relative p-[5%] bg-yellow-img ">
        {/* <Image
          src={img1}
          alt="delete.png"
          className="w-[15%] ml-[42%] absolute"
        /> */}
        <Image
          src={img2}
          alt="delete.png"
          className="w-[20%] ml-[10%] absolute"
        />
        <h1 className="text-center font-mono text-3xl font-bold py-2">
          TODO 📋
        </h1>
        <div className="w-[35rem] h-[45rem] p-5 border rounded-lg  bg-white shadow-xl">
          <div className="flex justify-center space-x-2 rounded-2xl ">
            <input
              type="text"
              placeholder="What is the task Today?"
              className="w-[90%] h-full border border-black p-5 rounded-2xl"
              onChange={(e: any) => {
                setTask(e.target.value);
              }}
              value={task}
            />
            <Tooltip
              title="Add Task"
              color={"black"}
              style={{ fontFamily: "sans-serif" }}
            >
              <button
                className="w-[10%] p-3 bg-black text-white border rounded-xl"
                onClick={validateTask}
              >
                +
              </button>
            </Tooltip>
          </div>
          <section className="border   rounded-lg p-5 w-full h-[35rem] mt-[8%] relative overflow-scroll overflow-x-hidden">
            {/* <div className=""> */}
            {taskList.map(({ task, id }) => (
              <div
                key={id}
                className="flex justify-between p-2 border rounded-lg w-[29rem] h-[5rem] mt-1 border-black overflow-auto bg-yellow-img"
              >
                <Tooltip title="Check to complete " color={"black"}>
                  <Checkbox
                    onChange={(e) =>
                      e.target.checked
                        ? setLinethrough("line-through")
                        : setLinethrough("")
                    }
                    className="border-2 w-[25px] p-[2px] h-[25px] rounded-lg cursor-pointer border-black"
                  />
                  {/* <input type="checkbox" className="w-[15px] rounded-lg cursor-pointer "  onClick={()=> handleDone(id)} checked={task.isDone}/> */}
                </Tooltip>
                {editMode ? (
                  <input
                    type="text"
                    className="border border-black  rounded-lg w-[70%] p-2"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                ) : linethrough ? (
                  <s className="py-5 pl-2 text-black">{task}</s>
                ) : (
                  <p className={"py-5 pl-2 text-black " + linethrough}>
                    {task}
                  </p>
                )}
                <div className="flex space-x-2">
                  {editMode ? (
                    <Tooltip title="Update Task" color={"black"}>
                      <SaveFilled
                       style={{ fontSize: "24px", cursor: "pointer" }}
                       onClick={() => setEditMode(!editMode)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit Task" color={"black"}>
                      <EditFilled
                        style={{ fontSize: "24px", cursor: "pointer" }}
                        onClick={() => setEditMode(!editMode)}
                      />
                    </Tooltip>
                  )}
                  <Tooltip
                    title="Delete Task"
                    color={"red"}
                    style={{ fontFamily: "sans-serif" }}
                  >
                    <DeleteFilled
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => deleteTaskModal(id)}
                    />
                  </Tooltip>
                  {!linethrough ? (
                    <Tooltip
                      title="Task in progress"
                      color={"black"}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      <ClockCircleFilled
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "",
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Task Completed"
                      color={"green"}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      <CheckCircleFilled
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "green",
                        }}
                      />
                    </Tooltip>
                  )}
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
