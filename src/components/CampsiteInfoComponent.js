import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class CampsiteInfo extends Component {

    //Render the card.
    renderCampsite(campsite){
        if(campsite){
            return(
                <div className="col-md-5 m-1">
                    <Card>
                         <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardTitle>{campsite.name}</CardTitle>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }

        else{
            return <div/>
        }

    }

    //Render comments
    renderComments(comments){
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
                </div>
            );
        }
        else{
            return <div/>
        }

    }


    //RENDER MAIN ----------------------------------------------------------------------------------
    render(){

        if(this.props.campsite){

            return(
           <div className="container">
                <div className="row">
                    {this.renderCampsite(this.props.campsite)}
                    {this.renderComments(this.props.campsite.comments)}
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

}

export default CampsiteInfo;