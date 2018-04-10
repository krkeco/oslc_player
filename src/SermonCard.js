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
      service_urls: ['fake data'],
      date: 'no date',

    };

    this.tHoliday = this.tHoliday.bind(this);
    this.getUrl = this.getUrl.bind(this);
   this.parseDate = this.parseDate.bind(this);
  }

  tHoliday() {
    this.setState({
      holidays: !this.state.holidays
    });
  }

  componentDidMount(){
    // this.setState({date: this.props.services[0].date});
  }

  getUrl(date){
    return "https://oslcarcadia.com/sermons/" + date + "_sermon.mp3";
  }

  parseDate(date){
  	return date.slice(4,6) + "/" + date.slice(6,8) + "/" + date.slice(0,4);
  }

  render() {

  const componentClasses = ['example-component'];
  if (this.state.holidays) { componentClasses.push('show'); }
  

    let card =
     <Card  onClick={this.tHoliday} className="bg-card">
                <CardBody>
                  <CardTitle>{this.props.title}</CardTitle>
                  <CardSubtitle>{this.props.subtitle}</CardSubtitle>
                  <img  src={this.props.image} className={componentClasses.join(' ')} alt="Card image cap" />
                
    <div className={componentClasses.join(' ')}></div>
                  <CardText>{this.props.text}</CardText>


                <Collapse isOpen={this.state.holidays}>
              


      {this.props.services.map((service, i) => 
        <div>
          <h3>{this.props.services[i].title} -- {this.parseDate(this.props.services[i].date)}</h3>
          <p className="small-font">Worship Service:</p>
          <audio controls preload="none" className="audio">
            <source src={"https://oslcarcadia.com/sermons/"+this.props.services[i].date +"_service.mp3"} type="audio/mpeg"/>
          </audio>

          <p className="small-font">Sermon only:</p>
          <audio controls preload="none" className="audio">
            <source src={"https://oslcarcadia.com/sermons/"+this.props.services[i].date +"_sermon.mp3"} type="audio/mpeg"/>
          </audio>
          <br/>
          <br/>
        </div>
      )}

                 
                </Collapse>

                <Collapse isOpen={!this.state.holidays}>
                  <CardText>click to view series</CardText>
                </Collapse>

                </CardBody>
              </Card>;

    return (

            <Col xs={{size:10, offset:1}} className="card-container">
             {card}
              </Col>

    );
  }
}
