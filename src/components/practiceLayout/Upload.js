import { UploadOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined,DownloadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Card, Table, Tag, Modal } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { fetchResultByUserForPractice, patchResFile, sendResult } from '../../http/practiceAPI';
import { observer } from 'mobx-react-lite';


const SendPractice = (props) => {
  const [result, setResult] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { user } = useContext(Context)
  useEffect(() => {
    fetchResultByUserForPractice(user.user.id, props.practice.id).then(({ data }) => setResult(data))
  }, [open, send]);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('practiceId', props.practice.id)
      formData.append('description', '')
      formData.append('userId', user.user.id)
      formData.append('file', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    try {
      sendResult(formData).then((res) => res.json)
        .then(() => {
          setFileList([]);
          message.success('Файл успешно загружен');
          setSend(true)
        }
        )
    } catch (error) {
      message.error('Ошибка.');
    }
    finally {
      setUploading(false);

    }
  };
  const handleUpdateUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    try {
      setConfirmLoading(true);
      patchResFile(user.user.id, props.practice.id ,formData).then((res) => res.json)
        .then(() => {
          setFileList([]);
          message.success('Файл успешно изменен');
          setOpen(false);
          setConfirmLoading(false);
        }
        )
    } catch (error) {
      message.error('Ошибка.');
    }
    finally {
      setUploading(false);

    }
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
  const columns = [
    {
      title: "Файл",
      dataIndex: "file",
      key: 'fileId',
      render: (file) =>  <a download target='_blank' href={process.env.REACT_APP_API_URL+'uploads/'+file.folder+'/'+file.fileName} >{file.fileName}</a>
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
      render: () => (
        <>
          <Button icon={<UploadOutlined />} onClick={showModal}>Изменить результат работы</Button>
          <Modal
            title="Изменить результат работы"
            open={open}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
            Назад
          </Button>,
            ]}
          >
            <>
              <Upload {...properties}>
                <Button icon={<UploadOutlined />}>Изменить результат работы</Button>
              </Upload>
              <Button type="primary" onClick={handleUpdateUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
              >{uploading ? 'Загрузка' : 'Начать загрузку'}</Button>
            </>
          </Modal>
        </>
      )
    },

  ]
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (

    <div style={{ marginTop: '12px' }}>
      {console.log(result)}
      {!result ?
        <>
          <Upload {...properties}>
            <Button icon={<UploadOutlined />}>Загрузить результат работы</Button>
          </Upload>
          <Button type="primary" onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{
              marginTop: 16,
            }}
          >{uploading ? 'Загрузка' : 'Начать загрузку'}</Button>
        </> :
        <div>
          <Card title="Реультат был загружен">
            <Table dataSource={[result]} columns={columns} pagination={false} scroll={{ x: 300 }} >

            </Table>
          </Card>
        </div>
      }

    </div>
  );
};
export default observer(SendPractice);