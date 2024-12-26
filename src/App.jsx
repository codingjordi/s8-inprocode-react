import { Route, Routes } from 'react-router-dom'
import TaskForm from './pages/TaskForm.jsx'
import './App.css'
import TaskPage from './pages/TaskPage.jsx'
import NotFound from './pages/NotFound'
import Layout from './layout/Layout.jsx'
import { TaskContextProvider } from './context/TaskProvider'
import Graphics from './pages/Graphics.jsx'
import Map from './pages/Map.jsx'
import FountainsProvider from './context/FountainsProvider.jsx'
import FullCalendar from './components/FullCalendar.jsx'
import GraphicDataProvider from './context/GraphicDataProvider.jsx'

function App() {

  return (
    <GraphicDataProvider>
      <FountainsProvider>
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TaskPage />} />
              <Route path="/new" element={<TaskForm />} />
              <Route path="/edit/:id" element={<TaskForm />} />
              <Route path="/graphics" element={<Graphics />} />
              <Route path='/map' element={<Map />} />
              <Route path='/calendar' element={<FullCalendar />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TaskContextProvider>
      </FountainsProvider>
    </GraphicDataProvider>
  )
}

export default App
