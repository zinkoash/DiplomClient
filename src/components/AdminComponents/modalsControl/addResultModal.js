import { Button, Form, Input, Modal, Select, message } from 'antd';
import React, { useContext } from 'react';
import { Context } from '../../..';
import { sendResultWithOutFile } from '../../../http/studentAPI';
function AddResultModal({ open, onCancel, dataSourse, student }) {
    const { practices } = useContext(Context)

    const [form] = Form.useForm();
    const handleAdd = () => {
        form.validateFields().then((values) => {
            values.userId = student.userId
            try {

                sendResultWithOutFile(values).then((res) => res.json)
                    .then(() => {
                        message.success('Результат добалвен');
                    }
                    ).then(() => {
                        onCancel()
                    })
            } catch (error) {
                message.error('Ошибка.');
            }
        });
    };
    return (
        <div>
            <Modal
                title="Добавить результат работы"
                open={open}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Назад
                    </Button>,
                    <Button key="add" type="primary" onClick={() => {
                        handleAdd()
                    }}>
                        Добавить
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        initialValue="Проверка"
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
                        initialValue={'Выберите практическую'}
                        name="practiceId"
                        label="Практическая"
                        rules={[{ required: true, message: 'Выберите практическую' }, { type: 'number', message: 'Выберите практическую' }]}
                    >
                        <Select options={practices.practices.filter(practiceObj => !(dataSourse.map(result => result.practiceId)).includes(practiceObj.id)).map(e => {
                            return { value: e.id, label: `Практическая №${e.number}` }
                        })} style={{ width: 200 }}>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Рецензия"
                        rules={[{ required: true, message: 'Введите рецензию' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default AddResultModal
