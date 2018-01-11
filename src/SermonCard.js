import React, { Component, Linking } from 'react';

import logo from './img/full.svg';
import adventure from './img/adventure.jpeg';
import holiday from './img/holiday.jpg';
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      holidays: false,
      advent: false,
    };

    this.tHoliday = this.tHoliday.bind(this);
  }

  tHoliday() {
    this.setState({
      holidays: !this.state.holidays
    });
  }

  render() {
    
    let sermons=[];
    let services=[];
        
    let service_view = 
      this.props.services.map((service, i) =>
         
        <div>
        <script>{services.push("https://oslcarcadia.com/sermons/" + this.props.services[i][1] + "_service.mp3")}
        {sermons.push("https://oslcarcadia.com/sermons/" + this.props.services[i][1] + "_sermon.mp3")}
      </script>
          <h3>{this.props.services[i][0]}</h3>
                  
          <p className="small-font">Worship Service:</p>
          <audio controls preload="none" className="audio">
            <source src={services[i]} type="audio/mpeg"/>
          </audio>

          <p className="small-font">Sermon only:</p>
          <audio controls preload="none" className="audio">
            <source src={sermons[i]} type="audio/mpeg"/>
          </audio>
          <br/>
        </div>
      );

    return (

            <Col xs={{size:10, offset:1}} className="card-container">
              <Card  onClick={this.tHoliday} className="bg-card">
                <CardBody>
                  <CardTitle>{this.props.title}</CardTitle>
                  <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                  <CardImg width="50%" src={this.props.image} alt="Card image cap" />
                
                  <CardText>{this.props.text}</CardText>


                <Collapse isOpen={this.state.holidays}>
              
              {service_view}

                 
                </Collapse>

                <Collapse isOpen={!this.state.holidays}>
                  <CardText>click to view series</CardText>
                </Collapse>

                </CardBody>
              </Card>
              </Col>

    );
  }
}
