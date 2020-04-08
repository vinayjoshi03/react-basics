import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Header from './components/Layout/Header'
import User from './components/User/User'
import PostContainer from './containers/Post/PostContainer'
import Layout from './components/Layout/Layout'
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Container id="root" border="primary">
      <Router>
        <Layout>
          <Header />
          <Switch>
            <Route exact path="/">
              <User />
            </Route>
            <Route path="/post-list">
              <PostContainer currentPage="post-list" />
            </Route>
            <Route path="/users">
              <User />
            </Route>
            <Route path="/addpost">
              <PostContainer currentPage="addpost" />
            </Route>
          </Switch>
          <Row><Col className="bg-light">Footer</Col></Row>
        </Layout>
      </Router>
    </Container>
  );
}
export default App;
