import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { useContext, useState, useRef } from 'react'
import { Context } from '../..'
import { Table, Button, Input, Space,App} from 'antd'
import Highlighter from 'react-highlight-words';
import { observer } from 'mobx-react-lite';
import { addTheory, deleteTheory, fetchAllTheory, patchTheory, patchTheoryFile } from '../../http/theoryAPI';
import AddTheoryModal from './modalsTheory/AddTheoryModal';
import UpadteTheoryModal from './modalsTheory/UpdateTheoryModel';
import UpadteFileTheoryModal from './modalsTheory/UpdateFileTheoryModal';


function AdminTheory() {
    const [searchText, setSearchText] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isUpdateFileModalOpen, setIsUpdateFileModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null)
    const { notification } = App.useApp();
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const { theoryes } = useContext(Context)
    const dataSource = theoryes.theoryes.map(item => ({ ...item, key: item.id }))
    const getColumnSearchProps = (dataIndex) => ({

        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Сбросить
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Фильтр
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "Файл",
            dataIndex: "file",
            key: 'fileId',
            render: (file) => <a download target='_blank' href={process.env.REACT_APP_API_URL + 'uploads/' + file.folder + '/' + file.fileName} >{file.fileName}</a>,
            sorter: (a, b) => (a.file.fileName).localeCompare(b.file.fileName),
        },
        {
            title: "Номер",
            dataIndex: "number",
            key: 'number',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: "Название",
            dataIndex: "name",
            key: 'name',
            sorter: (a, b) => (a.name).localeCompare(b.name),
            ...getColumnSearchProps('name')
        },
        {
            title: "Описание",
            dataIndex: "description",
            key: 'description',
        },
    ]
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows[0])
        },

    };
    

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false);
        }, 1000);
      };
    const handleDelete = async()=>{
        try {
            deleteTheory(selectedRow.id);
            notification.success({
                message: 'Успешно',
                description: `${selectedRow.name} удалено!`,
                duration:4
            })
            theoryes.setTheoryes(theoryes.theoryes.filter(({id})=> id!==selectedRow.id))
            setSelectedRow(null)
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err} что-то пошло не так!`,
                duration:4
            })
        }
    }
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

    const handleAddTheory = async(values) => {
        try {
            await addTheory(values).then(()=>{
                fetchAllTheory().then(({data})=>theoryes.setTheoryes(data))
            }).then(()=>{
                notification.success({
                    message: 'Успешно',
                    description: `$Теория добавлена!`,
                    duration:4
                })
            })

            hideAddModal();
        } catch (err) {
            notification.error({
                message: 'Ошибка',
                description: `${err.message?err.message:'Неизвестная ошибка'}!`,
                duration:4
            })
        }
    };
    const handleUpdateTheory = async(values) => {
        try {
            await patchTheory(selectedRow.id, values).then(()=>{
                fetchAllTheory().then(({data})=>theoryes.setTheoryes(data))
            }).then(()=>{
                notification.success({
                    message: 'Успешно',
                    description: `Теория изменена!`,
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
    const handleUpdateFileTheory = async(values) => {
        try {
            await patchTheoryFile(selectedRow.id, values).then(()=>{
                fetchAllTheory().then(({data})=>theoryes.setTheoryes(data))
            }).then(()=>{
                notification.success({
                    message: 'Успешно',
                    description: `Файл теории изменен!`,
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
    return (
        <div>
            <Table rowSelection={{
                type: "radio",
                ...rowSelection
            }} dataSource={dataSource} columns={columns}
            scroll={{ x: 600 }}
            footer={() => (
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button type="primary" onClick={showAddModal}>Добавить</Button>
                    <AddTheoryModal
                        open={isAddModalOpen}
                        onCancel={hideAddModal}
                        onAdd={handleAddTheory}
                    />
                    <Button
                        type="primary"
                        onClick={showUpdateModal}
                        disabled={!selectedRow}
                    >
                        Изменить
                    </Button>
                    {selectedRow?
                        <UpadteTheoryModal
                            selectedRow = {selectedRow}
                            open={isUpdateModalOpen}
                            onCancel={hideUpdateModal}
                            onUpdate={handleUpdateTheory}
                        />
                    :<></>}
                    <Button
                        type="primary"
                        onClick={showUpdateFileModal}
                        disabled={!selectedRow}
                    >
                        Изменить файл
                    </Button>
                    {selectedRow?
                        <UpadteFileTheoryModal
                            selectedRow = {selectedRow}
                            open={isUpdateFileModalOpen}
                            onCancel={hideUpdateFileModal}
                            onFileUpdate={handleUpdateFileTheory}
                        />
                    :<></>}
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

        </div>
    )
}

export default observer(AdminTheory)
