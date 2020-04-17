import React, {Component} from 'react'
import {Form} from 'react-bootstrap';
class AddPost extends Component {
    /*constructor(props){
        super(props);
    }*/
    constructor(props) {
        super(props);
        this.disableSubmit = this.props.disableSubmit
        this.validationMessages = this.props.errorMessage
    }
    
    state={
        inputData:[],
        postValues:{status:1, title:'', description:''},
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.postValues);
    }
    handleChange(event){
        let data = this.state.postValues;
        data[event.target.name]=event.target.value;

        this.setState({postValues:data});
        this.props.validateFields(event.target.name, event.target.value);
    }
    render() {
        //this.props.errorMessage['title'];
        
        return (
            <div>
                <Form method="POST" onSubmit={this.handleSubmit.bind(this) }>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name="title" onChange={this.handleChange.bind(this)} type="text" placeholder="Post title"/>
                        <p style={{'color':'red'}}>
                           {this.props.errorMessage.title}
                        </p>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control name="status" as="select" onChange={this.handleChange.bind(this)}>
                        <option>1</option>
                        <option>0</option>
                        </Form.Control>
                        <p style={{'color':'red'}}>
                           {this.props.errorMessage.status}
                        </p>
                    </Form.Group>
                    <Form.Group  controlId="exampleForm.ControlTextarea1" onChange={this.handleChange.bind(this)}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" />
                        <p style={{'color':'red'}}>
                           {this.props.errorMessage.description}
                        </p>
                    </Form.Group>
                    <input variant="outline-success" className={'btn btn-success'}  type="submit" value="Submit" />
                </Form>           
            </div>
        )
    }
}

export default AddPost