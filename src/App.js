import React, { Component } from 'react';

import logo from './img/full.png';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Recordings</h1>
          <script src="bundle.js"></script>
           <link rel="shortcut icon" type="image/x-icon" href={logo} />
    
    <title>OSLCArcadia</title>

        </header>
        <div className="bg-gray">
        <Container>
        <Row>

        <Col sm={{size:10, offset:1}} className="card-container">
          <Card  onClick={this.tHoliday}>
            <CardBody>
              <CardTitle>Holiday Recordings</CardTitle>
              <CardSubtitle>Christmas and the New Year</CardSubtitle>
              <CardImg width="50%" src={holiday} alt="Card image cap" />
            
              <CardText></CardText>


            <Collapse isOpen={this.state.holidays}>
          
              <h3>Christmas Eve</h3>
                      
              <p className="small-font">Service:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171224_service.mp3" type="audio/mpeg"/>
              </audio>

              <p className="small-font">Sermon:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171224_sermon.mp3" type="audio/mpeg"/>
              </audio>
              <br/><br/>


              <h3>New Year's Eve</h3>
            
              <p className="small-font">Service:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171231_service.mp3" type="audio/mpeg"/>
              </audio>

              <p className="small-font">Sermon:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171231_sermon.mp3" type="audio/mpeg"/>
              </audio>
              <br/><br/>
             
            </Collapse>

            <Collapse isOpen={!this.state.holidays}>
              <CardText>click to view series</CardText>
            </Collapse>

            </CardBody>
          </Card>
          </Col>

          <Col sm={{size:10, offset:1}}  className="card-container">
          <Card onClick={this.tAdvent}>
            <CardBody>
              <CardTitle>Advent-URE</CardTitle>
              <CardSubtitle>Three Part Series on Advent</CardSubtitle>
              <CardImg width="50%" src={adventure} alt="Card image cap" />
            
              <CardText>Pastor Demel speaks on three aspects of Advent: Understand, Return, and Enjoy.</CardText>
             
            <Collapse isOpen={this.state.advent}>
          
              <h3>Part 1: Understanding</h3>
                      
              <p className="small-font">Service:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171203_service.mp3" type="audio/mpeg"/>
              </audio>

              <p className="small-font">Sermon:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171203_sermon.mp3" type="audio/mpeg"/>
              </audio>
              <br/><br/>
              <h3>Part 2: Return</h3>
            
              <p className="small-font">Service:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171210_service.mp3" type="audio/mpeg"/>
              </audio>

              <p className="small-font">Sermon:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171210_sermon.mp3" type="audio/mpeg"/>
              </audio>
              <br/><br/>
              <h3>Part 3: Enjoy</h3>
            
              <p className="small-font">Service:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171217_service.mp3" type="audio/mpeg"/>
              </audio>

              <p className="small-font">Sermon:</p>
              <audio controls preload="none" className="audio">
                <source src="https://oslcarcadia.com/sermons/20171217_sermon.mp3" type="audio/mpeg"/>
              </audio>

            </Collapse>
            <Collapse isOpen={!this.state.advent}>
              <CardText>click to view series</CardText>
            </Collapse>
            

            </CardBody>
          </Card>
        </Col>

        </Row>
        </Container>
        </div>
      </div>
    );
  }
}
