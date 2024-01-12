// import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const {isAuthenticated } = useAuth();

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/records')
    else navigate('/login')
  }, [isAuthenticated])
  return (
    <div>HomePage</div>
  )
}

export default HomePage