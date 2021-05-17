import { Breadcrumb, Button, Card, PageHeader, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HTTP_GET, triggerAPIRequest, apis } from '../../api/apiConfig';
import QAPage from '../common/QAPage';

const ModelList = (props) => {
  const [modelList, setModelList] = useState();

  const getModelList = () => {
    triggerAPIRequest(`${apis.model.detail}/`, HTTP_GET)
      .then((data) => {
        setModelList(data)
      })
  };

  useEffect(() => {
    getModelList();
  }, []);

  const columns = [
    {
      title: '模型名称',
      dataIndex: 'name',
      render: (value) => (
        <Link to={`/model/detail/${value}`}>
          <Button type="link">{value}</Button>
        </Link>
      ) 
    },
    {
      title: '数据集',
      dataIndex: 'dataset',
    },
    {
      title: '词向量维度',
      dataIndex: 'word_dimension',
    },
    {
      title: 'Batch Size',
      dataIndex: 'batch_size',
    },
    {
      title: 'Character_dimension',
      dataIndex: 'character_dimension'
    },
    {
      title: '模型操作',
      render: (_, record) => (
        <Link to={{
          pathname: '/model/create',
          state: record,
        }}>
          <Button type="link">复制该模型</Button>
        </Link>
      ),
    }
  ]

  return (
    <QAPage
      breadCrumb={(
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Model</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
      )}
    >
      <Card style={{ margin: 10 }}>
        <div>
          <PageHeader
            title='模型列表'
            subTitle='展示当前的所有模型信息'
            onBack={() => props.history.goBack()}
          />
        </div>
        <div style={{ border: '1px solid #669999', padding: '1%', margin: 10 }}>
          <Table
            dataSource={modelList}
            columns={columns}
            pagination={{
              simple: true,
            }}
          />
        </div>
      </Card>
    </QAPage>
  )
};

export default ModelList;