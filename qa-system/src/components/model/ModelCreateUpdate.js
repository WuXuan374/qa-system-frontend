import { Button, Form, InputNumber, Input, Card, Breadcrumb, PageHeader } from 'antd';
import React from 'react';
import QAPage from '../common/QAPage';

const ModelCreateUpdate = (props) => {
  console.log(props);
  const { state: formInitialValues } = props.location || {};
  const [form] = Form.useForm();
  console.log(form.getFieldsValue());
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
            onFinish={() => console.log(form.getFieldsValue())}
          >
            <Form.Item
              label="模型名称"
              name="name"
              required
            >
              <Input placeholder="请输入唯一模型名称"/>
            </Form.Item>
            <Form.Item
              label="词向量维度"
              name="word_dimension"
              required
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Batch Size"
              name="batch_size"
              required
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Character Embedding Dimension"
              name="character_dimension"
              required
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Dropout Rate"
              name="dropout_rate"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Learning Rate"
              name="learning_rate"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Context Length"
              name="context_len"
            >
              <InputNumber />
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