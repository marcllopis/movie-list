import React from 'react';
import {Switch, Route} from 'react-router-dom'

import Main from './Main'
import Movie from './Movie'


const App = () => (
  <div>
    <Switch>
      <Route
        exact path='/random'
        render={props => <Movie {...props} />}
      />
      <Route
        exact path='/'
        render={props => <Main {...props} />}
      />
    </Switch>
  </div>
)

export default App;
