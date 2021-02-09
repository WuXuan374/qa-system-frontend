import './App.css';
import { AutoComplete, Button, PageHeader, Select, message, Table, Layout, Breadcrumb } from 'antd'
import {
  BodyContainer,
  ContentContainer,
  QuestionContainer,
  QuestionTitle,
  ButtonsContainer,
  AnswerContainer,
  DocumentTitle,
  Score,
  Answer,
  ConcreteAnswer,
} from './style'
import { SearchOutlined, FileOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
// import './mock/mockApi'
import { 
  apis, 
  triggerAPIRequest,
  HTTP_GET,
  HTTP_POST,
  HTTP_PUT,
  HTTP_DELETE 
} from './api/apiConfig'
import zhihu_logo from './zhihuLogo.svg'
const { Option } = Select

const { Header, Content, Footer } = Layout

const AnswerBox = (props) => {
  const { answer, score, document_title, concrete_answer } = props
  return (
    <AnswerContainer>
      <DocumentTitle>
        <FileOutlined />
        来自文章 {document_title}
      </DocumentTitle>
      <Score>该答案的得分为{score.toFixed(2)}</Score>
      <Answer>
        {answer.split(/[,.，。]+/).map((para) => <p>{para}</p>)}
      </Answer>
      {concrete_answer? <p><b>总结:{concrete_answer}</b></p> : <></>}
    </AnswerContainer>
  )
}

// 生成路径的过程可以自动化：比如GET方法自动把参数写成?question="" / 配置文件中配置前缀 
function App() {
  // hooks
  const [question, setQuestion] = useState("")
  const [keywords, setKeywords] = useState([])
  const [answers, setAnswers] = useState([])
  
  useEffect(() =>
    getKeywordsOptions()
  , [])

  // actions
  const getKeywordsOptions = () => {
    triggerAPIRequest(`${apis.keywords}`, HTTP_GET)
      .then((data) => {
        const { keywords } = data
        setKeywords(keywords.map((item) => item[1]))
      })
  }

  const onSearch = () => {
    triggerAPIRequest(`${apis.answers}/?question=${question}`, HTTP_GET)
      .then((data) => {
        const { answers } = data
        setAnswers(answers)
      })
  }

  const onClear = () => {
    setQuestion('')
  }

  // table related
  const columns = [
    {
      title: 'Rank',
      render: (_text, _record, index) => index + 1
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
    },
    {
      title: 'Document title',
      dataIndex: 'document_title',
    },
    {
      title: 'Score',
      dataIndex: 'score',
    },
    {
      title: 'Concrete answer',
      dataIndex: 'concrete_answer',
    }
  ]
 
  return (
    // <BodyContainer>
    //   <PageHeader 
    //     title="QA system"
    //     subTitle="Author: Wu Xuan"
    //   />
    //   <ContentContainer>
    //     <QuestionContainer>
    //       <QuestionTitle>问题:</QuestionTitle>
    //       <AutoComplete
    //         value={question}
    //         style={{ width: 300}}
    //         placeholder="input here"
    //         filterOption={(inputValue, option) => 
    //           option.value.includes(inputValue)
    //         }
    //         onChange={(data) => setQuestion(data)}
    //       >
    //         {keywords.map((keyword) => 
    //           <Option value={keyword} key={keyword}>{keyword}</Option>
    //         )}
    //       </AutoComplete>
    //     </QuestionContainer>
    //     <ButtonsContainer>
    //       <Button 
    //         type="primary"
    //         disabled={!question || question === ""}
    //         onClick={onSearch}
    //       >
    //         Search
    //       </Button>
    //       <Button onClick={onClear}>clear</Button>
    //     </ButtonsContainer>
    //     <Table
    //       dataSource={answers}
    //       columns={columns}
    //     />
    //   </ContentContainer>
    // </BodyContainer>
    <BodyContainer>
      <Layout className="layout">
        <Header>
          <svg viewBox="0 0 64 30" fill="#0066FF" width="64" height="30"><path d="M29.05 4.582H16.733V25.94h3.018l.403 2.572 4.081-2.572h4.815V4.582zm-5.207 18.69l-2.396 1.509-.235-1.508h-1.724V7.233h6.78v16.04h-2.425zM14.46 14.191H9.982c0-.471.033-.954.039-1.458v-5.5h5.106V5.935a1.352 1.352 0 0 0-.404-.957 1.378 1.378 0 0 0-.968-.396H5.783c.028-.088.056-.177.084-.255.274-.82 1.153-3.326 1.153-3.326a4.262 4.262 0 0 0-2.413.698c-.57.4-.912.682-1.371 1.946-.532 1.453-.997 2.856-1.31 3.693C1.444 8.674.28 11.025.28 11.025a5.85 5.85 0 0 0 2.52-.61c1.119-.593 1.679-1.502 2.054-2.883l.09-.3h2.334v5.5c0 .5-.045.982-.073 1.46h-4.12c-.71 0-1.39.278-1.893.775a2.638 2.638 0 0 0-.783 1.874h6.527a17.717 17.717 0 0 1-.778 3.649 16.796 16.796 0 0 1-3.012 5.273A33.104 33.104 0 0 1 0 28.74s3.13 1.175 5.425-.954c1.388-1.292 2.631-3.814 3.23-5.727a28.09 28.09 0 0 0 1.12-5.229h5.967v-1.37a1.254 1.254 0 0 0-.373-.899 1.279 1.279 0 0 0-.909-.37z"></path><path d="M11.27 19.675l-2.312 1.491 5.038 7.458a6.905 6.905 0 0 0 .672-2.218 3.15 3.15 0 0 0-.28-2.168l-3.118-4.563zM51.449 15.195V5.842c4.181-.205 7.988-.405 9.438-.483l.851-.05c.387-.399.885-2.395.689-3.021-.073-.25-.213-.666-.638-.555a33.279 33.279 0 0 1-4.277.727c-2.766.321-3.97.404-7.804.682-6.718.487-12.709.72-12.709.72a2.518 2.518 0 0 0 .788 1.834 2.567 2.567 0 0 0 1.883.706c2.278-.095 5.598-.25 8.996-.41v9.203h-12.78c0 .703.281 1.377.783 1.874a2.69 2.69 0 0 0 1.892.777h10.105v7.075c0 .887-.464 1.192-1.231 1.214h-3.92a4.15 4.15 0 0 0 .837 1.544 4.2 4.2 0 0 0 1.403 1.067 6.215 6.215 0 0 0 2.71.277c1.36-.066 2.967-.826 2.967-3.57v-7.607h11.28c.342 0 .67-.135.91-.374.242-.239.378-.563.378-.902v-1.375H51.449z"></path><path d="M42.614 8.873a2.304 2.304 0 0 0-1.508-.926 2.334 2.334 0 0 0-1.727.405l-.376.272 4.255 5.85 2.24-1.62-2.884-3.98zM57.35 8.68l-3.125 4.097 2.24 1.663 4.517-5.927-.375-.277a2.32 2.32 0 0 0-1.722-.452 2.327 2.327 0 0 0-1.536.896z"></path></svg>
          <span style={{ color: '#8590a6'}}>问答系统</span>
          <AutoComplete
            value={question}
            style={{ width: 300, color: '#121212' }}
            placeholder="请输入你的问题"
            filterOption={(inputValue, option) => 
              option.value.includes(inputValue)
            }
            onChange={(data) => setQuestion(data)}
          >
            {keywords.map((keyword) => 
              <Option value={keyword} key={keyword}>{keyword}</Option>
            )}
          </AutoComplete>
          <ButtonsContainer>
            <Button 
              type="primary"
              disabled={!question || question === ""}
              onClick={onSearch}
            >
              提问
              <SearchOutlined />
            </Button>
            <Button onClick={onClear}>清空</Button>
         </ButtonsContainer>
        </Header>
        <Content style={{ padding: '0 50px'}}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Answers</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Table
            dataSource={answers}
            columns={columns}
          /> */}
          {
            answers.map((item) => 
              <AnswerBox 
                answer={item.answer}
                score={item.score}
                document_title={item.document_title}
                concrete_answer={item.concrete_answer}
              />
            )
          }
        </Content>
        <Footer style={{ textAlign: 'center', color: '#8590a6'}}>
          <p><b>问答系统</b></p>
          <p>作者: 吴轩</p>
        </Footer>
      </Layout>
    </BodyContainer>
    
  );
}

export default App;
