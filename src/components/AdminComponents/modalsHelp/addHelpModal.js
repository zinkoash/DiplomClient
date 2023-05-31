import React, { useState } from 'react';
import { Modal, message, Form, Input, Button,Upload } from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

function AddHelpModal({ open, onCancel, onAdd }) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const handleAdd = () => {
        form.validateFields().then((values) => {
            const formData = new FormData();
            formData.set('_charset_', 'utf-8');
            fileList.forEach((file) => {
                formData.append('name', values.name)
                formData.append('description', values.description)
                formData.append('data', file, file.name);
            });
            form.resetFields();
            setFileList([])
            onAdd(formData);
        });
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
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };
    return(

        <Modal
            title="Добавить файл контроля знаний"
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="add" type="primary" onClick={handleAdd}>
                    Добавить
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Название"
                    rules={[{ required: true, message: 'Введите название' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Описание"
                    rules={[{ required: true, message: 'Введите описание' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="file" label="Файл" rules={[{ required: true, message: 'Выберите файл!' }]}>
                    <Upload {...properties}>
                        <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                            Загрузить файл
                        </Button>
                    </Upload>
                </Form.Item>
                {/* Другие поля формы, если необходимо */}
            </Form>
        </Modal>
    );
}
export default observer(AddHelpModal);