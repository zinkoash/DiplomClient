import React, { useState } from 'react';
import { Modal, message, Form, Input, Button,Upload } from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

function AddTheoryModal({ open, onCancel, onAdd }) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [assetsFileList, setAssetsFileList] = useState([]);
    const handleAdd = () => {
        form.validateFields().then((values) => {
            console.log(values.files);
            console.log(assetsFileList);
            values.number = Number(values.number)
            values.data = fileList[0]
            values.files = assetsFileList
            console.log(values);

            form.resetFields();
            setFileList([])
            setAssetsFileList([])
            onAdd(values);
        });
    };
    const properties = {
        fileList:fileList,
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
    const properties2 = {
        fileList:assetsFileList,
        onRemove: (file) => {
            const index = assetsFileList.indexOf(file);
            const newFileList = assetsFileList.slice();
            newFileList.splice(index, 1);
            setAssetsFileList(newFileList);
        },
        beforeUpload: (file) => {
            setAssetsFileList([...assetsFileList, file]);
            return false; // Отменить автоматическую загрузку файла
        },
    };
    return(

        <Modal
            title="Добавить теорию"
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
                <Form.Item
                    name="number"
                    label="Номер"
                    rules={[{ required: true, message: 'Введите номер' }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="data" label="Файл" rules={[{ required: true, message: 'Выберите файл!' }]}>
                    <Upload {...properties}>
                        <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                            Загрузить основной файл
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="files" label="Файл" rules={[{ required: true, message: 'Выберите файл!' }]}>
                    <Upload {...properties2}>
                        <Button icon={<UploadOutlined />} style={{ marginRight: 8 }}>
                            Загрузить дополнительные файлы
                        </Button>
                    </Upload>
                </Form.Item>
                {/* Другие поля формы, если необходимо */}
            </Form>
        </Modal>
    );
}
export default observer(AddTheoryModal);