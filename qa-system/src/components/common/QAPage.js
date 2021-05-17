import { Layout, Menu } from 'antd';
import { useState } from 'react';
import {
  DesktopOutlined,
  HeartFilled,
  SearchOutlined,
  GoldOutlined,
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
          defaultOpenKeys={['sub1']}
        >
          <Menu.Item key="/qa" icon={<SearchOutlined style={{ color: '#0b8235', fontSize: 18 }} />}>
            <Link to="/qa">我要提问</Link>
          </Menu.Item>
          <Menu.Item key="/answers/favList" icon={<HeartFilled style={{ color: '#F81D52', fontSize: 18 }} />}>
            <Link to="/answers/favList">我的收藏</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<GoldOutlined style={{ fontSize: 18, color: '#48C1FB' }} />} title="模型">
            <Menu.Item key="/model/create">
              <Link to="/model/create">模型创建</Link>
            </Menu.Item>
            <Menu.Item key="/model/list">
              <Link to="/model/list">模型列表</Link>
            </Menu.Item>
            <Menu.Item key="/model/detail/BiDAF">
              <Link to="/model/detail/BiDAF">模型详情</Link>
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