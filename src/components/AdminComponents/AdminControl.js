import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { useContext, useState, useRef } from 'react'
import { Context } from '../..'
import { Table, Button, Input, Space,App, Divider} from 'antd'
import Highlighter from 'react-highlight-words';
import Students from './Students';
import ControlFiles from './ControlFiles';
function AdminControl() {
    const {students} = useContext(Context)
    const dataSource = students.students.map(item => ({ ...item, key: item.id }))
    return (
        <div>
            <Students students={students.students}/>
            <Divider />
            <ControlFiles/>
        </div>
    )
}

export default AdminControl
