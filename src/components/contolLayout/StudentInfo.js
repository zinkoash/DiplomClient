import React, { useContext, useEffect } from 'react'
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Context } from '../..';
import { getStudentByUserId } from '../../http/studentAPI';
import { useState } from 'react';
import Loader from '../Load';
import { Progress, Row, Space, Table, Tag, Tooltip, Typography } from 'antd';


function StudentInfo() {
    const { user, practices } = useContext(Context)
    const [student, setStudent] = useState(null)
    useEffect(() => {
        getStudentByUserId(user.user.id).then(({ data }) => setStudent(data))
    }, []);
    const columns = [
        {
            title:"Практическая",
            dataIndex:'practiceId',
            key:'practiceId',
            render:(practiceId)=>(
                <Typography.Title level={5}>
                    Практическая № {practices.practices.find(({id})=> id==practiceId).number}
                </Typography.Title>
            )
        },
        
        {
          title: "Статус",
          dataIndex: "status",
          key: 'status',
          render: (status) => (
            (status === 'Проверка') ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Проверка
              </Tag>
            ) : (status === 'Сдано') ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Сдано
              </Tag>
            ) : (<Tag icon={<CloseCircleOutlined />} color="error">
              Не сдано
            </Tag>)
          )
        },
        {
          title: "Рецензия",
          dataIndex: "description",
          key: 'description',
          render: (description) => (
            description ? description : 'Рецезии нет'
          )
        }]
    return (
        <div>
            {student ?
                <div>
                    <Row align={'middle'} justify={'center'} style={{padding:'2% 0px'}}>
                        <Typography.Title level={3}>{student.name + ' ' + student.surname}</Typography.Title>
                    </Row>
                    
                    <Row align={'middle'} justify={'center'} style={{padding:'2% 0px'}}>
                        <Space wrap >
                            <Tooltip title={`Всего практических: ${practices.practices.length} / Всего сдано: ${student.results.length}/ Принято: ${student.results.filter(({status})=>status=='Сдано').length}`}>
                                <Progress
                                    size={
                                        200
                                    }
                                    percent={((student.results.length*100)/ practices.practices.length).toFixed(2)}
                                    success={{
                                        percent: (student.results.filter(({status})=>status=='Сдано').length*100)/practices.practices.length,
                                    }}
                                    
                                    type="circle"
                                />
                            </Tooltip>
                        </Space>
                    </Row>
                    <Row  align={'middle'} justify={'center'} style={{padding:'2% 0px'}}>
                        <Table pagination={false} dataSource={student.results.map(item => ({ ...item, key: item.id }))} columns={columns}>
                                
                        </Table>
                        
                    </Row>
                </div>
                :
                <Loader />
            }
        </div>
    )
}

export default StudentInfo
