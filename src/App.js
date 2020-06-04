import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <ErrorBoundary><Route path="/main" component={Main}/></ErrorBoundary>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
};

export default App;
