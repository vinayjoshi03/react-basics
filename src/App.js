import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Header from './components/Layout/Header'
import User from './components/User/User'
import PostContainer from './containers/Post/PostContainer'
import Layout from './components/Layout/Layout'
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Axios from 'axios';
import {connect} from 'react-redux'


class App extends Component{
  state={
    isLoaded:false
  }
  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/users').then(response=>{
        this.setState({isLoaded:true});
        this.props.addUsers({usersData:response.data,type:'Add_USERS', isLoaded:true});
    });
  }

  render() {
    return (
      <Container border="primary">
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
}

const connectDispatchToProps=dispatch=>{
  return {
      addUsers:data=>dispatch(data)
  }
}

export default connect(null,connectDispatchToProps)(App);
