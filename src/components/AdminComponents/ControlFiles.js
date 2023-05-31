import React from 'react'
import { useContext } from 'react'
import { Context } from '../..'
import { App, Button, Row, Table, Typography } from 'antd'
import { useState } from 'react'
import { addControl, deleteControl, fetchAllControl, patchControl, patchControlFile } from '../../http/controlApi'
import AddControlModal from './modalsControl/addControlModal'
import UpadteControlModal from './modalsControl/UpdateControlModal'
import UpadteFileControlModal from './modalsControl/UpdateControlFile'
import { observer } from 'mobx-react-lite'

function ControlFiles() {
    const { controls } = useContext(Context)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isUpdateFileModalOpen, setIsUpdateFileModalOpen] = useState(false);
    const dataSource = controls.controls.map(item => ({ ...item, key: item.id }))
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null)
    const { notification } = App.useApp();
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

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const hideAddModal = () => {
        setIsAddModalOpen(false);
    };
    const showUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const hideUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedRow(null)
        setSelectedRowKeys([])
    };
    const showUpdateFileModal = () => {
        setIsUpdateFileModalOpen(true);
    };

    const hideUpdateFileModal = () => {
        setIsUpdateFileModalOpen(false);
        setSelectedRow(null)
        setSelectedRowKeys([])
    };
    const handleAdd = async (values) => {
        try {
            await addControl(values).then(() => {
                fetchAllControl().then(({data})=> {
                    controls.setControls(data)
                }).then(()=>{
                    notification.success({
                        message: 'Успешно',
                        description: `Успешно добавлено!`,
                        duration: 4
                    })
                })
                    
            }).then(()=>{
                hideAddModal();
            })

        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err.message ? err.message : 'Неизвестная ошибка'}!`,
                duration: 4
            })
        }
    };
    const handleUpdate = async (values) => {
        try {
            await patchControl(selectedRow.id, values).then(()=>{
                fetchAllControl().then(({data})=>controls.setControls(data))
            }).then(()=>{
                notification.success({
                    message: 'Успешно',
                    description: `Изменено!`,
                    duration:4
                })
            })

            hideUpdateModal();
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err.response.data.message?err.response.data.message:'Неизвестная ошибка'}!`,
                duration:4
            })
        }
    };
    const handleUpdateFile = async (values) => {
        try {
            await patchControlFile(selectedRow.id, values).then(()=>{
                fetchAllControl().then(({data})=>controls.setControls(data))
            }).then(()=>{
                notification.success({
                    message: 'Успешно',
                    description: `Файл изменен!`,
                    duration:4
                })
            })

            hideUpdateFileModal();
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err.response.data.message?err.response.data.message:'Неизвестная ошибка'}!`,
                duration:4
            })
        }
    };
    const handleDelete = async()=>{
        try {
            deleteControl(selectedRow.id);
            notification.success({
                message: 'Успешно',
                description: `${selectedRow.name} удалено!`,
                duration:4
            })
            controls.setControls(controls.controls.filter(({id})=> id!==selectedRow.id))
            setSelectedRow(null)
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err} что-то пошло не так!`,
                duration:4
            })
        }
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows[0])
        },

    };
    return (
        <div>
            <div>
                <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                    <Typography.Title level={3}>Файлы</Typography.Title>
                </Row>

                <Row align={'middle'} justify={'center'} style={{ padding: '2% 0px' }}>
                    <Table rowSelection={{
                        type: "radio",
                        ...rowSelection
                    }} pagination={false} dataSource={dataSource} columns={columns} scroll={{x:600}}
                        footer={() => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size='small' type="primary" onClick={showAddModal}>Добавить</Button>
                                <AddControlModal
                                    open={isAddModalOpen}
                                    onCancel={hideAddModal}
                                    onAdd={handleAdd}
                                />
                                <Button
                                size='small'
                                    type="primary"
                                    onClick={showUpdateModal}
                                    disabled={!selectedRow}
                                >
                                    Изменить
                                </Button>
                                {selectedRow ?
                                    <UpadteControlModal
                                        selectedRow={selectedRow}
                                        open={isUpdateModalOpen}
                                        onCancel={hideUpdateModal}
                                        onUpdate={handleUpdate}
                                    />
                                    : <></>}
                                <Button
                                size='small'
                                    type="primary"
                                    onClick={showUpdateFileModal}
                                    disabled={!selectedRow}
                                >
                                    Изменить файл
                                </Button>
                                {selectedRow ?
                                    <UpadteFileControlModal
                                        selectedRow={selectedRow}
                                        open={isUpdateFileModalOpen}
                                        onCancel={hideUpdateFileModal}
                                        onFileUpdate={handleUpdateFile}
                                    />
                                    : <></>}
                                <Button
                                size='small'
                                    type="primary"
                                    danger
                                    disabled={!selectedRow}
                                    onClick={handleDelete}
                                >
                                    Удалить
                                </Button>
                            </div>
                        )}
                    >

                    </Table>

                </Row>
            </div>
        </div>
    )
}

export default observer(ControlFiles)
