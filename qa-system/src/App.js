import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import FavoriteAnswersList from './components/answers/favoriteList';
import ModelCreateUpdate from './components/model/ModelCreateUpdate';
import ModelDetail from './components/model/ModelDetail';
import ModelList from './components/model/ModelList';
import QuestionAnswering from './components/QuestionAnswering/QuestionAnswering';
function App(){
  return (
    <Switch>
      <Route path="/qa" component={QuestionAnswering}/>
      <Route path="/model/list" component={ModelList}/>
      <Route path="/model/detail/:model_name" component={ModelDetail}/>
      <Route path="/model/create" component={ModelCreateUpdate} />
      <Route path="/answers/favList" component={FavoriteAnswersList} />
      <Route path="/" exact>
        <Redirect to="/qa" />
      </Route>
    </Switch>
  )
}

export default App;
