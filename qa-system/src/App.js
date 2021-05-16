import React from 'react';
import { Route, Switch } from 'react-router-dom'
import QuestionAnswering from './QuestionAnswering';
function App(){
  return (
    <Switch>
      <Route path="/" component={home} exact/>
      <Route path="/qa" component={QuestionAnswering}/>
    </Switch>
  )
}

const home = () => {
  return <div>Hello!</div>
}

export default App;
