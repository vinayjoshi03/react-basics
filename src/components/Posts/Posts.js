import React,{Component} from 'react'
import {Row, Col} from 'react-bootstrap';
import PostGrid from './Post/PostGrid'
import AddPost from './Post/AddPost'
import ModelComponent from '../UI/ModalComponent/ModalComponent'
import {connect} from 'react-redux'
class Posts extends Component {
    constructor(props) {
        super(props);
        //this.disableSubmit=true;
        this.state = {
            loadedPost:null,
            posts:[],
            isLoaded:false,
            postTitle:'',
            modelBody:'',
            showModel: false,
            disableSubmit: true, 
            errorMessage:{}
        }
    }
    
    validateFields(key, value) {
        let errors = this.validate(key, value, this.state.errorMessage);
        if(Object.keys(errors).length<=0) {
            this.setState({disableSubmit:false, errorMessage:errors});
        } else {
            this.setState({disableSubmit:true, errorMessage:errors});
        }
    }
    
    validate(key, value, errorData) {
        let errors = errorData;
        var letters = /^[A-Za-z ]+$/;
        switch(key){
            case 'title':
                    if(!value) {
                        errors[key]="Title field is required";
                    } else if(value !='' && !new RegExp(letters).test(value)) {
                            errors[key]="Title should contain only charactors and spaces"
                    } else {
                        delete errors[key];
                    }
                    
                    break;
            case 'description':        
                    if(value === '') {
                        errors[key]="Description is required field";
                    
                    } else {
                        delete errors[key];
                    }
                    
                    break;
            case 'status':        
                    if(value!=1) {
                        errors[key]="Default status should be active";
                    } else {
                        delete errors[key];
                    }
                    
                    break;
        }
        return errors;
    }

    handleViewPost(postid){
        
        this.setState({selectedPost:postid, showModel:true});
    }

    async handleSubmit(data){
        let errors = {};
        Object.keys(data).map((key, index)=>{
            let error = this.validate(key, data[key], this.state.errorMessage);
            if(typeof error[key] != 'undefined') {
                errors[key]=error[key];
            }
        });
        if(Object.keys(errors).length<=0) {
            this.setState({disableSubmit:false, errorMessage:errors});
        } else {
            this.setState({disableSubmit:true, errorMessage:errors});
        }
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
                <p onClick={this.props.onIncCounter}>Click</p>
                <Col>
                    {this.props.postsCount}
                    <h1>Posts</h1>
                    <div>{loadingData(this.props)}</div>
                </Col>
                <ModelComponent title={this.state.postTitle} modelBody={this.state.modelBody} handleClose={this.handleModelClose.bind(this)} show={this.state.showModel}/>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        postsCount:state.counter
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIncCounter:()=> dispatch({type:'INC_COUNT',data:[{username:'vinay'}]})
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)