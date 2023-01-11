import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

import Layout from '../components/Layout'
import Button from '../components/Button'
import Loader from '../components/Loader'

import { useTitle } from "../utils/hooks/customHooks";
import { DetailTaskType } from '../utils/type/todo'

const DetailTask = () => {    
    useTitle("Details - Todo List App");
    const [detail, setdetail] = useState<DetailTaskType>({})
    const [loading, setLoading] = useState<boolean>(true)
    const { id_task } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        axios.get(`https://api.todoist.com/rest/v2/tasks/${id_task}`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        })
            .then((res) => {
                setdetail(res.data)
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
                            <Button label='Back' className='w-[20%] md:w-[10%] bg-white text-black hover:text-white' onClick={() => navigate(-1)} />
                            <div className='rounded-2xl flex flex-col p-6 shodow-xl border m-5'>
                                <div className="hero-content flex-col lg:flex-row justify">
                                    <div className="card card-side backdrop-blur-xl shadow-xl items-center">
                                        <div className='m-5'>
                                            <h1 className="text-4xl font-bold my-5">Detail Task</h1>
                                            <p className='pt-1 text-xl font-semibold'>Content: <span className='text-md font-normal'>{detail.content}</span></p>
                                            <p className='pt-1 text-xl font-semibold'>Created Date: <span className='text-md font-normal'>{detail.created_at?.substring(0, 10)}</span></p>
                                            <p className='pt-1 text-xl font-semibold'>Status: <span className='text-md font-normal'>
                                                {detail.is_completed === false ? (
                                                    `Not complete`
                                                ) : (
                                                    `Complete`
                                                )}
                                            </span>
                                            </p>
                                            <p className='pt-1 text-lg font-semibold'>Priority:{" "}
                                                <span className='text-lg font-normal'>{detail.priority}
                                                </span>
                                            </p>
                                            <Link to={`${detail.url}`}>
                                                <p className='pt-1 text-lg font-semibold'>Url:{" "}
                                                    <span className='text-lg font-normal hover:text-blue-800'>{detail.url}
                                                    </span>
                                                </p>
                                            </Link>
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

export default DetailTask