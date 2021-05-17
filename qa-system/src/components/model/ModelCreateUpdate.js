import { Button, Form, InputNumber, Input, Card, Breadcrumb, PageHeader, message as antdMessage } from 'antd';
import React, { useEffect, useState } from 'react';
import { triggerAPIRequest, apis, HTTP_GET, HTTP_POST } from '../../api/apiConfig';
import QAPage from '../common/QAPage';

const ModelCreateUpdate = (props) => {
  const { state: formInitialValues } = props.location || {};
  const [existModelNames, setExistModelNames] = useState();

  const getModelList = () => {
    triggerAPIRequest(`${apis.model.detail}/`, HTTP_GET)
      .then((data) => {
        const names = data && data.map(item => item.name)
        setExistModelNames(names)
      })
  };

  const onSubmit = async () => {
    await form.validateFields();
    triggerAPIRequest(`${apis.model.create}/`, HTTP_POST, form.getFieldsValue())
      .then(({ message }) =>  antdMessage.success(message) )
      .catch(({ error }) => antdMessage.error(error))
  }
  
  useEffect(() => {
    getModelList();
  }, []);

  const [form] = Form.useForm();
  return (
    <QAPage
      breadCrumb={(
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Model</Breadcrumb.Item>
          <Breadcrumb.Item>CreateUpdate</Breadcrumb.Item>
        </Breadcrumb>
      )}
    >
      <Card style={{ margin: 10 }}>
        <div>
          <PageHeader
            title='模型创建'
            subTitle='创建一个新模型'
            onBack={() => props.history.goBack()}
          />
        </div>
        
        <div style={{ border: '1px solid #669999', padding: '1%', margin: 10 }}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10, offset: 1 }}
            layout='horizontal'
            form={form}
            initialValues={formInitialValues}
            onFinish={onSubmit}
            scrollToFirstError
          >
            <Form.Item
              label="模型名称"
              name="name"
              required
              rules={[{
                validator(_, value) {
                  if (!value || !existModelNames || !existModelNames.includes(value)) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('模型名称必须唯一，不能与已有名称重复');
                  }
                }
              }]}
            >
              <Input placeholder="请输入唯一模型名称" size="middle" />
            </Form.Item>
            <Form.Item
              label="词向量维度"
              name="word_dimension"
              required
              rules={[{
                type: 'number',
                min: 50,
                max: 300
              }]}
            >
              <InputNumber min={50} max={300} step={50} />
            </Form.Item>
            <Form.Item
              label="Batch Size"
              name="batch_size"
              required
              rules={[{
                type: 'number',
                min: 20,
                max: 200
              }]}
            >
              <InputNumber min={20} max={200} step={10}/>
            </Form.Item>
            <Form.Item
              label="Character Embedding Dimension"
              name="character_dimension"
              required
              rules={[{
                type: 'number',
                min: 5,
                max: 20
              }]}
            >
              <InputNumber min={5} max={20} />
            </Form.Item>
            <Form.Item
              label="Dropout Rate"
              name="dropout_rate"
              rules={[{
                type: 'number',
                min: 0,
                max: 1
              }]}
            >
              <InputNumber min={0} max={1} step={0.01}/>
            </Form.Item>
            <Form.Item
              label="Learning Rate"
              name="learning_rate"
              rules={[{
                type: 'number',
                min: 0,
                max: 1
              }]}
            >
              <InputNumber min={0} max={1} step={0.01}/>
            </Form.Item>
            <Form.Item
              label="Context Length"
              name="context_len"
              rules={[{
                type: 'number',
                min: 1,
                max: 400
              }]}
            >
              <InputNumber min={1} max={400} step={1}/>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </div>
       
      </Card>
    </QAPage>
    
  )
}

export default ModelCreateUpdate;