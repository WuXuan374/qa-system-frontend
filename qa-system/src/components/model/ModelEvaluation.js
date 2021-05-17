import { Breadcrumb, Card, Descriptions, Popover, Skeleton, Statistic } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import { 
  apis, 
  triggerAPIRequest,
  HTTP_GET,
} from '../../api/apiConfig';
import QAPage from '../common/QAPage';
import { ChartContainer } from './style';
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const LabelWithTips = (props) => {
  const { label, tips } = props;
  return (
    <span>
      <span style={{ marginRight: 5 }}>{label}</span>
      <Popover content={tips}>
        <QuestionCircleOutlined />
      </Popover>
    </span>
  )
}

const ModelEvaluation = () => {
  const [evaluationData, setEvaluationData] = useState([]);
  const [modelDetail, setModelDetail] = useState();

  const getEvaluationResults = (model_name) => {
    triggerAPIRequest(`${apis.model.evaluation}/?model_name=${model_name}`, HTTP_GET)
      .then((data) => {
        setEvaluationData(data)
      })
  };

  const getModelDetail = (model_name) => {
    triggerAPIRequest(`${apis.model.detail}/?model_name=${model_name}`, HTTP_GET)
      .then((data) => {
        setModelDetail(data)
      })
  };

  useEffect(() => {
    getEvaluationResults('BiDAF');
    getModelDetail('BiDAF');
  }, []);

  // Loss 图表数据
  const lossData = useMemo(() => (
    evaluationData.map(item => ({
      'epoch': item.epoch,
      'loss': item.loss
    }))
  ), [evaluationData]);

  // EM 图表数据
  const EMData = useMemo(() => (
    evaluationData.map(item => ({
      'epoch': item.epoch,
      'EM': item.exactMatch
    }))
  ), [evaluationData]);

  // F1 图表数据
  const f1Data = useMemo(() => (
    evaluationData.map(item => ({
      'epoch': item.epoch,
      'F1': item.f1
    }))
  ), [evaluationData]);

  const {
    name,
    dataset,
    word_dimension,
    batch_size,
    character_dimension,
    dropout_rate,
    learning_rate,
    context_len
  } = modelDetail || {};

  return (
    <QAPage
      breadCrumb={(
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Model</Breadcrumb.Item>
          <Breadcrumb.Item>Evaluation</Breadcrumb.Item>
        </Breadcrumb>
      )}
    >
      <Card style={{ margin: 10 }}>
        {modelDetail ? (
          <Descriptions title="模型详情" colon=":" column={12}>
            <Descriptions.Item label="模型名称" span={3}>{name}</Descriptions.Item>
            <Descriptions.Item label="训练数据集" span={3}>{dataset}</Descriptions.Item>
            <Descriptions.Item label="词向量维度" span={3}>{word_dimension}</Descriptions.Item>
            <Descriptions.Item label="Batch Size" span={3}>{batch_size}</Descriptions.Item>
            <Descriptions.Item label="字符嵌入维度" span={3}>{character_dimension}</Descriptions.Item>
            <Descriptions.Item 
              label={
                <LabelWithTips 
                  label="Dropout Rate" 
                  tips="通过忽略特征检测器，避免过拟合" 
                />
                } 
              span={3}
            >
              {dropout_rate}
            </Descriptions.Item>
            <Descriptions.Item label={<LabelWithTips label="Learning Rate" tips="优化器的学习速率" />} span={3}>
              {learning_rate}
            </Descriptions.Item>
            <Descriptions.Item label={<LabelWithTips label="Context Length" tips="数据集中，所选取文章的最大长度" />} span={3}>
              {context_len}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Skeleton active />
        )}
        
      </Card>

      <Card style={{ margin: 10 }}>
        <div style={{ border: '1px solid #669999', padding: '1%', display: 'flex', justifyContent: 'space-between' }}>
          <ChartContainer>
            <h3>Chart of Train Loss</h3>
            <BarChart width={350} height={250} data={lossData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" label="epoch" />
              <YAxis>
                <Label value="%" offset={0} position="insideLeft" fontSize={14} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="loss" fill="#82ca9d" />
            </BarChart>
          </ChartContainer>
          
          <ChartContainer>
            <h3>Chart of F1 Metric</h3>
            <BarChart width={350} height={250} data={f1Data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" label="epoch" />
              <YAxis>
                <Label value="%" offset={0} position="insideLeft" fontSize={14} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="F1" fill="#FFC658" />
            </BarChart>
          </ChartContainer>
          
          <ChartContainer>
            <h3>Chart of Exact Match Metric</h3>
            <BarChart width={350} height={250} data={EMData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" label="epoch" />
              <YAxis>
                <Label value="%" offset={0} position="insideLeft" fontSize={14} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="EM" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </div>
        
      </Card>

    </QAPage>
    
  );
};

export default ModelEvaluation;