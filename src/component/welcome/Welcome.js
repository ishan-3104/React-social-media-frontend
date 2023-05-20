import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate()
  return (
    <div>
        <h1>Welcome</h1>
        <Button onClick={()=>navigate('/signup')}>Signup</Button>
        <Button onClick={()=>navigate('/login')}>Login</Button>
    </div>
  )
}
