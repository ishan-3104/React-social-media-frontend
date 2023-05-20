import React from 'react'
import { Navigate} from 'react-router-dom'

export default function LogoutProute({children}) {
    if(!localStorage.getItem('token')){
        return(
            <div>
                {children}
            </div>
        )
    }
    else{
        return <Navigate to = "/home"></Navigate>
    }
}
