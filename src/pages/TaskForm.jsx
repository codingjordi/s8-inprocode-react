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
        <div>
            <h1>{params.id ? 'Edit task' : 'New task'}</h1>
            <Formik
                initialValues={task}
                onSubmit={async (values, actions) => {
                    console.log(values)
                    if(params.id) {
                        await updateTask(params.id,values)
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
                        <div className=''>
                            <label htmlFor="title">Title</label>
                            <input value={values.title} type="text" name="title" id='title' onChange={handleChange} />

                            <label htmlFor="description">Desciption</label>
                            <textarea value={values.description} name="description" id='description' onChange={handleChange} placeholder='Write a description'></textarea>
                            <button type='submit' disabled={isSubmitting}>
                                {isSubmitting ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
