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

import BlogCard from './BlogCard.js';


import series from './series.json';

///////imports\\\\\\\\\

// const appType = "music";//recordings
const appType = "sermon";//sermon

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
      refreshList: false,

      search: '',

      currentSelection: null,

      show: 3,

    };
   //  this.SortByDate = this.SortByDate.bind(this);
   // this.SortByDateString = this.SortByDateString.bind(this);
  }

  SortSeriesByDate = (a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  SortByDateString = (a, b) => {
        return b.date - a.date;
    }

  setSearch = (input) => {
    this.setState({search: input});
  }

  setSelection = (selection) => {
    this.setState({currentSelection: selection});
  }

  componentDidMount(){

    let apiUrl = 'https://hidden-brook-22839.herokuapp.com/series.json';
    if(appType == "music"){
      apiUrl = 'https://hidden-brook-22839.herokuapp.com/recordings.json';
    }
  
    fetch(
      apiUrl
      // 'https://blooming-shelf-43028.herokuapp.com/series.json'
      // 'https://hidden-brook-22839.herokuapp.com/series.json'
     // fetch('http://192.168.43.129:3001/series.json')
    ).then(response => response.json())
    .then(data => {

      if(appType == "sermon"){
        var seriesData = data.series;
        // var seriesData = series.series;
        seriesData.sort(this.SortSeriesByDate);
  
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
        this.setState({searchList: searchList});
        this.setState({seriesList: searchList});
            
      }
      if(appType == "music"){

        var blogData = data.recordings;
        blogData.sort(this.SortByDate);
        this.setState({series: blogData});

        // var searchList = [];
  
  
        // blogData.map((series, i) =>
        //     searchList.push(series)
        // );
  
        this.setState({searchList: blogData});
        this.setState({seriesList: blogData});
            
      }
    });
  }

  onSearchInput = (input) => {
    this.setState({searchList: input});
    this.setState({refreshList: true});
  }


  render() {

    let title = "Archive";

    let cards = <Col className="bg-proxy" xs="12">
          <img 
          src={require('./img/loading.png')} 
          className="loader" 
          alt="loading" />
          <div className="loader-text">Loading, Please wait</div>
          </Col>;
    
    if(appType == "sermon"){
        
        if(this.state.seriesList.length != this.state.searchList.length){
          // sermonCards =
          if( this.state.refreshList == true){
            this.setState({refreshList: false});
            cards = null;
          }else{
          cards =
          this.state.searchList.map((item, index) =>{
             let bulletin = //"http://docs.google.com/gview?url=
                "https://oslcarcadia.com/bulletins/" + item.date +".pdf";
            return <Col md={{size:8, offset:2}} xs={{size:10, offset:1}}>
                <ServiceInfo
                  appType={appType}
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
        }
    
        if(this.state.series != null && this.state.seriesList.length == this.state.searchList.length){
          cards = <div className="container">
           { this.state.series.map((series, i) =>{
                       if(i < this.state.show){
                         return <SermonCard
                          appType={appType}
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
      }

   if(appType == 'music'){

        if(this.state.seriesList.length != this.state.searchList.length){
          
          if( this.state.refreshList == true){
            this.setState({refreshList: false});
            cards = null;
          }else{

          cards =
          this.state.searchList.map((item, index) =>{
            return <Col md={{size:8, offset:2}} xs={{size:10, offset:1}} style={{paddingBottom: '5px'}}>
              <div className="recordingCard">
                <ServiceInfo
                  uri={item.title}
                  appType={appType}
                  isOpen={true}
                  title={item.content}
                  speaker={item.group}
                  date={item.date}
                  bulletin={null}
                  haveBulletin={false}
                  setSelection={this.setSelection}
                  />
                  </div>
              </Col>
          });
        }
        }
        if(this.state.series != null && this.state.seriesList.length == this.state.searchList.length){

        cards =
          this.state.series.map((item, index) =>{
            return <Col md={{size:8, offset:2}} xs={{size:10, offset:1}} style={{paddingBottom: '5px'}}>
            <div className="recordingCard">
                <ServiceInfo
                  uri={item.title}
                  appType={appType}
                  isOpen={true}
                  title={item.content}
                  speaker={item.group}
                  date={item.date}
                  bulletin={null}
                  haveBulletin={false}
                  />
                  </div>
              </Col>
          });
        }
  


  }
    

    let search = null;
    if(this.state.seriesList != null){
      search = <Search
                appType={appType}
                inputArray = {this.state.seriesList}
                onSearchInput={(input)=>{this.onSearchInput(input);}}/>;
    }
                
      // if(this.state.series != null &&
      //   this.state.searchList != null
      //   && appType == "music"){
      // cards=
      //   this.state.searchList.map((recording, i) => 
                
      //         <Col xs={{size:10, offset:1}} className="card-container">
               

      //           <ServiceInfo
      //             recording={recording}
      //             isOpen={true}
      //             title={recording.content}
      //             speaker={recording.group}
      //             date={recording.date}
      //             appType={appType}
      //             bulletin={null}
      //             haveBulletin={false}
      //             />
              

      //         </Col>
           
      //   );
      // }



    let display = cards;

    if(appType == "music"){
      title = "Recordings";
    }

    let recording  = this.state.currentSelection;



    return (
      <div className="App bg-gray">
        <header>

          <div className="App-header">

            <Row>
              <Col xs={{size:6, offset:3}} md={{size:4, offset: 4}} className="App-title">
              {title}
              </Col>
              
              <Col xs={{size:8, offset:2}} md={{size:3, offset:0}}>
              {search}
              </Col>
              <Col xs={{size:8, offset:2}} md={{size:3, offset:0}}>
              {recording}
              </Col>

            </Row>
              
              <div className="App-logo-container">
              <a href='https://oslcarcadia.com'>
                 <img className="App-logo"
                  src={require('./img/full.png')} 
                  
                  alt="logo" />
              </a>
              </div>

          </div>
        </header>
        <div className="bg-gray offset-top">

          <Container>
            <Row>
            
            {display}

            

            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
