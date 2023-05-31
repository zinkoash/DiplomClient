import { Row, Space, Tabs, Typography } from 'antd'
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import AdminTheory from '../components/AdminComponents/AdminTheory';
import AdminPractice from '../components/AdminComponents/AdminPractice';
import AdminControl from '../components/AdminComponents/AdminControl';
import AdminHelp from '../components/AdminComponents/AdminHelp';
import AdminUsers from '../components/AdminComponents/AdminUsers';

function Admin() {
    const items = [
        {
            label:'Теория',
            key:'theory',
            children:<AdminTheory/>
        },
        {
            label:'Практические',
            key:'practice',
            children:<AdminPractice/>
        },
        {
            label:'Контроль знаний',
            key:'control',
            children:<AdminControl/>
        },
        {
            label:'Вспомогательный раздел',
            key:'help',
            children:<AdminHelp/>
        },
        {
            label:'Пользователи',
            key:'users',
            children:<AdminUsers/>
        },
    ]
    return (
        <>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'center',  }}> 
            <Row align={'middle'} justify={'center'}>
                <Typography.Title level={4} style={{color:'#f5f5f5'}} >Панель администратора</Typography.Title>
            </Row>
        </Header>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row style={{width:'100%'}} align={'middle'} justify={'center'}>
                    <Tabs
                    size='large'
                        style={{width:'100%',padding:'2% 2%'}}
                        defaultActiveKey="1"
                        // centered
                        items={items}
                    />
                </Row>
            </Space>
        </>
    )
}

export default Admin
