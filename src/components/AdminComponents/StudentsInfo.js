import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Progress, Row, Select, Space, Table, Tag, Tooltip, Typography, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { fetchResultByUser } from '../../http/practiceAPI';
import { patchResultStatus, sendResultWithOutFile } from '../../http/studentAPI';
import Loader from '../Load';
import AddResultModal from './modalsControl/addResultModal';


function StudentsInfo({ student }) {
    const { practices } = useContext(Context)
    const [dataSourse, setDataSourse] = useState(null)
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    useEffect(() => {
        fetchResultByUser(student.userId).then(({ data }) => setDataSourse(data.map(item => ({ ...item, key: item.id }))))
    }, [student, open, openAdd]);
    const [form] = Form.useForm();


    const columns = [
        {
            title: "Практическая",
            dataIndex: 'practiceId',
            key: 'practiceId',
            render: (practiceId) => (
                <Typography.Text >
                    Практическая № {practices.practices.find(({ id }) => id == practiceId).number}
                </Typography.Text>
            )
        },
        {
            title: "Файл",
            dataIndex: "file",
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
            title: "Статус",
            dataIndex: "status",
            key: 'status',
            render: (status) => (
                (status === 'Проверка') ? (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                        Проверка
                    </Tag>
                ) : (status === 'Сдано') ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                        Сдано
                    </Tag>
                ) : (<Tag icon={<CloseCircleOutlined />} color="error">
                    Не сдано
                </Tag>)
            )
        },
        {
            title: "Рецензия",
            dataIndex: "description",
            key: 'description',
            render: (description) => (
                description ? description : 'Рецезии нет'
            )
        },
        {
            title: "Действия",
            key: 'action',
            render: (record) => (
                <>
                    <Button onClick={showModal}>Изменить результат работы</Button>
                    <Modal
                        title="Изменить результат работы"
                        open={open}
                        record={record}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Назад
                            </Button>,
                            <Button key="add" type="primary" onClick={() => {
                                handleUpdate(record)
                            }}>
                                Изменить
                            </Button>,
                        ]}
                        >
                        {console.log(record)}
                        <Form form={form} layout="vertical">
                            <Form.Item
                                initialValue={record.status}
                                name="status"
                                label="Статус"
                                rules={[{ required: true, message: 'Выберите статус' }]}
                            >
                                <Select options={[
                                    { value: 'Сдано', label: 'Сдано' },
                                    { value: 'Проверка', label: 'Проверка' },
                                    { value: 'Не сдано', label: 'Не сдано' },
                                ]} style={{ width: 120 }}>

                                </Select>
                            </Form.Item>
                            <Form.Item
                                initialValue={record.description || 'Рецензии нет'}
                                name="description"
                                label="Рецензия"
                                rules={[{ required: true, message: 'Введите рецензию' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>

                        </Form>
                    </Modal>
                </>
            )
        },
    ]
    const showModal = () => {
        setOpen(true);
    };
    const handleUpdate = (record) => {
        form.validateFields().then((values) => {
            try {
                patchResultStatus(student.userId, record.practiceId, values).then((res) => res.json)
                    .then(() => {
                        message.success('Файл успешно изменен');
                    }
                    ).then(() => {
                        handleCancel()
                    })
            } catch (error) {
                message.error('Ошибка.');
            }
        });
    };
    const handleCancelAdd = () => {
        form.resetFields();
        setOpenAdd(false);
    };
    const showModalAdd = () => {
        setOpenAdd(true);
    };
   
    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };
    return (
        <div>
            {dataSourse ?
                <div>
                    <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                        <Typography.Title level={3}>{student.name + ' ' + student.surname}</Typography.Title>
                    </Row>

                    <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                        <Space wrap >
                            <Tooltip title={`Всего практических: ${practices.practices.length} / Всего сдано: ${dataSourse.length}/ Принято: ${dataSourse.filter(({ status }) => status == 'Сдано').length}`}>
                                <Progress
                                    size={
                                        200
                                    }
                                    percent={((dataSourse.length * 100) / practices.practices.length).toFixed(2)}
                                    success={{
                                        percent: (dataSourse.filter(({ status }) => status == 'Сдано').length * 100) / practices.practices.length,
                                    }}

                                    type="circle"
                                />
                            </Tooltip>
                        </Space>
                    </Row>
                    <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                        <Table scroll={{x:500}} pagination={false} dataSource={dataSourse} columns={columns}>

                        </Table>
                        <Button style={{marginTop:'12px'}} onClick={showModalAdd}>Добавить результат</Button>
                        <AddResultModal
                        open={openAdd}
                        onCancel={handleCancelAdd}
                        dataSourse={dataSourse}
                        student = {student}/>
                    </Row>
                </div>
                :
                <Loader />
            }
        </div>
    )
}

export default StudentsInfo
