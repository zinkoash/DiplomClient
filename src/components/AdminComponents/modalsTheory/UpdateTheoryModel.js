import React, { useState } from 'react';
import { Modal, message, Form, Input, Button } from 'antd';

function UpadteTheoryModal({ open, onCancel, onUpdate, selectedRow }) {

    const [form] = Form.useForm();
    const handleUpdate = () => {
        form.validateFields().then((values) => {
            onUpdate(values);
        });
    };

    return (
        <>
        {selectedRow?
            <Modal
            title="Изменить теорию"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="add" type="primary" onClick={handleUpdate}>
                    Изменить
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    initialValue={selectedRow.name}
                    name="name"
                    label="Название"
                    rules={[{ required: true, message: 'Введите название' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    initialValue={selectedRow.description}
                    name="description"
                    label="Описание"
                    rules={[{ required: true, message: 'Введите описание' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    initialValue={selectedRow.number}
                    name="number"
                    label="Номер"
                    rules={[{ required: true, message: 'Введите номер' }]}
                >
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
        :<div></div>
    }
        </>
    
        

    );

}


export default UpadteTheoryModal
