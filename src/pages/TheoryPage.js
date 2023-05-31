import { Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { LeftOutlined, DownloadOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from "react-router-dom"
import Loader from '../components/Load';

import { fetchOneTheory } from '../http/theoryAPI';


const TheoryPage = () => {
    const [theory, setTheory] = useState(null)
    const [page, setPage] = useState({})
    const [loading, setLoading] = useState(true)

    let params = useParams()
    useEffect(() => {
        async function fetchPage() {
            const theoryData = (await fetchOneTheory(params.theoryNumber)).data
            if (!ignore) {
                setTheory(theoryData)
                setPage(theoryData.theoryHtml)
            }
        }
        let ignore = false;
        fetchPage().then(() => setLoading(false))
        return () => {
            ignore = true;
        }
    }, []);

    const navigate = useNavigate()
    if (loading) {
        return <Loader />
    }
    return (
        <>



            <>
                <Row gutter={16} style={{ padding: '0 2%' }} align={'middle'} justify={'space-between'}>
                    <LeftOutlined style={{ fontSize: 20 }} onClick={() => { navigate('../theory') }} />
                    <Typography.Title level={3}>{theory.theory.name}</Typography.Title>
                    <a href={theory.theoryUrl} download>
                        <DownloadOutlined style={{ fontSize: 20 }} /></a>
                </Row>
                <div className='theory__content-container' style={{ minHeight: '100vh' }}>
                    <div className='document__viewer' dangerouslySetInnerHTML={{ __html: page }}></div>
                </div>
            </>
        </>
    )


}

export default TheoryPage
