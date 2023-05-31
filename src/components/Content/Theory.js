import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

import Loader from '../Load';
import { useContext } from 'react';
import { Context } from '../..';

function Theory() {
    const {theoryes} = useContext(Context)
    const dataSource = theoryes.theoryes.sort((a,b)=>a.number-b.number)

    return (
        <div className='theory__content-container' style={{overflowX:'hidden'}} >
            <Row gutter={16} align={'middle'} justify={'center'}>
                <Typography.Title  level={3}>Теоретический раздел</Typography.Title>
            </Row>
                {typeof theoryes.theoryes === 'object' ?
                    <Row gutter={12} align={'stretch'} justify={'space-around'}  >
                        {dataSource.map(function (el) {
                            return (
                                <Col key={el.id} lg={8} sm={8} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", margin: '0 auto' }} >
                                    <NavLink to={`./${el.number}`}>{
                                        <Card title={<h5>{el.name}</h5>} key={el.id} bordered={true} hoverable style={{ minHeight: '245px', minWidth: '240px', maxWidth: '250px', margin: '10px 0px' }}>
                                            {el.description}
                                        </Card>
                                    }</NavLink>
                                </Col>
                            )
                        })}
                    </Row>
                    : <Loader />}
        </div>
    )
}

export default Theory
