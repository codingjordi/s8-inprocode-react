import { Route, Routes } from 'react-router-dom'
import TaskForm from './pages/TaskForm.jsx'
import './App.css'
import TaskPage from './pages/TaskPage.jsx'
import NotFound from './pages/NotFound'
import Layout from './layout/Layout.jsx'
import { TaskContextProvider } from './context/TaskProvider'

function App() {

  return (
    <TaskContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskPage />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </TaskContextProvider>
  )
}

export default App
