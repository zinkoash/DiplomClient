import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { mainRoutes} from "../routes";
import { START_ROUTE } from '../utils/consts'

function MainRouter() {
    return (
        <Routes>
        {mainRoutes.map(({path, Component})=><Route key={path} path={path} element = {<Component/>} exact/>)}
            <Route path='*' element={<Navigate to={START_ROUTE}/>} />
        </Routes>
    )
}

export default MainRouter