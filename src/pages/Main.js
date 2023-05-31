import React from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Aside from '../components/Layout/Aside';
import Content from '../components/Layout/Content';
import { Layout } from 'antd';
import { observer } from 'mobx-react-lite';


const Main = () => {
    return (
        <>
            <Layout style={{ minHeight: '100vh'}}>
            <Header />
            <Layout hasSider >
                <Aside />
                
                <Content />
            </Layout>
                <Footer />
            </Layout>
        </>
    );
}

export default observer(Main);
