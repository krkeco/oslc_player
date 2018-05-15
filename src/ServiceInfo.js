import React, { Component, Linking } from 'react';

import logo from './img/full.svg';
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



export default class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bulletin_toggle: false,
    };

   this.parseDate = this.parseDate.bind(this);
  }

  bulletinToggle = () => {
    this.setState({
      bulletin_toggle: !this.state.bulletin_toggle
    });
  }

  componentDidMount(){
    // this.setState({date: this.props.services[0].date});
  }

  parseDate(date){
  	return date.slice(4,6) + "/" + date.slice(6,8) + "/" + date.slice(0,4);
  }

  render() {

    return (

      <div>
        <div onClick={this.collapseToggle}>
          <h3>{this.props.title} -- {this.parseDate(this.props.date)}</h3>
          <h4>{this.props.speaker}</h4>
          <p className="small-font">Worship Service:</p>
          <audio controls preload="none" className="audio">
            <source src={"https://oslcarcadia.com/sermons/"+this.props.date +"_service.mp3"} type="audio/mpeg"/>
          </audio>

          <p className="small-font">Sermon only:</p>
          <audio controls preload="none" className="audio">
            <source src={"https://oslcarcadia.com/sermons/"+this.props.date +"_sermon.mp3"} type="audio/mpeg"/>
          </audio>
          <br/>
        </div>
      
        <Collapse isOpen={!this.state.bulletin_toggle}>
          <Button onClick={this.bulletinToggle}>Click to View Bulletin</Button>
        </Collapse>
        
        <Collapse isOpen={this.state.bulletin_toggle}>
          <iframe src={this.props.bulletin} className="bulletin" frameborder="0"></iframe>
          <Button onClick={this.bulletinToggle}>Click to Collapse</Button>
        </Collapse>

        <br/>
        <br/>
      </div>

    );
  }
}
