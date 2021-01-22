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
} from './mockData'
import { useState } from 'react'


function App() {
  const [question, setQuestion] = useState("")

  const onSearch = () => {
    console.log(question)
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
            options={options}
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
