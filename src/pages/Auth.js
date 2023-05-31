import React from 'react'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Login from '../components/Forms/LoginForm'
import Registration from '../components/Forms/RegForm'


const Auth = ()=> {
    const location = useLocation()
    const isLogin = location.pathname === '/login'
    return (
        <div>
            {isLogin?<Login/>:<Registration/>}
        </div>
    )
}

export default Auth
