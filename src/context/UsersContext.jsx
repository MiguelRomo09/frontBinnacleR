import { createContext, useContext, useState } from "react";
import { deleteUserRequest,getUsersPendingRequest,getUsersRequest,updateAcceptedUserRequest,updateRejectedUserRequest, getUserRequest, updateUserRequest, checkUserExistRequest } from "../api/users";

const UserContext = createContext();

export const useUsers = () =>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUsers must be used within a usersProvider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }){
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try{
            const res = await getUsersRequest();
            console.log(res);
            setUsers(res.data);
            
        }catch(error){
            console.log(error);
        }
    }

    const getUsersPending = async () => {
        try{
            const res = await getUsersPendingRequest();
            console.log(res);
            setUsers(res.data);
            
        }catch(error){
            console.log(error);
        }
    }
    
    const deleteUser = async (id) => {
        try{
            const res = await deleteUserRequest(id);
            if(res.status == 204){
                getUsers();
            }

        }catch(error){           
        console.log(error); 
        }
    }

    const getUser = async (id) => {
        try{
            const res = await getUserRequest(id);
            console.log(res);
            return res.data;
            
        }catch(error){
            console.log(error);
        }
    }

    const acceptedUser = async (id,user) => {
        try{
            await updateAcceptedUserRequest(id,user);
            getUsers();
        }catch(error){
            console.log(error);
        }
    };

    const rejectedUser = async (id,user) => {
        try{
            await updateRejectedUserRequest(id,user);
            getUsers();
        }catch(error){
            console.log(error);
        }
    };    
    const filterUsers = async (filter) => {
        try{
            var newData;
            if(filter != ''){
                newData = users.filter(row => {return row.email.toLowerCase().includes(filter.toLowerCase())});
                console.log(newData);            
                setUsers(newData);    
            }else{
                getUsers();
            }
            
        }catch(error){
            console.log(error);
        }
    };
    
    const updateUser = async (id,user) => {
        if(user.suspend){
            user.status = 2;
        }else{
            user.status = 1;
        }
        if(user.userType == false){
            user.userType = 2
        }else{
            user.userType = 1
        }
        try{
            await updateUserRequest(id,user);
        }catch(error){
            console.log(error);
        }
    };

    const checkUserExist = async (user) =>{
        try{
            const res =  await checkUserExistRequest(user);
            console.log(res);
            return res;
        }catch(error){
            console.log(error);
        }

    }
    
    


    return(
        <UserContext.Provider value={{
            users,
            getUsers,
            getUsersPending,
            getUser,
            deleteUser,
            acceptedUser,
            rejectedUser,
            filterUsers,
            updateUser,
            checkUserExist,
          }}>
            { children }
        </UserContext.Provider>
    )
}