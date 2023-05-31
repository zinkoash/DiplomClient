import React, { useState } from 'react';
import { Modal, message, Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UpadteFileTheoryModal({ open, onCancel, onFileUpdate, selectedRow }) {
    const [fileList, setFileList] = useState([]);



    const [form] = Form.useForm();
    const handleUpdate = () => {
        form.validateFields().then((values) => {
            console.log(values);
            const formData = new FormData();
            fileList.forEach((file) => {

                formData.append('file', file, file.name);
            });
            form.resetFields();
            setFileList([])
            onFileUpdate(formData);
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

    return (
        <>
        {selectedRow?
            <Modal
            title="Изменить файл теории"
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
        :<div></div>
    }
        </>
    
        

    );

}


export default UpadteFileTheoryModal
