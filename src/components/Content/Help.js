import React from 'react'
import { useContext } from 'react'
import { Context } from '../..'
import { Row, Table, Typography } from 'antd'

function Help() {
    const { helps } = useContext(Context)
    const dataSource = helps.helps.map(item => ({ ...item, key: item.id }))
    const columns = [
        {
            title: "Файл",
            dataIndex: 'file',
            key: 'fileId',
            render: (file) => (
                <>
                    {file ?
                        <a download target='_blank' href={process.env.REACT_APP_API_URL + 'uploads/' + file.folder + '/' + file.fileName} >{file.fileName}</a>
                        : 'Без файла'
                    }
                </>
            )
        },

        {
            title: "Наименование",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Описание",
            dataIndex: 'description',
            key: 'description',
        },
    ]
    return (
        <div>
            <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                <Typography.Title level={3}>Файлы вспомогательного раздела</Typography.Title>
            </Row>

            <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                <Table dataSource={dataSource} columns={columns} scroll={{x:500}} pagination={false} />
            </Row>
        </div>
    )
}

export default Help
