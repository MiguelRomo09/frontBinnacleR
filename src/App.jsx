import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecordForm from './pages/RecordForm';
import RecordsPage from './pages/RecordsPage';

import ProtectedRoutes from './ProtectedRoutes';
import { RecordProvider } from './context/RecordsContext';
import Navbar from './components/Navbar';

function App(){
  return (
    <AuthProvider>
      <RecordProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>} />
          
            <Route element={<ProtectedRoutes/>}>  
              <Route path='/tasks' element={<RecordsPage/>} />
              <Route path='/add-task' element={<RecordForm/>} />
              <Route path='/tasks/:id' element={<RecordForm/>} />
              <Route path='/profile' element={<ProfilePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecordProvider>
    </AuthProvider>
  )
}

export default App