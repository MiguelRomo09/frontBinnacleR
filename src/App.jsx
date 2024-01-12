import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UsersContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecordForm from './pages/RecordForm';
import RecordsPage from './pages/RecordsPage';
import AdminUsers from './pages/AdminUsers';
import RequestUsers from './pages/RequestUsers';
import ModifyUserForm from './pages/ModifyUserForm';

import ProtectedRoutes from './ProtectedRoutes';
import { RecordProvider } from './context/RecordsContext';
import Navbar from './components/Navbar';

function App(){
  return (
    <AuthProvider>
      <RecordProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>} />
            
              <Route element={<ProtectedRoutes/>}>  
                <Route path='/records' element={<RecordsPage/>} />
                <Route path='/add-record' element={<RecordForm/>} />
                <Route path='/records/:id/:type' element={<RecordForm/>} />
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/admin-users' element={<AdminUsers/>} />
                <Route path='/admin-users/:id' element={<ModifyUserForm/>} />
                <Route path='/requests-users' element={<RequestUsers/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </RecordProvider>
    </AuthProvider>
  )
}

export default App