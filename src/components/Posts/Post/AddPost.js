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
        title:null,
        description:null,
        status:1,
        
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }
    async handleChange(event){
        this.setState({[event.target.name]: event.target.value});
        await this.props.validateFields(event.target.name, event.target.value);
    }
    render() {
        //this.props.errorMessage['title'];
        const buttonStyle=()=>{
            if(this.props.disableSubmit) {
                return (
                    <input variant="outline-success" className={'btn btn-outline-secondary'} disabled={this.disableSubmit} type="submit" value="Submit" />                    
                )
            } else {
                    return (<input variant="outline-success" className={'btn btn-success'}  type="submit" value="Submit" />)
            }
        }
        return (
            <div>
                <Form method="POST" onSubmit={this.handleSubmit.bind(this) }>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name="title" onChange={this.handleChange.bind(this)} type="text" placeholder="Post title"/>
                        <p>
                           {this.props.errorMessage['title']}
                        </p>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control name="status" as="select" onChange={this.handleChange.bind(this)}>
                        <option>1</option>
                        <option>0</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="exampleForm.ControlTextarea1" onChange={this.handleChange.bind(this)}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" />
                    </Form.Group>
                    {buttonStyle()}
                </Form>           
            </div>
        )
    }
}

export default AddPost