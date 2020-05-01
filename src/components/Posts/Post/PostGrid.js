import React,{Component} from 'react'
import {Table, Button} from 'react-bootstrap';
import Axios from 'axios';
import ModelComponent from '../../UI/ModalComponent/ModalComponent'
import Paginate from './Paginate'
import {connect} from 'react-redux'

class PostGrid extends Component {
    state = {
        loadedPost:null,
        showModel:false,
        selectedPostBody:null,
        postTitle:"Post Details",
        selectedDeletePost:null,
        
    }

    handleDelete=(postid)=>{

        //console.log("Posts", this.props.postsData);

        let myArray = this.props.postsData.filter(function( obj ) {
            return obj.id !== postid;
        });
        this.props.selectedPost = myArray;
        
        this.setState({postTitle:"Delete",showModel:true, selectedPostBody:"Do you want to delete post?"})
    }

    handleModelClose(){
        this.setState({showModel:false});
    }

    viewPostDetailsHandler(selectedPost) {
        if(selectedPost) {
            if(!this.state.loadedPost || (this.state.loadedPost.data.id!==selectedPost)) {
                Axios.get('http://localhost:1337/api/posts/'+selectedPost).then(response=>{
                    this.setState({loadedPost:response.data, selectedPostBody:response.data.data.description, showModel:true});
                });
            }
        }
    }

    render() {
        let PostData = this.props.postsData.map((post,key)=> {
            return (
                <tr key={post.id+"id"}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>
                        <Button 
                            onClick={()=>this.viewPostDetailsHandler(post.id)} 
                            variant="outline-success" 
                            size="sm">View</Button>
                        <Button 
                            onClick={()=>this.handleDelete(post.id)} 
                            variant="outline-danger" 
                            size="sm">Delete</Button>
                    </td>
                </tr>
            )
        });
        
        return (
            <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Username</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {PostData}
              </tbody>
            </Table>
            <Paginate />           
            <ModelComponent title={this.state.postTitle} modelBody={this.state.selectedPostBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel}/>
            </div>
        );
    }
}

const mapStatesToProps=(reduxStates)=>{

}

export default PostGrid