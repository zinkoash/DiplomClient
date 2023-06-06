import React, { useContext } from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Layout, Row, Col, Typography, Grid, Card, Carousel, Button, } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { NavLink, useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '../utils/consts';
import { Context } from '..';
const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Meta } = Card;
const Start = () =>{
    
    const { xl, lg, sm, xs } = useBreakpoint();
    const titleLevel = lg ? 3 : sm ? 4 : xs ? 5 : 5
    const cardWidth = xl ? '300px' : sm ? '240px' : xs ? '240px' : '240px'
    const myFontSize = lg ? '16px' : sm ? '14px' : xs ? '12px' : '10px';
    const verticalGutter = lg ? '16px' : sm ? '14px' : xs ? '12px' : '10px';
    const {user} = useContext(Context)
    const navigate = useNavigate()
    function startButtonClick(){
        if (user.isAuth) {
            navigate('/main/practice')
        }else{
            navigate('/login')
        }
    }
    return (
        <>
            <Layout>
                <Header />
                <Content>
                    <Row justify={'center'} style={{ minHeight: '100vh' }}>
                        <Col span={24} className='banner' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: '12%' }}>
                            <QueueAnim
                                key="QueueAnim"
                                type={['bottom', 'top']}
                                delay={200}
                            >
                                <Typography.Title style={{ color: 'white' }} level={titleLevel}>ЭКОНОМИКО-МАТЕМАТИЧЕСКИЕ МЕТОДЫ</Typography.Title>
                            </QueueAnim>
                            <TweenOne
                                animation={{
                                    y: '-=20',
                                    yoyo: true,
                                    repeat: -1,
                                    duration: 1000,
                                }}
                                key="icon"
                            >
                                <DownOutlined style={{ fontSize: '24px', color: 'white', marginTop: '' }} />
                            </TweenOne>
                            <Button onClick={startButtonClick} className='start__button' ghost key="button" >
                                {/* <NavLink to={MAIN_PAGE+'/practice'}></NavLink> */}
                                {"Начать изучение"}
                            </Button>
                        </Col>
                    </Row>
                    <Row justify={'space-evenly'} style={{ minHeight: '100vh', backgroundColor: 'white' }} wrap>
                        <Col offset={1} span={23} style={{ width: '100%', maxHeight: '30vh' }}>
                            <Typography.Title style={{ width: '100%', borderBottom: '3px solid rgb(25,33,35)' }} level={titleLevel}>Цель изучения:</Typography.Title>
                        </Col>

                        <Col offset={1} span={23} style={{ width: '100%' }}>
                            <OverPack playScale={0.3} style={{ overflow: 'hidden', height: '200' }}>
                                <Row className='start__card-container' gutter={[1, verticalGutter]} style={{ alignItems: 'center' }} justify={'center'} wrap>
                                    <QueueAnim 
                                        className='start__card-container' 
                                        style={{width:'100%', display:'flex', justifyContent:'space-around'}}
                                        type={'bottom'}
                                        ease={['easeInOutQuart']}
                                        leaveReverse
                                        
                                        >
                                        <Col lg={{ span: 6 }} xs={{ span: 24 }} key="a">
                                            <Card
                                                hoverable
                                                style={{
                                                    width: cardWidth,
                                                    fontSize: myFontSize,
                                                }}
                                                cover={<img alt="example" src="../img/cardCover1.jpg" />}
                                            >
                                                <Meta title="Цель изучения дисциплины" description="Формирование профессиональной компетентности учащихся в вопросах применения математического моделирования, проектирования моделей с помощью различных методов." />
                                            </Card>
                                        </Col>
                                        
                                        <Col lg={{ span: 6 }} xs={{ span: 24 }} key="b">
                                            <Card
                                                hoverable
                                                style={{
                                                    width: cardWidth,
                                                    fontSize: myFontSize,
                                                }}
                                                cover={<img alt="example" src="../img/cardCover2.png" />}
                                                >
                                                <Meta title="Формирования практических умений" description="В целях формирования практических умений и навыков учащихся программой предусмотрены практические и лабораторные работы." />
                                            </Card>
                                        </Col>
                                        <Col lg={{ span: 6 }} xs={{ span: 24 }} key="c">
                                            <Card
                                                hoverable
                                                style={{
                                                    width: cardWidth,
                                                    fontSize: myFontSize,
                                                }}
                                                cover={<img alt="example" src="../img/cardCover3.png" />}
                                                >
                                                <Meta title="Необходимые навыки" description="Изучение дисциплины основывается на знаниях, умениях и навыках, полученных учащимися при изучении дисциплин «Высшая математика», «Теория вероятностей и математическая статистика»." />
                                            </Card>
                                        </Col>
                                        </QueueAnim>
                                </Row>
                            </OverPack>
                        </Col>
                    </Row>

                    <Row justify={'center'} style={{backgroundColor:'#192123', minHeight: '100vh' }}>
                        <Col offset={1} span={23} style={{ width: '100%', maxHeight: '30vh' }}>
                            <Typography.Title style={{ color: 'white', width: '100%', borderBottom: '3px solid white' }} level={titleLevel}>В результате изучения дисциплины учащиеся должны:</Typography.Title>
                        </Col>
                        <Col offset={1} span={23} style={{ width: '100%' }}>
                            <Row className='start__card-container' gutter={[1, verticalGutter]} style={{ alignItems: 'center' }} justify={'center'} wrap>
                                <Col offset={1} span={23} style={{ width: '100%', color: 'white' }}>
                                    <Carousel dots={true} style={{ width: '100%', color: 'white' }} autoplay>
                                        <div className='start__slider-item-container'>
                                            <div className='start__slider-item-container-wrapper'>
                                                <h3>Знать на уровне представления:</h3>
                                                <ul>
                                                    <li>современную методологию и средства математического моделирования;</li>
                                                    <li>классификацию моделей и особенности моделирования в различных предметных областях;</li>
                                                    <li>принципы построения и методы использования математических моделей систем и процессов;</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='start__slider-item-container'>
                                        <div className='start__slider-item-container-wrapper'>
                                            <h3>Знать на уровне понимания:</h3>
                                                <ul>
                                                    <li>методы математического программирования, модели дискретного программирования и модели оптимального управления;</li>
                                                    <li>методы решения задач математического программирования;</li>
                                                    <li>методы решения экстремальных задач на графах имитационных моделей;</li>
                                                    <li>этапы и принципы имитационного моделирования;</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='start__slider-item-container'>
                                        <div className='start__slider-item-container-wrapper'>
                                                <h3>Уметь:</h3>
                                                <ul>
                                                    <li>использовать стандартное математическое обеспечение;</li>
                                                    <li>выбирать вид модели по предметной постановке задачи;</li>
                                                    <li>применять методы математического моделирования;</li>
                                                    <li>реализовывать графовые модели на ЭВМ;</li>
                                                    <li>разрабатывать модели дискретного программирования и доводить их до уровня машинно-ориентированных алгоритмов.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Carousel>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
                <Footer />
            </Layout>
        </>
    );
}

export default Start
