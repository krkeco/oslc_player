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

import ServiceInfo from './ServiceInfo.js';

import BulletinReader from './BulletinReader.js';

import Search from './Search.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      holidays: false,
      advent: false,
      //This stores the entire JSON file from server.
      series: null,

      seriesList: [],
      searchList: [],

      search: '',

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

  setSearch = (input) => {
    this.setState({search: input});
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

      var searchList = [];

      seriesData.map((series, i) =>
        series.services.sort(this.SortByDateString)
      );

      seriesData.map((series, i) =>
        series.services.map((service,index)=>
          searchList.push(service)
          )
      );

      this.setState({series: seriesData});
      this.setState({seriesList: searchList});
      this.setState({searchList: searchList});
      
      });

  }

  // increaseShow = () => {
  // 	this.setState({show: this.state.show +3});
  // }

  // toggleShowAll = () => {
  // 	this.setState({showAll: !this.state.showAll});
  // }

  // onDocumentComplete = (pages) => {
  //   this.setState({ page: 1, pages });
  // }

  // onPageComplete = (page) => {
  //   this.setState({ page });
  // }

  // handlePrevious = () => {
  //   this.setState({ page: this.state.page - 1 });
  // }

  // handleNext = () => {
  //   this.setState({ page: this.state.page + 1 });
  // }

  // renderPagination = (page, pages) => {
  //   let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
  //   if (page === 1) {
  //     previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
  //   }
  //   let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
  //   if (page === pages) {
  //     nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
  //   }
  //   return (
  //     <nav>
  //       <ul className="pager">
  //         {previousButton}
  //         {nextButton}
  //       </ul>
  //     </nav>
  //     );
  // }
  onSearchInput = (input) => {
    this.setState({searchList: input});
  }


  render() {

    // let pagination = null;

    // if (this.state.pages) {
    //   pagination = this.renderPagination(this.state.page, this.state.pages);
    // }

    let sermonCards = <Col className="bg-proxy" xs="12">
      <img 
      src={require('./img/loading.png')} 
      className="loader" 
      alt="loading" />
      <div className="loader-text">Loading, Please wait</div>
      </Col>;

    
    if(this.state.seriesList.length != this.state.searchList.length){
      // sermonCards =
      sermonCards =
      this.state.searchList.map((item, index) =>{
         let bulletin = //"http://docs.google.com/gview?url=
            "https://oslcarcadia.com/bulletins/" + item.date +".pdf";
        return <Col md={{size:8, offset:2}} xs={{size:10, offset:1}}>
            <ServiceInfo
              isOpen={true}
              title={item.title}
              speaker={item.speaker}
              date={item.date}
              bulletin={bulletin}
              haveBulletin={true}
              />
          </Col>
      });
    }

    if(this.state.series != null && this.state.seriesList.length == this.state.searchList.length){
      sermonCards = <div className="container">
       { this.state.series.map((series, i) =>{
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
               )}
        <Button align="center" large color="success" onClick={this.increaseShow}>Show More</Button>
      </div>
    }
    let search = null;
    if(this.state.seriesList != null){
      search = <Search
                inputArray = {this.state.seriesList}
                onSearchInput={(input)=>{this.onSearchInput(input);}}/>;
    }


    return (
      <div className="App bg-gray">
        <header>

          <div className="App-header">

            {search}

            <h1 className="App-title">Archive</h1>

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

            

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
