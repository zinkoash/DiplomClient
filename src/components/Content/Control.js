import React from 'react'
import StudentInfo from '../contolLayout/StudentInfo'
import ControlsInfo from '../contolLayout/ControlsInfo'
import { Divider } from 'antd';

function Control() {
    return (
        <div>
            <StudentInfo/>
            <Divider />
            <ControlsInfo/>
        </div>
    )
}

export default Control
