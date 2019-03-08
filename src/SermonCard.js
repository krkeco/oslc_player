import React, { Component, Linking } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import { 
  Card, 
  CardImg, 
  CardText, 
  CardBody,
  CardTitle, 
  CardSubtitle,
  CardLink, 
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Collapse,
  Container,
  Col,
  Row, } from 'reactstrap';

import ServiceInfo from './ServiceInfo.js';

export default class SermonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      collapse_toggle: false,
      bulletin_toggle: false,
      advent: false,
      service_urls: ['fake data'],
      date: 'no date',
      bulletin_urls: [],
    };

    this.collapseToggle = this.collapseToggle.bind(this);
    this.getUrl = this.getUrl.bind(this);
   this.parseDate = this.parseDate.bind(this);
  }

  collapseToggle() {
    this.setState({
      collapse_toggle: !this.state.collapse_toggle
    });
  }

  bulletinToggle = () => {
    this.setState({
      bulletin_toggle: !this.state.bulletin_toggle
    });
  }

  componentDidMount(){
    // this.setState({date: this.props.services[0].date});
  }

  getUrl(date){
    return "https://oslcarcadia.com/sermons/" + date + "_sermon.mp3";
  }


  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  getPDFUrl = (date) => {
    return "https://oslcarcadia.com/bulletins/"+date +".pdf";
  }

  parseDate(date){
  	return date.slice(4,6) + "/" + date.slice(6,8) + "/" + date.slice(0,4);
  }

  render() {
      const { pageNumber, numPages } = this.state;
 

  const componentClasses = ['series-image'];
  if (this.state.collapse_toggle) { componentClasses.push('show'); }
  

    let card =
     <Card className="bg-card">
      <CardBody style={{minHeight: '75vh'}}> 
      <div onClick={this.collapseToggle}>
        <CardTitle>{this.props.title}</CardTitle>
        <CardSubtitle>{this.props.subtitle}</CardSubtitle>
        <img  src={this.props.image} className={componentClasses.join(' ')} alt="Card image cap" />
      
        <CardText>{this.props.text}</CardText>
      </div>

        <Collapse isOpen={this.state.collapse_toggle} >
      
          {this.props.services.map((service, i) => {
            let haveBulletin = true;
            if(this.props.title == "Confirmation"){
              haveBulletin = false;
            }
            if(this.state.collapse_toggle){
              let bulletin = //"http://docs.google.com/gview?url=
              "https://oslcarcadia.com/bulletins/" + this.props.services[i].date +".pdf";
              //+ ".pdf&embedded=true";
            
              return <ServiceInfo
                      appType={this.props.appType}
                      isOpen={this.props.collapse_toggle}
                      title={this.props.services[i].title}
                      speaker={this.props.services[i].speaker}
                      date={this.props.services[i].date}
                      bulletin={bulletin}
                      haveBulletin={haveBulletin}
                      />}
  
         } )}
        </Collapse>

        <Collapse isOpen={!this.state.collapse_toggle}  >
          <CardText onClick={this.collapseToggle}>click to view series</CardText>
        </Collapse>

      </CardBody>
    </Card>;

    return (

            <Col xs="12" md={{size:10, offset:1}} className="card-container">
             {card}
              </Col>

    );
  }
}
