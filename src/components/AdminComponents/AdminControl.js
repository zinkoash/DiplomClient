import React from 'react'
import { useContext} from 'react'
import { Context } from '../..'
import {  Divider} from 'antd'
import Students from './Students';
import ControlFiles from './ControlFiles';
import { observer } from 'mobx-react-lite';
function AdminControl() {
    const {students} = useContext(Context)
    return (
        <div>
            <Students students={students.students}/>
            <Divider />
            <ControlFiles/>
        </div>
    )
}

export default observer(AdminControl)
