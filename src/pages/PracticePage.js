import { Row,  Select, Typography, } from 'antd'
import { LeftOutlined, DownloadOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';

import { useNavigate, useParams } from "react-router-dom"
import { fetchOnePractice } from '../http/practiceAPI';
import Loader from '../components/Load';
import Variant from '../components/practiceLayout/Variant';
import { observer } from 'mobx-react-lite';




const PracticePage = () => {
    const [page, setPage] = useState({})
    const [variant, setVariant] = useState({})
    let params = useParams()
    useEffect(() => {
        fetchOnePractice(params.practiceId).then(data => setPage(data));
    }, []);
    const handleChange = (value) => {
        setVariant(
            page.data.practiceData.variki[value - 1]
        )
        // console.log(variant);
    };
    const replaceHeading = (node) => {
        if (node.type === 'tag' && node.name === 'h3' && node.children[0].data === " СОДЕРЖАНИЕ РАБОТЫ:") {
            return (
                <>
                    <div className='variants' style={{ margin: '2% 0px' }}>
                        <h3 style={{padding: '2% 0'}}>
                            СОДЕРЖАНИЕ РАБОТЫ:
                        </h3>
                        {typeof page.data === 'object' ?

                            <Select
                                showSearch
                                style={{ width: '100%', borderColor: 'black', color: 'black' }}
                                placeholder="Выберите вариант"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                onChange={handleChange}
                                options={page.data.practiceData.variki.map(el => el = { value: el.number, label: "Вариант №" + el.number })}
                            />
                            : <Loader />}
                    </div>
                    {typeof page.data === 'object' ?
                    <Variant variant={variant} practice={page.data.practice} />
                    :<div></div>}
                </>
            );
        }
    };
    const options = {
        replace: replaceHeading,
        // Другие опции парсера, если необходимо
    };
    const navigate = useNavigate()

    return (
        <>
            <Row gutter={16} style={{ padding: '10px 2%' }} align={'middle'} justify={'start'}>
                <div className='practice__navigate'  onClick={() => { navigate('../practice') }}>

                    <LeftOutlined style={{ fontSize: 20 }} />
                    <Typography.Text style={{ fontSize: 20 }} >Назад</Typography.Text>
                </div>
            </Row>
            <div className='practice__content-container-wrapper'>
                {typeof page.data === 'object' ?
                    <div>
                        {parse(page.data.practiceData.body, options)}
                    </div>
                    : <Loader />}
            </div>


        </>
    )


}

export default PracticePage
