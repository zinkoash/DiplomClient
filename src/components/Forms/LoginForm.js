import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button, Form, Input, App} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { check, login } from '../../http/userAPI';
import Cookies from 'universal-cookie';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';




const Login=() =>{
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const { notification } = App.useApp();
    const cookies = new Cookies();
    const onFinish = async (values) => {
        try {
            const {token} = await login(values);
            notification.success({
                message: 'Успешно',
                description: 'Вход выполнен успешно',
                duration:4
            })
            cookies.set( "_token", token, {
                path:'/'
            })
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).then(()=>navigate('/main/practice'))
            
        } catch (err) {
            console.warn("LoginForm", err);
            if (err.response) {
                notification.error({
                    message: "Ошибка!",
                    description: err.response.data.message,
                    duration: 4,
                });
            }
        }
        
    };
    return (
        <div style={{width:"50%", height:"100vh", margin:"0 auto",display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <Form
            name="normal_login"
            className="login-form"
            style={{padding:"10px 10px", border: '1px solid gray', borderRadius:"5%"}}
            onFinish={onFinish}
        >
            <Form.Item
                name="login"
                rules={[
                    {
                        required: true,
                        message: 'Введите логин!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Введите пароль!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>


            <Form.Item style={{width:"100%", display:'flex', justifyContent:'space-between'}}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Войти
                </Button>
                <Button style={{marginLeft:"12px"}} type="primary" danger htmlType="button" className="login-form-button">
                <NavLink to={'../'}>{"Назад"}</NavLink>
                </Button>
            </Form.Item>
                <NavLink to={'/registration'}>{"Нет аккаунта зарегистрируйся!"}</NavLink>
        </Form>
        </div>
    )
}

export default observer(Login);
