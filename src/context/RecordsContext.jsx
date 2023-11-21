import { createContext, useContext, useState } from "react";
import { createRecordRequest, getRecordsRequest, deleteRecordRequest, getRecordRequest, updateRecordRequest } from "../api/records";

const RecordContext = createContext();

export const useRecords = () =>{
    const context = useContext(RecordContext);

    if(!context){
        throw new Error("useRecords must be used within a RecordProvider");
    }

    return context;

}


// eslint-disable-next-line react/prop-types
export function RecordProvider({ children }){
    const [records, setRecords] = useState([]);

    const getRecords = async () => {
        try{
            const res = await getRecordsRequest();
            console.log(res);
            setRecords(res.data);
            
        }catch(error){
            console.log(error);
        }
    }
    const createRecord = async (task) => {
        const res = await createRecordRequest(task);
        console.log(res);
    }

    const deleteRecord = async (id) => {
        try{
            const res = await deleteRecordRequest(id);
            if(res.status == 204){
                setRecords(records.filter((task) => task._id != id) );
            }

        }catch(error){           
        console.log(error); 
        }
    }

    const getRecord = async (id) =>{
        try{
            const res = await getRecordRequest(id);
            return res.data;

        }catch(error){
            console.error(error);
        }
    }

    const updateRecord = async (id,task) => {
        try{
            await updateRecordRequest(id,task);
        }catch(error){
            console.log(error);
        }
    };


    return(
        <RecordContext.Provider value={{
            records,
            createRecord,
            getRecords,
            deleteRecord,
            getRecord,
            updateRecord,
          }}>
            { children }
        </RecordContext.Provider>
    )
}