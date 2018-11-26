import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { 
  Container, 
  Row, 
  Col,
} from 'reactstrap';

//This is the broadcast of the day component.
export default class BlogCard extends Component {
constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.isLoaded = this.isLoaded.bind(this);
  }

isLoaded(){
  this.setState({loaded: true});
}

  render(){
    let loader = 
      <div className="loader"/>;
    if(this.state.loaded){
      loader = null;
    }

    return (
            <Container className="bg-gray-card">
              <Row >
                <Col  xs="12" sm="12" md="12">
                    <strong>{this.props.recording.content}</strong>
                    <div>{this.props.recording.date} -- {this.props.recording.group}</div>
                    <br/>
                    <audio controls preload="metadata" className="audio-player">
                      <source src={"http://music.oslcarcadia.com/recordings/"+this.props.recording.date+"_"+this.props.recording.title +".mp3"} type="audio/mpeg"/>
                    </audio>
                </Col>
              </Row>
            </Container>
        
    );
  }
}