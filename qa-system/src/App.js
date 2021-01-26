import './App.css';
import { AutoComplete, Button, PageHeader, Select, message, Table } from 'antd'
import {
  BodyContainer,
  ContentContainer,
  QuestionContainer,
  QuestionTitle,
  ButtonsContainer,
} from './style'
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
const { Option } = Select

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
      dataIndex: 'score'
    }
  ]
 
  return (
    <BodyContainer>
      <PageHeader 
        title="QA system"
        subTitle="Author: Wu Xuan"
      />
      <ContentContainer>
        <QuestionContainer>
          <QuestionTitle>问题:</QuestionTitle>
          <AutoComplete
            value={question}
            style={{ width: 300}}
            placeholder="input here"
            filterOption={(inputValue, option) => 
              option.value.includes(inputValue)
            }
            onChange={(data) => setQuestion(data)}
          >
            {keywords.map((keyword) => 
              <Option value={keyword} key={keyword}>{keyword}</Option>
            )}
          </AutoComplete>
        </QuestionContainer>
        <ButtonsContainer>
          <Button 
            type="primary"
            disabled={!question || question === ""}
            onClick={onSearch}
          >
            Search
          </Button>
          <Button onClick={onClear}>clear</Button>
        </ButtonsContainer>
        <Table
          dataSource={answers}
          columns={columns}
        />
      </ContentContainer>
    </BodyContainer>
  );
}

export default App;
