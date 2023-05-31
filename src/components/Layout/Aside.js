import React, {  useState } from 'react'
import { Button, Layout, Menu, Space,Grid } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
const { Sider } = Layout;
const { useBreakpoint } = Grid;


function _Sider() {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const { lg } = useBreakpoint();

    const location = useLocation()
    const items = [
        {
            key: 'theory',
            label: 'Теоретический раздел'
        },
        {
            key: 'practice',
            label: 'Практический раздел'
        },
        {
            key: 'control',
            label: 'Раздел контроля знаний'
        },
        {
            key: 'help',
            label: 'Вспомогательный раздел'
        },
    ]



    const toggle = () => {
        setCollapsed(!collapsed)
        if (collapsed) {
            document.querySelector('.aside_custom_trigger').style.left ='240px'
        }else{
            document.querySelector('.aside_custom_trigger').style.left ='0'

        }
        }
    const breackPointHandler = (broken)=>{
        setCollapsed(broken)
    }
    return (
        <>
        <Sider
            style={{
                position: 'fixed',
                left: 0,
                top: 64,
                bottom: 0,
                zIndex:1,
            }}
            width={240}
            trigger={null}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={breackPointHandler}
            collapsible={true}
            collapsed={collapsed}
            
            
        >
            <Space>
                <Menu
                    style={{ paddingTop: 20,  }}
                    theme="dark"
                    defaultSelectedKeys={location.pathname.split('/')[2]}
                    mode="inline"
                    items={items}
                    onClick={({key})=>{
                        if(!lg){
                            toggle()
                        }
                        navigate(key)
                    }}
                />
            </Space>
            
        </Sider>
        <Button
            className='aside_custom_trigger'
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
            style={{
              fontSize: '16px',
              width: 32,
              height: 32,
              position: 'fixed',
              backgroundColor: '#00000033',
              top: '122px',
              zIndex:1
            }}
          />
        </>
    )
}
export default _Sider
