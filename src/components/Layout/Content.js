import { Button, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { Outlet} from 'react-router-dom';



function _Content() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className='content__container' style={{ padding: '2% 2%' }}>

            <Content className='content-container' style={{
                
                background: colorBgContainer,
            }}>
                <Outlet/>
                
                
            </Content>
        </Layout>

    )
}

export default _Content