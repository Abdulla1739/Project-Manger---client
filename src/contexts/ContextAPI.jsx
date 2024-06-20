import React, { createContext, useState } from 'react';
export const editResponseContext = createContext()

export const addResponseContext = createContext();

const ContextAPI = ({ children }) => {
    const [addResponse, setAddResponse] = useState("");
    const [editResponse,setEditResponse] = useState("")

    return (
        <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
            <editResponseContext.Provider value={{editResponse,setEditResponse}}>
              {children}
            </editResponseContext.Provider>
        </addResponseContext.Provider>
    );
};

export default ContextAPI;
