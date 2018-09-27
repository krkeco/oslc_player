import React, { Component} from 'react'
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

import { ReactReader } from 'react-reader';

// import {ePub} from 'epubjs/dist/epub.min.js';

const storage = global.localStorage || null

export default class BulletinReader extends Component {
  constructor(props) {
    super(props)
    this.state = {
    //   fullscreen: process.env.NODE_ENV !== 'production',
    //   location:
    //     storage && storage.getItem('epub-location')
    //       ? storage.getItem('epub-location')
    //       : 2,
    }
    // this.rendition = null
  }

  // toggleFullscreen = () => {
  //   this.setState(
  //     {
  //       fullscreen: !this.state.fullscreen
  //     },
  //     () => {
  //       setTimeout(() => {
  //         const evt = document.createEvent('UIEvents')
  //         evt.initUIEvent('resize', true, false, global, 0)
  //       }, 1000)
  //     }
  //   )
  // }

  // onLocationChanged = location => {
  //   this.setState(
  //     {
  //       location
  //     },
  //     () => {
  //       storage && storage.setItem('epub-location', location)
  //     }
  //   )
  // }

  // onToggleFontSize = () => {
  //   const nextState = !this.state.largeText
  //   this.setState(
  //     {
  //       largeText: nextState
  //     },
  //     () => {
  //       this.rendition.themes.fontSize(nextState ? '140%' : '100%')
  //     }
  //   )
  // }
  // fontSmall = () => {
  //      this.rendition.themes.fontSize('100%')
  // }
  // fontMedium = () => {
  //       this.rendition.themes.fontSize('125%')      
  // }
  // fontLarge = () => {
  //       this.rendition.themes.fontSize('150%')
  // }

  // getRendition = rendition => {
  //   // Set inital font-size, and add a pointer to rendition for later updates

  //   //url={'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'}
  //           // url={'http://www.oslcarcadia.com/bulletins/061018.epub'}
  //   const { largeText } = this.state
  //   this.rendition = rendition
  //   rendition.themes.fontSize(largeText ? '140%' : '100%')
  // }


componentDidMount(){
  
  // let book = ePub({'https://s3-eu-west-1.amazonaws.com/react-reader/alice.epub'});
  
  // let rendition = book.renderTo("area", {width: 600, height: 400});
  
  // let displayed = rendition.display();


}

  render() {
    // const { fullscreen, location } = this.state
        // <div style={{position: 'relative',  width: '92vw', height:'80vh'}} >
        //   <ReactReader
        //     locationChanged={this.onLocationChanged}
        //     url={require('./sample.epub')}
        //     title={'Alice in wonderland'}
        //     getRendition={this.getRendition}
        //   />
       
          // <Button onClick={this.fontSmall}>
          //   Normal Font
          // </Button>
          // <Button onClick={this.fontMedium}>
          //   Large
          // </Button>
          // <Button onClick={this.fontLarge}>
          //   Extra Large
          // </Button>
        //   </div>
       

    return (
      <div>
      

      </div>
    )
  }
}
