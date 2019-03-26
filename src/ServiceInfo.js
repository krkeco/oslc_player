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

import {ReactReader} from 'react-reader';



export default class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bulletin_toggle: false,
      status: 'no status',
      items: [],
      isLoaded: false,
      bulletin: true,
      service: true,
      sermon: true,
      serviceSound: null,
      sermonSound: null,

      play: false,

      newProps: true,
    };

   // this.parseDate = this.parseDate.bind(this);
   this.UrlExists = this.UrlExists.bind(this);
  }

  bulletinToggle = () => {
    this.setState({
      bulletin_toggle: !this.state.bulletin_toggle
    });
  }

  componentDidMount(){
    // this.setState({date: this.props.services[0].date});
    // this.UrlExists("https://oslcarcadia.com/sermons/20180520_service.mp3");
  // if(this.verifyURL("https://oslcarcadia.com/bulletins/"+this.props.date +".pdf")){
  //   this.setState({bulletin: true});
  // }
  // let serviceUrl = "https://oslcarcadia.com/sermons/"+this.props.date+"_service.mp3";
  // if(this.verifyURL(serviceUrl)){
  //   this.setState({service: true});
  // }
  // if(this.verifyURL("https://oslcarcadia.com/sermons/"+this.props.date +"_sermon.mp3")){
  //   this.setState({sermon: true});
  // }
    this.loadAudio();
  }

  componentWillReceiveProps(){
    this.setState({newProps: true});
    this.loadAudio();
  }

  loadAudio = () => {
    if(this.refs.service != undefined){
        if(this.props.appType == 'sermon'){
        
          let serviceSound = new Audio(); 
          serviceSound.onerror = () => { this.setState({service: false});};
          //alert("error");}; 
          serviceSound.src = "https://oslcarcadia.com/sermons/"+this.props.date+"_service.mp3";
          serviceSound.preload = "metadata";
          this.setState({serviceSound: serviceSound.src}
          );    
          
          let sermonSound = new Audio(); 
          sermonSound.onerror = () => { this.setState({sermon: false});};
          //alert("error");}; 
          sermonSound.src = "https://oslcarcadia.com/sermons/"+this.props.date+"_sermon.mp3";
          sermonSound.preload = "metadata";
          this.setState({sermonSound: sermonSound.src}
          );
          
          // let bulletin = document.createElement('iframe');
          // bulletin.onerror = () => { this.setState({bulletin: false});};
          // //alert("error");}; 
          // bulletin.src = this.props.bulletin;
          // this.setState({bulletin: bulletin.src});
        
        }
    
        if(this.props.appType =='music'){
          let serviceSound = new Audio(); 
          serviceSound.onerror = () => { this.setState({service: false});};
          serviceSound.src = "http://music.oslcarcadia.com/recordings/"+this.props.date+"_"+this.props.uri +".mp3";
          serviceSound.preload = "metadata";
          this.setState({serviceSound: serviceSound.src},
            () => {this.refs.service.pause();
                    this.refs.service.load();
                    });
    
        
        }
    
    }

  }

  parseDate = (date) => {
  	return date.slice(4,6) + "/" + date.slice(6,8) + "/" + date.slice(0,4);
  }


  async UrlExists(url){
     fetch(url)
      .then(
        (result) => {
                    this.setState({
                      status: result.status+"is the result"
                    });
                    
                      this.setState({bulletin: true});

                      return true;
                            
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({bulletin: false});
          this.setState({
            status: 'error' +error,
          });

         
        }
      )
return false;
      
  }

  render() {


    let bulletinButton = null;
    if(this.props.date >= 20180520
      && this.props.haveBulletin){
      bulletinButton =  <a className="bulletin-text" href={this.props.bulletin}>Download Bulletin</a>;
    //<Button onClick={this.bulletinToggle}>Click to View Bulletin</Button>;
    }


    let service = null;
    let sermon = null;
  
    
    if(this.state.service){
      let serviceUrl = null;
      if(this.state.serviceSound != null){
        serviceUrl = this.state.serviceSound;
      }
      let serviceTitle = <br/>;
      if(this.props.appType == "sermon"){
        serviceTitle = <p className="small-font">Worship Service:</p>;
      }
      service = <div>
        {serviceTitle}
        <audio ref="service" controls preload="metadata" className="audio"
        onplay={() => {this.setState({play: true})}}>
          <source src={this.state.serviceSound} type="audio/mpeg"/>
        </audio>
      </div>;
    }
    
    if(this.state.sermon && this.props.appType == "sermon"){
      sermon = <div >
        <p className="small-font">Sermon only:</p>

        <audio ref="sermon" controls preload="metadata" className="audio">
          <source src={this.state.sermonSound} type="audio/mpeg"/>
        </audio>
      </div>;
    }


    if(this.state.newProps){
        this.setState({newProps: false});
        this.loadAudio();
    }

    if(this.state.play){
      this.setState({play: !this.state.play},
      this.props.setSelection(service));
    }

    return (

      <div >

        <br/>
        <br/>
        <div onClick={this.collapseToggle}>
          <Row>
            <Col xs="12">
              <h3>
                {this.props.title}
              </h3> 
            </Col>
          </Row>
          <Row >
            <Col xs="12" auto>
              <div className="service-info-subtitle">
                {this.props.speaker} -- {this.parseDate(this.props.date)}
              </div>
            </Col>
          </Row>

         {service}
         {sermon}
          <br/>
         {bulletinButton}
        </div>
      
        <br/>
        <br/>
      </div>

    );
  }
}
