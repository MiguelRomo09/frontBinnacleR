import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import TaskForm from './pages/TaskForm';
import TasksPage from './pages/TasksPage';

import ProtectedRoutes from './ProtectedRoutes';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/Navbar';

function App(){
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>} />
          
            <Route element={<ProtectedRoutes/>}>  
              <Route path='/tasks' element={<TasksPage/>} />
              <Route path='/add-task' element={<TaskForm/>} />
              <Route path='/tasks/:id' element={<TaskForm/>} />
              <Route path='/profile' element={<ProfilePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App