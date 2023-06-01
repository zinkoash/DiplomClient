import React, { useContext } from 'react'
import { Button, Layout, Menu, Typography, Grid } from 'antd';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Logo from './Logo';


const { Header } = Layout;

const { useBreakpoint } = Grid;
const _Header= observer(() =>{
    const {user} = useContext(Context)
    const cookies = new Cookies();
    const navigate = useNavigate()
    const LogOut = async ()=>{
        navigate('/')
            user.setUser({});
            user.setIsAuth(false);
            cookies.remove("_token",{ path: "/" })
    }

    const { lg, sm, xs } = useBreakpoint();
    const myFontSize = lg ? '24px' : sm ? '16px' : xs ? '12px' : '10px';
    const title = lg ? 'ЭУМК "Экономико-математические методы"' : sm ? 'ЭУМК "ЭММ"' : "ЭММ"
    const mySize = lg ? 'large' : sm ? 'midle' : xs ? 'midle' : 'small'
    return (
        <Header className="header" style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgb(25,33,35)' }}>
            <Logo/>
            <Typography.Text style={{ color: 'white', margin: 0, fontSize: myFontSize }}>{title}</Typography.Text>

                {user.isAuth ?
                    <Button size={mySize} onClick={LogOut} type="primary" danger>Выйти</Button>
                    :
                    <Button size={mySize} type="primary" ghost>
                        <NavLink to={'/login'}>{"Войти"}</NavLink>
                        
                        
                    </Button>
                }

        </Header>
    )
})

export default _Header
