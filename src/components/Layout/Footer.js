import React from 'react'
import { Layout, Typography, Grid, Row } from 'antd';
import Logo from './Logo';
const { Footer } = Layout;

const { useBreakpoint } = Grid;

function _Footer() {
    const { lg, sm, xs } = useBreakpoint();
    const myFontSize = lg ? 24 : sm ? 16 : xs ? 12 : 10;
    return (

        <Footer className='footer' style={{ textAlign: 'center', backgroundColor: 'rgb(25, 33, 35)', zIndex: '1' }}>
            <Row className='footer__content' style={{ alignItems: 'center', width:'100%' }} justify={'space-between'}>
                <Logo/>
                <Typography.Text style={{ color: 'white', margin: 0, fontSize: myFontSize  }}>УO "Новопольский ГАЭК" 2023</Typography.Text>
                <Typography.Text type='secondary' style={{ margin: 0, fontSize: myFontSize  }} ><Typography.Link href='https://github.com/zinkoash'>@zinkoash</Typography.Link></Typography.Text>
            </Row>
        </Footer>

    )
}

export default _Footer