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

import SermonCard from './SermonCard.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      holidays: false,
      advent: false,
      //This stores the entire JSON file from server.
      series: null,

    };
    this.SortByDate = this.SortByDate.bind(this);
   this.SortByDateString = this.SortByDateString.bind(this);
  }

  SortByDate(a, b) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  SortByDateString(a, b) {
        return b.date - a.date;
    }

componentDidMount(){
  
  fetch('https://hidden-brook-22839.herokuapp.com/series.json')
   // fetch('http://192.168.43.129:3001/series.json')
  .then(response => response.json())
  .then(data => {
    var seriesData = data.series;
    seriesData.sort(this.SortByDate);

    seriesData.map((series, i) =>
      series.services.sort(this.SortByDateString)
    );

    this.setState({series: seriesData});
    
    });

  }
  render() {
    let sermonCards = <Col className="bg-proxy" xs="12">
      <img 
      src={require('./img/loading.png')} 
      className="loader" 
      alt="logo" />
      <p>Loading, Please wait</p>
      </Col>;

    if(this.state.series != null){
      sermonCards =
        this.state.series.map((series, i) =>

         <SermonCard
         series={this.state.series}
         title={this.state.series[i].title}
         subtitle={this.state.series[i].subtitle}
         text={this.state.series[i].text}
         image={this.state.series[i].image}
         services={this.state.series[i].services}
         service_url={this.state.series[i].services[0].date}
         />

      );
    }


    return (
      <div className="App bg-gray">
        <header className="App-header">
          <a href='https://oslcarcadia.com'>
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" />
          </a>
          <h1 className="App-title">Sermon Recordings</h1>
          <script src="bundle.js"></script>
          <link rel="shortcut icon" type="image/x-icon" href={logo} />
    
          <title>OSLCArcadia</title>

        </header>
        <div className="bg-gray">

          <Container>
            <Row>
            
            {sermonCards}

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
