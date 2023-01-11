import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import Swal from 'sweetalert2'
import axios from 'axios'

import { Modal } from '../components/Modal'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Input from '../components/Input'

import { useTitle } from "../utils/hooks/customHooks";
import { DatasType } from '../utils/type/todo'

const index = () => {
  const [editContent, setEditContent] = useState<string>("")
  const [inputTask, setInputTask] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [datas, setdatas] = useState<DatasType[]>([])
  const [idTask, setIdtask] = useState<number>()    
  useTitle("Home - Todo List App");
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  function fetchData() {
    axios.get(`https://api.todoist.com/rest/v2/tasks`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
    })
      .then((res) => {
        setdatas(res.data)
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, something wrong wrong ",
        })
      }).finally(() =>
        setLoading(false))
  }

  function submitTask(e: any) {
    e.preventDefault()
    axios.post(`https://api.todoist.com/rest/v2/tasks`, {
      content: inputTask,
    }, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
    })
      .then(() => {
        fetchData()
        navigate(0)
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed add new task",
        });
      })
  }

  function onDelete(id: number) {
    axios.delete(`https://api.todoist.com/rest/v2/tasks/${id}`, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Delete task successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData()
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed delete task",
        });
      })
  }

  function editContentTask(id: number) {
    axios.post(`https://api.todoist.com/rest/v2/tasks/${id}`, {
      content: editContent,
    }, {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
    })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Update task successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData()
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed update task",
        });
      })
  }

  function onClickDetail(id: number) {
    navigate(`/detail/${id}`);
  }

  return (
    <Layout>
      {
        loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className='flex justify-center w-full my-5'>
              <h1 className='uppercase font-bold text-3xl'>Todo List App</h1>
            </div>
            <div className='rounded-2xl flex flex-col p-6 shodow-xl border m-5'>
              <form action="" onSubmit={(e) => submitTask(e)}>
                <Input id='input-task' label='Insert new task' className='text-white mt-2' onChange={(e) => setInputTask(e.target.value)} />
                <Button label='Submit' className='bg-white text-black hover:text-white w-[10%]' />
              </form>
            </div>
            <div className="mt-5 flex justify-center w-full">
              <div className="flex flex-col w-3/4 ">
                <div className="overflow-x-auto">
                  <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-bold text-left text-black  w-[40%]"
                            >
                              Tasks
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-bold text-left text-black  w-[40%]"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-bold text-center text-black  w-[10%]"
                            >
                              Edit
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-bold text-center text-black  w-[10%]"
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>
                        {datas ? (
                          datas.map((item) => {
                            return (
                              <>
                                <tbody className="divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap w-[40%]" onClick={() => onClickDetail(item.id)}>
                                      {item.content.substring(0, 45)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white whitespace-nowrap w-[40%]" onClick={() => onClickDetail(item.id)}>
                                      {item.is_completed === false ? (
                                        <p>Not Complete</p>
                                      ) : (
                                        <p>Complete</p>
                                      )}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                                      <label htmlFor={`my-modal-2`} className={`normal-case text-pink-airbnb bg-transparent`}
                                        onClick={() => setIdtask(item.id)}>
                                        <div className="flex flex-col items-center justify-center cursor-pointer">
                                          <BiEditAlt size={20} className="text-white" />
                                        </div>
                                      </label>
                                      <Modal
                                        label='Content'
                                        no={2}
                                        titleModal={"Update Todo"}
                                        input1={
                                          <Input id='edit-task' className='text-white mt-5' onChange={(e) => setEditContent(e.target.value)} placeholder={`Edit Content`} />
                                        }
                                        tombol1={"Cancel"}
                                        tombol2={"Save"}
                                        onClick={() => editContentTask(idTask ? idTask : item.id)}
                                        type={"text"}
                                      />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap w-[10%]">
                                      <div className="flex flex-col items-center justify-center cursor-pointer">
                                        <MdDeleteForever size={20} className="text-white" onClick={() => onDelete(item.id)} />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </Layout >
  )
}

export default index