import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

import { ConfigProvider, App, FloatButton} from 'antd';
import UserStore from './store/UserStore';
import PracticesStore from './store/PracticesStore';
import TheoryesStore from './store/TheoryStore';
import MyApp from './App';
import StudentsStore from './store/StudentsStore';
import ControlStore from './store/ControlStore';
import HelpStore from './store/HelpStore';

export const Context = createContext(null);
// console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#00b96b',
                // colorBgLayout:'#192123',
            }
        }}
    >
        <Context.Provider value={
            {
                user: new UserStore(),
                practices: new PracticesStore(),
                theoryes: new TheoryesStore(),
                students:new StudentsStore(),
                controls:new ControlStore(),
                helps:new HelpStore()
            }
        }>
            <App>
            <MyApp />
            <FloatButton.BackTop />
            </App>
        </Context.Provider>
    </ConfigProvider>
);

