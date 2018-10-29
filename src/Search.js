import React, { Component, Linking } from 'react';

import './App.css';

import ServiceInfo from './ServiceInfo.js';


export default class Search extends Component {

  constructor(props) {
      super();
      this.state = {
        propped: false,
        
        outputArray: null,
    }
  }


  filter = () => {
    // var input, filter, ul, li, a, i;
    let input = document.getElementById("mySearch");
    let filter = input.value.toUpperCase();
    // ul = document.getElementById("myMenu");
    // li = ul.getElementsByTagName("div");

    let outputFilter = [];
    this.props.inputArray.map((item, index) => {
      
      let params = (item.title + " " + item.speaker + " " + item.date);
      
      if(this.props.appType == "music"){
        params = (item.content + " " + item.group + " " + item.date);
      }

      if(params.toUpperCase().indexOf(filter) > -1 ){
        outputFilter.push(item);
      }
    });
    this.setState({filterArray: outputFilter});
    this.props.onSearchInput(outputFilter);
    // for (i = 0; i < li.length; i++) {
    //     a = li[i].getElementsByTagName("a")[0];
    //     if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";


    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
    // this.props.onInput(input);
  }


  render(){
    if(this.props.inputArray !=null
      && this.props.inputArray.length > 1
      && !this.state.propped){
      let newArray = [];

      this.props.inputArray.map((item, index) => {
        newArray.push('hello'+index+1);
      });

      this.setState({filterArray: this.props.inputArray});
      this.setState({propped: true});
    }

    let propsList = null;
    let searchList = null;


    if(this.props.inputArray != null){
      propsList =
      this.props.inputArray.map((item, index) => {

        return <div><a href="#">
        props {item.title} {item.speaker} 
        </a>
        
        </div>

      });
    }   else{
      propsList = "tis null";
    } 

 if(this.state.filterArray != null){
      searchList =
      this.state.filterArray.map((item, index) => {

        return <div><a href="#">
        {item.title} {item.speaker} 
        </a>
        </div>

      });
    }    
    // if(document.getElementById("mySearch").value == ''){
    //   this.filter();
    // }

    // <div id="myMenu">
    //   <div>statelist</div>
    //   {searchList}
    //   <div>propslist</div>
    //   {propsList}
    // </div>  
      

    return (
    <div className="search-container">
          <input type="text" id="mySearch" style={{width: '100%'}} onKeyUp={() => {this.filter()}} placeholder="Search.." title="Type in a category"/>
    

    </div>
    );
  }
}