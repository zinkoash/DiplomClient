import React, { useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { START_ROUTE } from '../utils/consts'
import Start from '../pages/Start';
import Main from '../pages/Main';
import Practice from './Content/Practice';
import Theory from './Content/Theory';
import Help from './Content/Help';
import Control from './Content/Control';
import PracticePage from '../pages/PracticePage';
import Auth from '../pages/Auth';
import FileEditor from '../pages/Editor';
import { Context } from '..';
import TheoryPage from '../pages/TheoryPage';
import { observer } from 'mobx-react-lite';
import Admin from '../pages/Admin';
import Editor from '../pages/Editor';



const AppRouter = ()=> {
    const { user } = useContext(Context);
    return (
        <Routes>
            {/* {user?console.log(user.user.role.role == "ADMIN"):''} */}
            {user.isAuth?
            <>
            <Route path='/' element={<Start />} />
            <Route path='/main' element={<Main />}>
                <Route path='practice' element={<Practice />}/>
                <Route path='practice/:practiceId' element={<PracticePage />} />
                <Route path='theory' element={<Theory />} />
                <Route path='theory/:theoryNumber' element={<TheoryPage />} />
                <Route path='help' element={<Help />} />
                <Route path='control' element={<Control />} />
                <Route path='editor' element={<Editor/>}/>
            </Route>
            <Route>
                {
                    user.user.role.role == "ADMIN"?
                    <Route path='/admin' element={<Admin />}/>
                    :<Route path='*' element={<Navigate to={START_ROUTE} />} />
                }
            </Route>
            <Route path='login' element={<Auth />} />
            <Route path='registration' element={<Auth />} />
            <Route path='*' element={<Navigate to={START_ROUTE} />} />
            </>
            :
            <>
            <Route path='/' element={<Start />} />
            <Route path='login' element={<Auth />} />
            <Route path='registration' element={<Auth />} />
            <Route path='*' element={<Navigate to={START_ROUTE} />} />
            </>
            }
        </Routes>
    )
}

export default observer(AppRouter)
