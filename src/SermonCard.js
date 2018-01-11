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

        series:[
        {
          title: 'no title',
          subtitle: '',
          text: '',
          image: '',
          services: [
            {
              title: '',
              date: '',
            }
          ],
        },
      ],
    };

    this.tHoliday = this.tHoliday.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  tHoliday() {
    this.setState({
      holidays: !this.state.holidays
    });
  }

  componentDidMount(){
    this.setState({series: this.props.series});
  }

  getUrl(date){
    return "https://oslcarcadia.com/sermons/" + date + "_sermon.mp3";
  }

  render() {
    
    let sermons=[];
    let services=[];
        
    let service_view = 
      this.props.series.services.map((service, i) =>
         
       {
                  {services.push("https://oslcarcadia.com/sermons/" + this.props.series.services[i].date + "_service.mp3")}
                  {sermons.push("https://oslcarcadia.com/sermons/" + this.props.services[i].date + "_sermon.mp3")}
               } 
          
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
              


      {this.props.series.services.map((service, i) =>
        <div>
              <h3>{this.props.services[i].title}</h3>
                  {this.props.services[i].date}
          <p className="small-font">Worship Service:</p>
          <audio controls preload="none" className="audio">
            <source src={services[i]} type="audio/mpeg"/>
          </audio>

          <p className="small-font">Sermon only:</p>
          <audio controls preload="none" className="audio">
            <source src={sermons[i]} type="audio/mpeg"/>
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
              </Card>
              </Col>

    );
  }
}
