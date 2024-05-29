"use client";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditFilled,
  SaveFilled,
} from "@ant-design/icons";
import { DatePicker, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ModalTemplate } from "./Modal";
import img1 from "../imgs/img1.png";
import dayjs from "dayjs";
// import img2 from "../imgs/img2.png";

export const Todo = () => {
  const [task, setTask] = useState<any>(""); // task state
  const [linethrough, setLinethrough] = useState<string>(""); // task state
  const [taskList, setTaskList] = useState<any[]>([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // date picker state
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task);
  const [selectedDate, setSelectedDate] = useState();//date value

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
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    taskList.map((task: any) => ({ ...task, isDone: false }));
  }, []);
  console.log("tasklist", taskList);
  const handleDone = (id: number) => {
    setTaskList(
      taskList.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      })
    );
  };

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
      <main className="w-full h-full grid justify-center items-center relative p-[5%] ">
        <Image
          src={img1}
          alt="delete.png"
          className="w-[15%] ml-[42%] absolute"
        />
        {/* <Image
          src={img2}
          alt="delete.png"
          className="w-[20%] ml-[10%] absolute"
        /> */}
        <h1 className="text-center font-mono text-3xl font-bold py-2">
          TODO 📋
        </h1>
        <div className="w-[35rem] h-[45rem] p-5 border rounded-lg  bg-blue-400 shadow-xl ">
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
                className="w-[10%] p-3 bg-black text-black text-[25px] border rounded-xl bg-yellow-img "
                onClick={validateTask}
              >
                +
              </button>
            </Tooltip>
          </div>
          <section className="border   rounded-lg p-5 w-full h-[35rem] mt-[8%] relative overflow-scroll overflow-x-hidden ">
            {/* <div className=""> */}
            {taskList.map(({ task, id, isDone }) => (
              <div
                key={id}
                className="flex justify-between p-2 border rounded-lg w-[29rem] min-h-[5rem] mt-1 border-black  bg-yellow-img gap-2"
              >
                {!check ? (
                  <Tooltip title="Check to complete " color={"black"}>
                    <CheckCircleFilled
                      onClick={() => {
                        setCheck(!check);
                        handleDone(id);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Check to cancel" color={"red"}>
                    <CloseCircleFilled
                      onClick={() => setCheck(!check)}
                      style={{ color: "red" }}
                    />
                  </Tooltip>
                )}

                {/* <Checkbox
                    onChange={(e) =>
                      e.target.checked
                        ? setLinethrough("line-through")
                        : setLinethrough("")
                    }
                    className="border-2 w-[25px] p-[2px] h-[25px] rounded-lg cursor-pointer border-black"
                  /> */}
                {/* <input type="checkbox" className="w-[15px] rounded-lg cursor-pointer "  onClick={()=> handleDone(id)} checked={task.isDone}/> */}
                {/* </Tooltip> */}
                {editMode ? (
                  <input
                    defaultValue={task}
                    type="text"
                    className="border border-black  rounded-lg w-[70%] p-2 "
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                ) : taskList[0].isDone ? (
                  <s className="py-5 pl-2 text-black break-words w-[60%] ">
                    {task}
                  </s>
                ) : (
                  <p className={"py-5 pl-2 text-black break-words w-[60%]"}>
                    {task}
                  </p>
                )}
                <div className="flex space-x-2">
                  {editMode ? (
                    <Tooltip title="Update Task" color={"black"}>
                      <SaveFilled
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => setEditMode(!editMode)}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit Task" color={"black"}>
                      <EditFilled
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "blue",
                        }}
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
                      style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => deleteTaskModal(id)}
                    />
                  </Tooltip>
                  {!taskList[0].isDone ? (
                    <Tooltip
                      title="Set Due Date"
                      color={"black"}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {/* <Image
                        src={hourglass}
                        alt=""
                        className="w-[40%] cursor-pointer"
                        
                      />
                      */}

                      <ClockCircleFilled
                        style={{
                          fontSize: "24px",
                          cursor: "pointer",
                          color: "",
                        }}
                        onClick={() => setDatePickerVisible(true)}
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
                  {isDatePickerVisible && (
                    <DatePicker
                      open={isDatePickerVisible}
                      onOpenChange={setDatePickerVisible}
                      onChange={(date:any) => {setSelectedDate(date)}}
                    />
                  )}
                  <div className=" text-sm font-thin font-mono ">
                                    {!taskList[0].isDone ? (
                                        <> Due:{selectedDate ? dayjs(selectedDate).format('ddd/DD/MMM') : ''}</>
                                    ) : (
                                        "Completed"
                                    )}
                                    </div>
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
