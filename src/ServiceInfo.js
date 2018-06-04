import React, { Component, Linking } from 'react';

import logo from './img/full.svg';
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
    };

   this.parseDate = this.parseDate.bind(this);
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

  let serviceSound = new Audio(); 
  serviceSound.onerror = () => { this.setState({service: false});};
  //alert("error");}; 
  serviceSound.src = "https://oslcarcadia.com/sermons/"+this.props.date+"_service.mp3";
  this.setState({serviceSound: serviceSound.src});
  
  let sermonSound = new Audio(); 
  sermonSound.onerror = () => { this.setState({sermon: false});};
  //alert("error");}; 
  sermonSound.src = "https://oslcarcadia.com/sermons/"+this.props.date+"_sermon.mp3";
  this.setState({sermonSound: sermonSound.src});
  
  let bulletin = document.createElement('iframe');
  bulletin.onerror = () => { this.setState({bulletin: false});};
  //alert("error");}; 
  bulletin.src = this.props.bulletin;
  this.setState({bulletin: bulletin.src});
  
  }

  parseDate(date){
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
      bulletinButton =  <Button onClick={this.bulletinToggle}>Click to View Bulletin</Button>;
    }


    let service = null;
    let sermon = null;
  
    
    if(this.state.service){
      service = <div>
        <p className="small-font">Worship Service:</p>
        <audio controls preload="none" className="audio">
          <source src={this.state.serviceSound} type="audio/mpeg"/>
        </audio>
      </div>;
    }
    
    if(this.state.sermon){
      sermon = <div>
        <p className="small-font">Sermon only:</p>
        <audio controls preload="none" className="audio">
          <source src={this.state.sermonSound} type="audio/mpeg"/>
        </audio>
      </div>;
    }

    return (

      <div>
        <div onClick={this.collapseToggle}>
          <h3>{this.props.title} -- {this.parseDate(this.props.date)}</h3>
          <h4>{this.props.speaker}</h4>

         {service}
         {sermon}
          <br/>
        </div>
      
        <Collapse isOpen={!this.state.bulletin_toggle}>
         {bulletinButton}
        </Collapse>

        <Collapse isOpen={this.state.bulletin_toggle}>
          <Button onClick={this.bulletinToggle}>Click to Collapse</Button>
          <iframe src={this.props.bulletin} className="bulletin" frameborder="0"></iframe>
          <Button onClick={this.bulletinToggle}>Click to Collapse</Button>
        </Collapse>

        <br/>
        <br/>
        <br/>
        <br/>
      </div>

    );
  }
}
