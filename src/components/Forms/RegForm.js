import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button, Form, Input, App} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { check, registration } from '../../http/userAPI';
import { setCookie } from 'nookies';
import { useContext } from 'react';
import { Context } from '../..';




const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        lg: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        lg: {span:24},
    },
};





const Registration=() =>{
const navigate = useNavigate();
const { notification } = App.useApp();
const {user} = useContext(Context)

const onFinish = async (values) => {
    try {
        const {token} = await registration(values);
        notification.success({
            message: 'Успешно',
            description: 'Регистрация прошла успешно',
            duration:4
        })
        setCookie(null, "_token", token, {
            path:'/'
        })
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).then(()=>navigate('/main/practice'))
    } catch (err) {
        console.warn("LoginForm", err.response.data.message);

      notification.error({
        message: "Ошибка!",
        description: err.response.data.message,
        duration: 4,
      });
    }
};
    return (
        <div style={{ width: "100%", height: "100vh", margin: "0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Form
                {...formItemLayout}
                name="normal_login"
                className="login-form"
                style={{maxWidth:'600px', margin: "0 auto" }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="login"
                    rules={[
                        {
                            type: 'string',
                            message: 'Только строковое значение!'
                        },
                        {
                            whitespace: true,
                            message: 'Никаких пробелов'
                        },
                        {
                            min: 4,
                            message: "Минимум 4 символа!"
                        },
                        {
                            max: 12,
                            message: "Максимум 12 символов!"
                        },
                        {
                            required: true,
                            message: 'Введите логин!',
                        },
                    ]}
                    hasFeedback
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
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    rules={[
                        {
                            required: true,
                            message: 'Повторите пароль!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Подтвердите пароль"
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            type: 'string',
                            message: 'Только строковое значение!'
                        },
                        {
                            whitespace: true,
                            message: 'Никаких пробелов'
                        },
                        {
                            required: true,
                            message: 'Введите Имя!',
                        },
                    ]}
                >
                    <Input placeholder="Имя" />
                </Form.Item>
                <Form.Item
                    name="surname"

                    rules={[
                        {
                            type: 'string',
                            message: 'Только строковое значение!'
                        },
                        {
                            whitespace: true,
                            message: 'Никаких пробелов'
                        },
                        {
                            required: true,
                            message: 'Введите Фамилию!',
                        },
                    ]}
                >
                    <Input placeholder="Фамилия" />
                </Form.Item>
                


                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Зарегистрироваться
                    </Button>
                    
                </Form.Item>
                <Form.Item>
                <Button  type="primary" danger htmlType="button" className="login-form-button">
                        <NavLink to={'../'}>{"Назад"}</NavLink>
                    </Button>
                    
                </Form.Item>
                <NavLink to={'/login'}>{"Есть аккаунт? Войди!"}</NavLink>
            </Form>
        </div>
    )
}

export default Registration
