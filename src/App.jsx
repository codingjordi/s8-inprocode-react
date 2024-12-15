import { Route, Routes } from 'react-router-dom'
import TaskPage from './pages/TaskPage'
import TaskForm from './pages/TaskForm'
import './App.css'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import { TaskContextProvider } from './context/TaskProvider'

function App() {

  return (
    <TaskContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TaskContextProvider>
  )
}

export default App
