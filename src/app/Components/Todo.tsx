'use client'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import React from 'react'

export const Todo = () => {
    const [task, setTask] = React.useState<any>('')
    const [taskList, setTaskList] = React.useState<any[]>([])

    const addTask = () => {
        setTaskList([...taskList, task]);
        setTask("");
    }
    const deleteTask = (taskIndex: number) => {
        setTaskList(prevTasks => prevTasks.filter((task, index) => index !== taskIndex));
    }
    return (
        <div className='w-screen h-screen'>
            <div className='flex justify-center mt-5 text-[40px] font-sans font-bold'>
                ToDo
            </div>
            <div className='h-full w-full flex justify-center'>
                <div className='flex justify-center mt-5 bg-white shadow-2xl rounded-3xl border-2 h-[70%] w-[30%]'>
                    <div className='w-[100%] h-[100%]'>
                        <div className='flex justify-center mt-5 gap-3 h-[8%] w-[100%]'>
                            <input type='text' className='border-2 rounded-xl border-black w-[80%] p-2' placeholder='Enter Task' onChange={(e: any) => { setTask(e.target.value) }} value={task} />
                            <div className='flex justify-center '>
                                <button className='bg-black text-white rounded-xl p-2 h-full w-10' onClick={addTask}>+</button>
                            </div>
                        </div>
                        <div className='mt-10 w-[100%] h-[100%]'>
                            {taskList.map((task: any, index:number) => (
                                                <div key={index} className='flex justify-center w-[100%] h-[100%]'>
                                                    <div className='bg-white w-[95%] h-[12%] rounded-2xl border-2 shadow-xl overflow-hidden overflow-x-scroll'>
                                                        <div className='p-4 flex gap-5'>
                                                            {task}
                                                            <div className='flex justify-end w-full gap-3'>
                                                                <EditFilled style={{ fontSize: "24px", cursor: "pointer" }} />
                                                                <DeleteFilled style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => deleteTask(index)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
            </div>
        </div>
    )
}