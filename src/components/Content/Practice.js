import { Row, Typography, Col, Card, Divider } from 'antd'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Loader from '../Load'
import { useContext } from 'react'
import { Context } from '../..'
function Practice() {
    const {practices} = useContext(Context)
    
    return (
        <div className='practice__content-container' >
            <Row gutter={16} align={'middle'} justify={'center'}>
                <Typography.Title  level={3}>Практические работы</Typography.Title>

            </Row>
            {typeof practices.practices === 'object' ?
            <Row gutter={12} align={'stretch'} justify={'space-around'}  >
                {practices.practices.map(function (el) {
                    return (
                        <Col key={el.number} lg={8} sm={8} style={{display:'flex', flexWrap:'wrap', justifyContent:"center", margin:'0 auto'}} >
                            <NavLink to={`./${el.number}`}>{
                                <Card title={<h5>Практическая работа №{el.number}</h5>} key={el.id} bordered={true} hoverable style={{minHeight:'245px',minWidth:'240px', maxWidth:'250px', margin:'10px 0px'}}>
                                    {el.description}
                                </Card>
                            }</NavLink>
                            
                        </Col>
                    )
                })}
            </Row>:<Loader/>}
        </div>
    )
}

export default Practice
