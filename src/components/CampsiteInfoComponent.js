import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col, Input } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

//check that the value coming from the input field has contents
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length > len); 


class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    //METHODS
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        // alert('Current State is: ' + JSON.stringify(values));
        console.log('Current State is: ' + JSON.stringify(values));
        console.log(this.props);


    }


    render() {
        return(
            <React.Fragment>
                {/* BUTTON */}
                <Button outline className="fa fa-pencil" onClick={this.toggleModal}> Submit Comment</Button>
                
                {/* MODAL */}
         
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                                Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <Label htmlFor="rating">Rating</Label>
                                            <Control.select defaultValue="1" className="form-control" model=".rating" id="rating" name="rating">
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                            </Control.select>
                                            
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="author">Your Name</Label>
                                            <Control.text model=".author" id="author" name="author"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    minLength: minLength(2),
                                                    maxLength: maxLength(15)
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                component="div"
                                                messages={{
                                                    minLength: 'Must be at least 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    </div>
                                    <div className="form-group">
                                        <Label htmlFor="text">Comment</Label>
                                            <Control.textarea model=".text" id="text" name="text"
                                                rows="6"
                                                className="form-control"
                                                placeholder="Comment"
                                            />
                                    </div>
        
                                    <div className="form-group">
                                            <Button type="submit" color="primary">
                                                Submit Comment
                                            </Button>
                                    </div>
                                </LocalForm>
                        </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

//Render the card.
function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

//Render comments
function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment=>{
                        return(
                            <div key={comment.id} className="m-3">
                                <div>"<em>{comment.text}</em>"</div>
                                <div> --{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                            </div>
                        );
                    })
                       
                    }
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }
        else{
            return <div/>
        }
    }

//RENDER CAMPSITE INFO OBJECT ----------------------------------------------------------------------------------
function CampsiteInfo(props){

    //Display Loading message while async task completes.
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    //Display error message if asyn task does not complete.
    if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        )
    }

    //When async task completes successfully, display results.
    if(props.campsite){

        console.log('From campsite info: ' + props.campsite);

        return(
        <div className="container">
            <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id} />
            </div>
        </div>
        );
        
    }
    else{
        return(
            <div>This is an empty div</div>
        );
    }
}


export default CampsiteInfo;