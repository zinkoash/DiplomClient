import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
function Loader() {
    return (
        <div style={{width:'100%', height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Loader
