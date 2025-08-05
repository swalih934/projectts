import React from 'react'
import { createContext,useState } from 'react'

export const addProjectResponseContext = createContext()

function ContextApi({children}) {
    const [addResponse, setAddResponse] = useState("")



    return (
        <>
            <addProjectResponseContext.Provider value={{ addResponse, setAddResponse }}>
                {children}

            </addProjectResponseContext.Provider>


        </>)
}

export default ContextApi