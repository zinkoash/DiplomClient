import React from 'react'
import { useContext } from 'react'
import { Context } from '../..'
import { App, Button, Row, Table, Typography } from 'antd'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import AddHelpModal from './modalsHelp/addHelpModal'
import { addHelp, deleteHelp, fetchAllHelp, patchHelp, patchHelpFile } from '../../http/helpAPI'
import UpadteFileHelpModal from './modalsHelp/UpdateHelpFile'
import UpadteHelpModal from './modalsHelp/UpdateHelpModal'

function AdminHelp() {
    const { helps } = useContext(Context)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isUpdateFileModalOpen, setIsUpdateFileModalOpen] = useState(false);
    const dataSource = helps.helps.map(item => ({ ...item, key: item.id }))
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
            await addHelp(values).then(() => {
                fetchAllHelp().then(({data})=> {
                    helps.setHelps(data)
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
            await patchHelp(selectedRow.id, values).then(()=>{
                fetchAllHelp().then(({data})=>helps.setHelps(data))
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
            await patchHelpFile(selectedRow.id, values).then(()=>{
                fetchAllHelp().then(({data})=>helps.setHelps(data))
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
            deleteHelp(selectedRow.id);
            notification.success({
                message: 'Успешно',
                description: `${selectedRow.name} удалено!`,
                duration:4
            })
            helps.setHelps(helps.helps.filter(({id})=> id!==selectedRow.id))
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
                    }} pagination={false} dataSource={dataSource} columns={columns}
                        footer={() => (
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="primary" onClick={showAddModal}>Добавить</Button>
                                <AddHelpModal
                                    open={isAddModalOpen}
                                    onCancel={hideAddModal}
                                    onAdd={handleAdd}
                                />
                                <Button
                                    type="primary"
                                    onClick={showUpdateModal}
                                    disabled={!selectedRow}
                                >
                                    Изменить
                                </Button>
                                {selectedRow ?
                                    <UpadteHelpModal
                                        selectedRow={selectedRow}
                                        open={isUpdateModalOpen}
                                        onCancel={hideUpdateModal}
                                        onUpdate={handleUpdate}
                                    />
                                    : <></>}
                                <Button
                                    type="primary"
                                    onClick={showUpdateFileModal}
                                    disabled={!selectedRow}
                                >
                                    Изменить файл
                                </Button>
                                {selectedRow ?
                                    <UpadteFileHelpModal
                                        selectedRow={selectedRow}
                                        open={isUpdateFileModalOpen}
                                        onCancel={hideUpdateFileModal}
                                        onFileUpdate={handleUpdateFile}
                                    />
                                    : <></>}
                                <Button
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

export default observer(AdminHelp)
