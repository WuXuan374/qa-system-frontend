import { Layout, Menu } from 'antd';
import { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function QAPage(props) {
  const { breadCrumb, children, history } = props;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed} 
        theme="light"
      >
        <div className="logo" />
        <Menu 
          theme="light" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="/qa" icon={<PieChartOutlined />}>
            <Link to="/qa">我要提问</Link>
          </Menu.Item>
          <Menu.Item key="/history" icon={<DesktopOutlined />}>
            <Link to="/history">历史问题</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="模型">
            <Menu.Item key="/model/train">
              <Link to="/model/train">模型训练</Link>
            </Menu.Item>
            <Menu.Item key="/model/evaluation">
              <Link to="/model/evaluation">模型评测</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          {breadCrumb}
          {children}
        </Content>
        <Footer style={{ textAlign: 'center', color: '#8590a6'}}>
          <p><b>问答系统</b></p>
          <p>作者: 吴轩</p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default QAPage;