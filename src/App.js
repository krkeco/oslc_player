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
    };

    this.toggle = this.toggle.bind(this);
    this.tHoliday = this.tHoliday.bind(this);
    this.tAdvent = this.tAdvent.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  tHoliday() {
    this.setState({
      holidays: !this.state.holidays
    });
  }
  tAdvent() {
    this.setState({
      advent: !this.state.advent
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href='https://oslcarcadia.com'>
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" />
          </a>
          <h1 className="App-title">Sermon only Recordings</h1>
          <script src="bundle.js"></script>
          <link rel="shortcut icon" type="image/x-icon" href={logo} />
    
          <title>OSLCArcadia</title>

        </header>
        <div className="bg-gray">
          <Container>
            <Row>

             <SermonCard
             title="Living In The Middle"
             subtitle=""
             text="Pastor Demel talks about living between Christ's comings"
             image={require('./img/middle.jpg')}
             services={[['Living In The Middle',20180107],
                        ]}
             />

            <SermonCard
             title="Holiday Recordings"
             subtitle="Christmas and New Year's Eve"
             image={require('./img/holiday.jpg')}
             services={[['Christmas Eve',20171224],
                        ['New Year Eve',20171231],
                        ]}
             />  

             <SermonCard
             title="Advent-URE"
             subtitle="Three Part Series on Advent"
             text="Pastor Demel speaks on three aspects of Advent: Understand, Return, and Enjoy."
             image={require('./img/adventure.jpeg')}
             services={[['Part 1: Understanding',20171203],
                        ['Part 2: Return',20171210],
                        ['Part 3: Enjoy',20171217],
                        ]}
             />

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
