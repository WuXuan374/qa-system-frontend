import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import ModelEvaluation from './components/model/ModelEvaluation';
import QuestionAnswering from './components/QuestionAnswering/QuestionAnswering';
function App(){
  return (
    <Switch>
      <Route path="/qa" component={QuestionAnswering}/>
      <Route path="/model/evaluation" component={ModelEvaluation}/>
      <Route path="/" exact>
        <Redirect to="/qa" />
      </Route>
    </Switch>
  )
}

export default App;
