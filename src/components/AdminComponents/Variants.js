import { UploadOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined,DownloadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Card, Table, Tag, Modal, Typography, Form } from 'antd';
import React from 'react'
import { useState } from 'react';
import { addVariantFile } from '../../http/practiceAPI';
import { values } from 'mobx';

function Variants({ practice }) {
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [variant, setVariant] = useState(null)
    const dataSource = practice.variants.map(item => ({ ...item, key: item.id }))
    const handleUpload = () => {
        form.validateFields().then((values) => {
            values.id = variant.id
            values.practiceNum = practice.number
            values.data = fileList
            console.log(values);
            try {
                addVariantFile( values ).then((res) => res.json)
                .then(() => {
                    setFileList([]);
                    setFileList([])
                    message.success('Файл успешно загружен');
                }
                )
            } catch (error) {
                message.error('Ошибка.');
                setFileList([]);
            }
            finally {
            setUploading(false);

        }
    })
    };
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setFileList([]);
    };
    const properties = {
        fileList,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false; // Отменить автоматическую загрузку файла
        },

    };

    const columns = [
        {
            title: "Номер",
            dataIndex: "number",
            key: 'number',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: "Действия",
            key: 'action',
            render: (record) => (
                <>
                    <Button icon={<UploadOutlined />} onClick={()=>{
                        showModal()
                        setVariant(record)
                    }}>Добавить файлы варианта</Button>
                    <Modal
                        title="Добавить файлы варианта"
                        open={open}
                        record={record}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Назад
                            </Button>,
                        ]}
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item name="data" label="Файл" rules={[{ required: true, message: 'Выберите файл!' }]}>
                                    <Upload {...properties}>
                                        <Button icon={<UploadOutlined />}>Добавить файлы варианта</Button>
                                    </Upload>
                            </Form.Item>
                        </Form>
                                    <Button type="primary" onClick={handleUpload}
                                        disabled={fileList.length === 0}
                                        loading={uploading}
                                        style={{
                                            marginTop: 16,
                                        }}
                                    >{uploading ? 'Загрузка' : 'Начать загрузку'}</Button>
                    </Modal>
                </>
            )
        },
    ]
    return (
        <div>
            <Typography.Title level={4}>Варианты</Typography.Title>
            {practice ?
                <Table dataSource={dataSource} columns={columns}>

                </Table>
                : <></>}
        </div>
    )
}

export default Variants
