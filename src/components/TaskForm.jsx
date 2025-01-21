import { Formik, Form } from 'formik'
import { useTasks } from "../hooks/useTasks"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function TaskForm() {

    const { createTask, getTask, updateTask } = useTasks()
    const [task, setTask] = useState({
        title: "",
        description: ""
    })
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const fetchedTask = await getTask(params.id)
                setTask({
                    title: fetchedTask.title,
                    description: fetchedTask.description
                })
                console.log(fetchedTask)
            }
        }
        loadTask();
    }, [])

    return (
        <div className='container mx-auto my-6 px-3'>
            <div className="bg-zinc-300 dark:bg-zinc-600 py-4 px-4 rounded-[10px]">
                <div className="flex flex-col">
                    <h1>{params.id ? 'Edit task' : 'New task'}</h1>
                    <Formik
                        initialValues={task}
                        onSubmit={async (values, actions) => {
                            console.log(values)
                            if (params.id) {
                                await updateTask(params.id, values)
                                navigate('/')
                            } else {
                                await createTask(values)
                                actions.resetForm()
                            }

                        }}
                        enableReinitialize={true}
                    >
                        {({ handleChange, handleSubmit, values, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}  >
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="title" className='mb-2 font-semibold'>Title</label>
                                        <input value={values.title} className='rounded dark:bg-zinc-500' type="text" name="title" id='title' onChange={handleChange} />
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="description" className='mb-2 font-semibold'>Desciption</label>
                                        <textarea value={values.description} className='rounded dark:bg-zinc-500 resize-none' name="description" id='description' onChange={handleChange} placeholder='Write a description'></textarea>
                                    </div>

                                    <button type='submit' disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving' : 'Save'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                </div>
                <div className="flex gap-2 pt-3 h-15">

                </div>
            </div>
        </div>
    )
}
