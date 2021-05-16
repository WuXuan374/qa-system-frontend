import { Breadcrumb, Card, Descriptions } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { 
  apis, 
  triggerAPIRequest,
  HTTP_GET,
} from '../../api/apiConfig';
import QAPage from '../common/QAPage';
import { ChartContainer, ContentContainer } from './style';
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ModelEvaluation = () => {
  const [data, setData] = useState([]);
  const getEvaluationResults = (model_name) => {
    triggerAPIRequest(`${apis.model.evaluation}/?model_name=${model_name}`, HTTP_GET)
      .then((data) => {
        setData(data)
      })
  };

  useEffect(() => {
    getEvaluationResults('BiDAF');
  }, []);

  // Loss 图表数据
  const lossData = useMemo(() => (
    data.map(item => ({
      'epoch': item.epoch,
      'loss': item.loss
    }))
  ), [data]);

  // // EM 图表数据
  const EMData = useMemo(() => (
    data.map(item => ({
      'epoch': item.epoch,
      'EM': item.exactMatch
    }))
  ), [data]);

  // // F1 图表数据
  const f1Data = useMemo(() => (
    data.map(item => ({
      'epoch': item.epoch,
      'F1': item.f1
    }))
  ), [data]);

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
        <Descriptions title="User Info">
          <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
          <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
          <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
          <Descriptions.Item label="Remark">empty</Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
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