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

import SermonCard from './SermonCard.js';

import BulletinReader from './BulletinReader.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      holidays: false,
      advent: false,
      //This stores the entire JSON file from server.
      series: null,
      show: 3,

    };
   //  this.SortByDate = this.SortByDate.bind(this);
   // this.SortByDateString = this.SortByDateString.bind(this);
  }

  SortByDate = (a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  SortByDateString = (a, b) => {
        return b.date - a.date;
    }

componentDidMount(){
  
  fetch(
    // 'https://blooming-shelf-43028.herokuapp.com/series.json'
    'https://hidden-brook-22839.herokuapp.com/series.json'
   // fetch('http://192.168.43.129:3001/series.json')
  ).then(response => response.json())
  .then(data => {
    var seriesData = data.series;
    seriesData.sort(this.SortByDate);

    seriesData.map((series, i) =>
      series.services.sort(this.SortByDateString)
    );

    this.setState({series: seriesData});
    
    });

  }

increaseShow = () => {
	this.setState({show: this.state.show +3});
}

toggleShowAll = () => {
	this.setState({showAll: !this.state.showAll});
}

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  onPageComplete = (page) => {
    this.setState({ page });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }



  render() {

let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }

    let sermonCards = <Col className="bg-proxy" xs="12">
      <img 
      src={require('./img/loading.png')} 
      className="loader" 
      alt="loading" />
      <div className="loader-text">Loading, Please wait</div>
      </Col>;

    if(this.state.series != null){
      sermonCards =
        this.state.series.map((series, i) =>{
        	if(i < this.state.show){
		        return <SermonCard
		         series={this.state.series}
		         title={this.state.series[i].title}
		         subtitle={this.state.series[i].subtitle}
		         text={this.state.series[i].text}
		         image={this.state.series[i].image}
		         services={this.state.series[i].services}
		         service_url={this.state.series[i].services[0].date}
		        />
	      	}
        }
      );
    }


    return (
      <div className="App bg-gray">
        <header>

          <div className="App-header">

               

            <h1 className="App-title">Sermon Recordings</h1>

            <title className="App-title">OSLCArcadia</title>
            
            <a href='https://oslcarcadia.com'>
              <div className="App-logo-container">
               <img className="App-logo"
                src={require('./img/full.png')} 
                
                alt="logo" />
              </div>
            </a>

          </div>
        </header>
        <div className="bg-gray offset-top">



          <Container>
            <Row>
            
            {sermonCards}

            <Button align="center" large color="success" onClick={this.increaseShow}>Show More</Button>

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
