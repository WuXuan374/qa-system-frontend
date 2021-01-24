import './App.css';
import { AutoComplete, Button, PageHeader } from 'antd'
import {
  BodyContainer,
  ContentContainer,
  QuestionContainer,
  QuestionTitle,
  ButtonsContainer,
} from './style'
import {
  options,
} from './mock/mockData'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import './mock/mockApi'
import { apis, prefix } from './api/apis'

// 生成路径的过程可以自动化：比如GET方法自动把参数写成?question="" / 配置文件中配置前缀 
function App() {
  const [question, setQuestion] = useState("")
  const [keywords, setKeywords] = useState([])
  
  useEffect(() =>
    getKeywordsOptions()
  , [])

  const getKeywordsOptions = () => {
    axios.get(`${prefix}${apis.keywords}`)
      .then((res) => {
        setKeywords(res)
      })
      .catch((reason) => console.error(reason))
  }

  const onSearch = () => {
    console.log('inside')
    axios.get(`${prefix}${apis.answers}/?question=${question}`,)
      .then((res) => {
        console.log(res)
      })
      .catch((reason) => console.error(reason))
  }

  const onClear = () => {
    setQuestion('')
  }
 
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
            options={keywords}
            filterOption={(inputValue, option) => 
              option.value.includes(inputValue)
            }
            onChange={(data) => setQuestion(data)}
          >
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
      </ContentContainer>
    </BodyContainer>
  );
}

export default App;
