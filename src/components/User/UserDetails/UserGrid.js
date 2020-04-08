import React,{Component} from 'react'
import {Table} from 'react-bootstrap';
import Axios from 'axios';
class UserGrid extends Component {
    state = {
        users:[],
        isLoaded:false
    }
    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/users').then(response=>{
            this.setState({users:response.data, isLoaded:true});
            console.log(response.data[0].address.city);
        });
        
    }
    render() {
        let UserData = this.state.users.map((user,key)=> {
            return (
                <tr key={user.id+"id"}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.city}</td>
                </tr>
            )
        });
        if(!this.state.isLoaded) {
            UserData = (
            <tr>
                <td>Loading...</td>
            </tr> 
            )
        }
        return (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {UserData}
              </tbody>
            </Table>           
        );
    }
}

export default UserGrid