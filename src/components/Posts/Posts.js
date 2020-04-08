import React,{Component} from 'react'
import {Row, Col} from 'react-bootstrap';
import PostGrid from './Post/PostGrid'
import AddPost from './Post/AddPost'
import ModelComponent from '../UI/ModalComponent/ModalComponent'
class Posts extends Component {
    constructor(props) {
        super(props);
        this.disableSubmit=true;
        this.state = {
            loadedPost:null,
            posts:[],
            isLoaded:false,
            postTitle:'',
            modelBody:'',
            showModel: false,
            disableSubmit: this.disableSubmit, 
            errorMessage:[]
        }
    }
    
    validateFields(key, value) {
        let errors = [];
        var letters = /^[A-Za-z ]+$/;
        switch(key){
            case 'title':
        
                    if(value === '' || value.length<=0) {
                        errors[key] = "Title field is required";
                        this.setState({disableSubmit:true});
                    } 
                    if(!new RegExp(letters).test(value) && value!=='') {
                        errors[key] = "Title should contain only charactors and spaces";
                        this.setState({disableSubmit:true});
                    } 
                    
                    if(value === '' || typeof errors['title'] == 'undefined'){
                        let index = errors.indexOf('title'); 
                        if (index > -1) {
                            errors.splice(index, 1);
                        }
                    }
                    
                    
                    break;
            default: 
                    
                    errors = [];
        }
        console.log(this.state.disableSubmit);
        this.setState({errorMessage:errors});
        
    }
    
    handleViewPost(postid){
        
        this.setState({selectedPost:postid, showModel:true});
    }

    async handleSubmit(data){

        if(!this.state.disableSubmit) {
            const body = 'Loading...';
            this.setState({showModel:true,modelBody:body,postTitle:"Add Post"});
            const postResponse = await this.props.addPostAction(data);
            if(postResponse.status === 200) {
                this.setState({modelBody:'Post Added Successfully'});
            }
        }
    }

    handleModelClose() {
        this.setState({showModel:false,modelBody:null});
    }
    
    render() {
        //this.disableSubmit = this.state.disableSubmit;
        let loadingData=(props)=>{
            if(props.currentPage === 'post-list') {
                return(
                    <PostGrid 
                    handleViewPost={this.handleViewPost.bind(this)} 
                    selectedPost={this.state.selectedPost} 
                    postsData={this.props.postsData} 
                    />      
                )
            }
            if(props.currentPage === 'addpost') {
              return (
                  <div>
                      <AddPost 
                            handleSubmit={this.handleSubmit.bind(this)}
                            disableSubmit={this.state.disableSubmit}   
                            validateFields={this.validateFields.bind(this)}
                            errorMessage={this.state.errorMessage}
                            /></div>
              )  
            }
        }
        return (
            <Row>
                <Col>
                    <h1>Posts</h1>
                    <div>{loadingData(this.props)}</div>
                </Col>
                <ModelComponent title={this.state.postTitle} modelBody={this.state.modelBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel}/>
            </Row>
        )
    }
}
export default Posts