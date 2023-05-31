import React, { useContext, useEffect } from 'react'
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Context } from '../..';
import { getStudentByUserId } from '../../http/studentAPI';
import { useState } from 'react';
import Loader from '../Load';
import shortid from 'shortid';

import { Progress, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';


function ControlsInfo() {

    const {controls} = useContext(Context)
    const dataSource = controls.controls.map(item => ({ ...item, key: item.id }))
    const columns = [
        {
            title:"Файл",
            dataIndex:'file',
            key:'fileId',
            render: (file) => (
                <>
                    {file ?
                        <a download target='_blank' href={process.env.REACT_APP_API_URL + 'uploads/' + file.folder + '/' + file.fileName} >{file.fileName}</a>
                        : 'Без файла'
                    }
                </>
            )
        },

        {
            title:"Наименование",
            dataIndex:'name',
            key:'name',
        },
        {
            title:"Описание",
            dataIndex:'description',
            key:'description',
        },
        ]
    
    return (
        <div>

                <div>
                    <Row align={'middle'} justify={'center'} style={{padding:'2% 0px'}}>
                        <Typography.Title level={3}>Контроль знаний</Typography.Title>
                    </Row>

                    <Row  align={'middle'} justify={'center'} style={{padding:'2% 0px'}}>
                        <Table pagination={false} dataSource={dataSource} columns={columns}>
                                
                        </Table>
                        
                    </Row>
                </div>

            
        </div>
    )
}

export default ControlsInfo
