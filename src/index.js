import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState, useEffect } from 'react';
import logo from "./launcher-icon.png";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Joystick } from 'react-joystick-component';


import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import axios from 'axios';

var actionType;
var textAreaString;
var imgData;
const animationList1 = ['a', 'b', 'c'];
const animationList2 = ['a', 'b', 'c'];
const sayList = ['say','hier, bitte',
'guten Tag',
'vielen Dank',
'auf Wiedersehen',
'ja',
'nein',
'weiß nicht',
//'Hallo Armin, trinken wir einen Sekt': saytext,
'Laschet Text',
'Laschet Text Edith'];
const savedList = ['saved'];
 
function sendPostureReqToFlask(actionParam) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Posture',action: actionParam }
  };

  //   const [currentTime, setCurrentTime] = useState(0);
  // const [accessToken, setAccessToken] = useState(null);
  const clicked = 'clicked';
  // const [postId, setPostId] = useState(null);

  var myParams = {
  data: requestOptions
  }

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/posture', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())
   console.log(response.access_token)
  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}


function sendVolumeReqToFlask(volumeValue)
{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Volume',volume: volumeValue}
  };

 

  var myParams = {
  data: requestOptions
  }

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/volume', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())
   console.log(response.access_token)
  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}

function sendSpeakReqToFlask(textString)
{

  console.log("The text string is",textString)
  
    

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Nao Speech',speechText: textString}
  };

  console.log("The text string is",textString)

  var myParams = {
  data: requestOptions
  }

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/text', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())
   console.log(response.access_token)
  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}

function sendVideoReqToFlask(vidCmdVal,vidFlag)
{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Video',video_command: vidCmdVal,vFlag: vidFlag}
  };

 

  var myParams = {
  data: requestOptions
  }
  console.log('video');
  console.log(requestOptions);
  

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/video', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())
   imgData=response.data.image;
   console.log(imgData)

   console.log(imgData)
   var imgSrc="data:image/jpeg;base64," +imgData;
   const Example = ({ imgData }) => <img  class= "snapShot"   src={imgSrc} />

  ReactDOM.render(<Example data={imgData} />, document.getElementById('display_img'))

  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}

function sendBehavReqToFlask(behavrVal)
{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Behavior',behavior_command: behavrVal}
  };

 

  var myParams = {
  data: requestOptions
  }
  console.log('behav');
  console.log(requestOptions);
  

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/behavior', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}

function sendHandMovReqToFlask(moveVal,handVal)
{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Hand Movement',handMoveCmd: moveVal, handDirCmd: handVal}
  };

 

  var myParams = {
  data: requestOptions
  }
  console.log('behav');
  console.log(requestOptions);
  

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/handMov', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}

function sendAwarenessReqToFlask()
{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'React Hooks POST Request for Basic Awareness'}
  };

 

  var myParams = {
  data: requestOptions
  }
  console.log('awareness');
  console.log(requestOptions);
  

  if (requestOptions != "") {
    axios.post('http://127.0.0.1:5000/awareness', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
  //  console.log(response.json())  
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
} else {
    alert("The search query cannot be empty")
}

}



function standUp() {
  actionType="stand up"
  sendPostureReqToFlask(actionType);

}
function sitDown() {
   actionType="sit down"
   sendPostureReqToFlask(actionType);
}

function wakeUp() {
  actionType="wake up"
  sendPostureReqToFlask(actionType);
  console.log("hello")

}
function rest() {
   actionType="rest"
   sendPostureReqToFlask(actionType);
}

function runBehavior() {
  actionType="stand up"
  sendPostureReqToFlask(actionType);

}
function volumeChange(volumeRange) {
   actionType="volume"
   sendPostureReqToFlask(actionType);
}

function standZero() {
  actionType="stand zero"
  sendPostureReqToFlask(actionType);

}
function standInit() {
   actionType="stand init"
   sendPostureReqToFlask(actionType);
}

function crouch() {
  actionType="crouch"
  sendPostureReqToFlask(actionType);

}
function sitRelax() {
   actionType="sit relax"
   sendPostureReqToFlask(actionType);
}


function onTextAreaChange(event)
{
  textAreaString=event.target.value;
  console.log("The text in the text area is",textAreaString)
}

function onSayTextBox() {
  console.log("The say button is clicked now")
  
}
function onGrasp() {
sendBehavReqToFlask("grasp-95a9fd/behavior_1")
}

function onReach() {
  sendBehavReqToFlask("reach_for_glass-d9ad8a/behavior_1")
  }
  

function onFoldHand() {
  sendBehavReqToFlask("fold_hand-545fe1/behavior_1")
  }
  
function onOfferGlasNSay() {
    sendBehavReqToFlask("offerglassandsay-88fb47/behavior_1")
}
    
function onSayAgain() {
      sendBehavReqToFlask("reach_for_glass-d9ad8a/behavior_1")
}
function onOpen() {
        sendBehavReqToFlask("openhand-c7c6bf/behavior_1")
}
function onThankYou() {
          sendBehavReqToFlask("reach_for_glass-d9ad8a/behavior_1")
}
function onResetUpperBody() {
            sendBehavReqToFlask("resetupperbody-917d13/behavior_1")
}
function  onPickupBall()
{
  sendBehavReqToFlask("pickballordice-1c2fa4/behavior_1")
}

function  onLetGoBall()
{
  sendBehavReqToFlask("dropball-b1a045/behavior_1")
}

function  onBucketRight()
{
  sendBehavReqToFlask("bucketright-3c5b7c/behavior_1")
}
function  onLetItGoBR()
{
  sendBehavReqToFlask("dropbucketright-c5152d/behavior_1")
}
function  onBucketLeft()
{
  sendBehavReqToFlask("bucketleft-8078dd/behavior_1")
}
function  onLetItGoBL()
{
  sendBehavReqToFlask("dropbucketleft-4a5fa5/behavior_1")
}
function  onGiveHand()
{
  sendBehavReqToFlask("givehand-a9eaf6/behavior_1")
}
function  onShakeHand()
{
  sendBehavReqToFlask("shakehand-319473/behavior_1")
}




function sayTextBox() {
  console.log("hello there")
  sendSpeakReqToFlask(textAreaString)
  savedList.push(textAreaString)
  console.log("the updated string id",savedList)

}

function takeSnapShot()
{
  // var i=5;
  // while (i>0)
  // {
    sendVideoReqToFlask("take_photo","false");
  //   i=i-1;
  // }
 


}

function startStream()
{
  // if(toggleFlag=="true")
  // {
  //   sendVideoReqToFlask("start_stream","start");
  //   toggleFlag=="false";
  // }
  // else if(toggleFlag=="false")
  // {

  //   sendVideoReqToFlask("start_stream","stop");
  //   toggleFlag=="false";
  // }
  console.log("start stream");
  sendVideoReqToFlask("start_stream","start");

  
}



class Vstream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      iSrc: [],
      Example:[]
    };
    this.ws = new WebSocket("ws://127.0.0.1:8888/");
  }

  render() {
    this.ws.onopen = () => {
      console.log('Opened Connection!')
    };

    this.ws.onmessage = (event) => {
      this.setState({ currentData: JSON.parse(event.data) });
    };
    console.log(this.state.currentData)

    this.ws.onclose = () => {
      console.log('Closed Connection!')
    };

    var imgData=this.state.currentData['image_data'];
    var imgSrc="data:image/jpeg;base64," +imgData;
    const Example = ({ imgData }) => <img  class= "snapShot"   src={imgSrc} />
 
   
  

    
    console.log(this.state.currentData);
    return (
      <div className="stream">
       <Example data={imgData} />
      </div>
    );
  }
}

export default App;


class Rect extends React.Component {
  constructor() {
    super();
    this.state = {rect: {x: 5, y: 2}};
  }


  startDrag(event, draggedElem) {
    event.preventDefault();
    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(this.svg.getScreenCTM().inverse());
    this.setState({dragOffset: {
      x: point.x - this.state.rect.x,
      y: point.y - this.state.rect.y
    }});
    
    const mousemove = (event) => {
      event.preventDefault();
      point.x = event.clientX;
      point.y = event.clientY;
      let cursor = point.matrixTransform(this.svg.getScreenCTM().inverse());
      this.setState({rect: {
        x: cursor.x - this.state.dragOffset.x,
        y: cursor.y - this.state.dragOffset.y
      }});
    };
    
    const mouseup = (event) => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
    
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  }
  
  render() {
    return (
      <rect  className="rotation_button" width="10" height="10" x={this.state.rect.x}
          y={this.state.rect.y}   ref={(e) => this.svgRectElem = e} onMouseDown={(e) => this.startDrag(e, this.svgRectElem) } style={{
           
            left: '25%', top: '20%'
         }}/>
    );
  }
  
  
}


class Cjoystick extends React.Component {
  constructor() {
    super();
    this.state = {rect: {x: 5, y: 2}};
  }


  render() {
    return (
      <rect  className="rotation_button" width="10" height="10" x={this.state.rect.x}
          y={this.state.rect.y}   ref={(e) => this.svgRectElem = e} onMouseDown={(e) => this.startDrag(e, this.svgRectElem) } style={{
           
            left: '25%', top: '20%'
         }}/>
    );
  }
  
  
}

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textareaValue: ''
    }
   // this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }


  
  render() {
    return (
      <textarea id="w3review" name="w3review" rows="10" cols="110" onChange={(event) => onTextAreaChange(event)} ></textarea>
      );
  }
  
  
}



class RotationJoystick extends React.Component {


  constructor(props) {
    super(props);
    this.state = {rect: {x: -10, y: -120}};
    
   

    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }


  
  handleMove(event) {

}

handleStop(event) {

}

  render() {
   


    return (
     
        // <Joystick  size={200} baseColor="gray" stickColor="black"  onChange={this.mJoystickChangeHandler}></Joystick>

        
      <div>
      <svg id="joysticksvg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-122 -122 244 244" style={{
         fill: '#EEEEEE',
          stroke: '#BBBBBB',
          'stroke-width': '2',
          'touch-action': 'none',left: '25%', top: '20%'
      }}>
      <path className="rotation_pad" 
      d="M 0,-120.58398 C -66.470979,-120.58398 -120.58398,-66.470979 -120.58398,0 a 10.584391,10.584391 0 1 0 21.167964,0 C -99.416013,-55.031664 -55.031664,-99.416017 0,-99.416016 55.031664,-99.416014 99.416016,-55.031664 99.416016,0 A 10.584391,10.584391 0 1 0 120.58398,0 C 120.58398,-66.470979 66.470979,-120.58398 0,-120.58398 Z" />
      <Rect/>
      </svg>
      <MovementJoystick/>
      </div>
    );
  }
}
  
var xVelRatio = 0;
var yVelRatio = 0;
var StopFlag = 0;



class DropDown extends React.Component {
  constructor() {
    super();
    this.state = {rect: {x: 5, y: 2}};
  }


  
  
  render() {
    return (
      <select id = "dropdown" onChange={this.dropdownRender}>
                  {savedList.map(item => (<option value={item}>{item}</option>))}
                 
                  </select>
    );
  }
  
  
}


class MovementJoystick extends React.Component {


  constructor(props) {
    super(props);
    this.state = {value: ''};
    
   

    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.selector = React.createRef();
  }

  // componentDidMount = () => {
  //   const rect = this.selector.current.getBoundingClientRect();
  //   console.log("boundingbox",rect);
  // };
  


  handleMove(event) {
    console.log("handle move");
    console.log("x is =");
    console.log(event.x);
    console.log("y is =");
    console.log(event.y);
    console.log("direction is =");
    console.log(event.direction);

    var xCoord,yCoord,naoDirection;
    xCoord=event.x;
    yCoord=event.y;
    naoDirection=event.direction;
    this.setState({value: naoDirection});
    console.log("xCoord is =",xCoord)
    console.log("yCoord is =",yCoord)

   
    if(naoDirection=="FORWARD")
    {
      yVelRatio = 1+(( yCoord - (100)) / (400  ));
      xVelRatio = 0;
    }
    else if(naoDirection=="BACKWARD")
    {
      yVelRatio = (( yCoord - (100)) / (400 ));
      xVelRatio = 0;
    }
    else if(naoDirection=="LEFT")
    {
      xVelRatio = 1-(( xCoord - (-100)) / (400 ) );
      yVelRatio = 0;
    }
    else if(naoDirection=="RIGHT")
    {
      xVelRatio = -( xCoord - (-100)) / (400 );
      yVelRatio = 0;
    }

  
    var rVelRatio = Math.hypot(xVelRatio, yVelRatio);
    console.log("xo is =",xVelRatio)
    console.log("yo is =",yVelRatio)
    console.log("ro is =",rVelRatio)


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
      body: { title: 'Request with details for robot to move',xpos: xVelRatio,ypos: yVelRatio,rpos:rVelRatio,dir: naoDirection}
    };
    var myParams = {
    data: requestOptions
    }

    if (requestOptions != "" && StopFlag==0)  
    {
      axios.post('http://127.0.0.1:5000/nav', myParams)
          .then(function(response){
              console.log(response);
     //Perform action based on response
     alert(response.json())
     
      })
      .catch(function(error){
          console.log(error);
     //Perform action based on error
      });
  } else 
  {
      alert("The search query cannot be empty")
  }




}

handleStop(event) {
  console.log("handle stop");
  console.log("x is =");
  console.log(event.x);
  console.log("y is =");
  console.log(event.y);

  xVelRatio = 0;
  yVelRatio = 0;
  StopFlag=0;


  var movement="stop;"
  const requestOptions = 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
    body: { title: 'Request with details for robot to move',action:movement}
  };
  var myParams = 
  {
  data: requestOptions
  }

  if (requestOptions != "") 
  {
    axios.post('http://127.0.0.1:5000/stop', myParams)
        .then(function(response){
            console.log(response);
   //Perform action based on response
   alert(response.json())
   
    })
    .catch(function(error){
        console.log(error);
   //Perform action based on error
    });
  } 
else 
{
    alert("The search query cannot be empty")
}

}


  render() {
   


    return (
     
        // <Joystick  size={200} baseColor="gray" stickColor="black"  onChange={this.mJoystickChangeHandler}></Joystick>

        
        <div style={{
          position: 'absolute', left: '25%', top: '40%',
          transform: 'translate(-50%, -50%)'
      }}>
        <Joystick 
             
             size={400} 
             baseColor="#EEEEEE" 
             stickColor="#BBBBBB" 
             move={this.handleMove} 
             stop={this.handleStop}>
             </Joystick>
             <input type="text" value={this.state.value}  />
        </div>
    );
  }
}
  
    
class WebApp extends React.Component {



  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.dropdownRender = this.dropdownRender.bind(this);

    
    this.textArea= " ";

    
  }   
  onSay(event) {

    
    sendSpeakReqToFlask(event.target.value);
  }

  dropdownRender()
  {
    this.setState({ value: "Hi there!" });
    this.forceUpdate();
  }
  

  
  render() {
    return(
      <div className="App">
      <div className="leftPane">
      
      <div className="joyStick"   >
      <RotationJoystick/>
        </div>
        
       


      
      </div>

      <div className="rightPane" >
        <Tabs>
          <TabList >
            <Tab>Setup</Tab>
            <Tab>Glass</Tab>
            <Tab>Pick</Tab>
            <Tab>Walter</Tab>
            <Tab>GMF</Tab>
            <Tab>Head</Tab>
            <Tab>Animation</Tab>
            <Tab>Say</Tab>
            <Tab>Video</Tab>
          </TabList>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Setup">
                <Tab onMouseDown={wakeUp} >Wakeup</Tab>
                <Tab onMouseDown={standUp} >Stand Up</Tab>
                <Tab onMouseDown={standZero} >Stand Zero   </Tab>
                <Tab onMouseDown={standInit} >Stand Init</Tab>
                <Tab onMouseDown={rest} >Rest</Tab>
                <Tab onMouseDown={sitDown}>Sit Down</Tab>
                <Tab onMouseDown={crouch}>Crouch</Tab>
                <Tab onMouseDown={sitRelax}>Sit Relax</Tab>
                <Tab onMouseDown={runBehavior}>Run Behavior</Tab>
                <Tab  >Volume <> <input type="range" min={0}  max={100} step={1}  onChange={event => {sendVolumeReqToFlask(event.target.valueAsNumber) }} />  </> </Tab>
                
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Glass">
                <Tab  onMouseDown={onReach}>Reach</Tab>
                <Tab  onMouseDown={onGrasp}>Grasp</Tab>
                <Tab  onMouseDown={onFoldHand} >Fold Hand</Tab>
                <Tab onMouseDown={onOfferGlasNSay}>Offer Glass And Say</Tab>
                <Tab onMouseDown={onSayAgain} >Say Again</Tab>
                <Tab onMouseDown={onOpen}>Open</Tab>
                <Tab onMouseDown={onThankYou}>Thank You</Tab>
                <Tab onMouseDown={onResetUpperBody}>Reset Upper Body</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Pick">
                <Tab  onMouseDown={onPickupBall} >Ball Or Dice</Tab>
                <Tab onMouseDown={onLetGoBall}>Let It Go (Ball/Dice)</Tab>
                <Tab onMouseDown={onBucketRight}>Bucket Right</Tab>
                <Tab  onMouseDown={onLetItGoBR} >Let It Go (BR)</Tab>
                <Tab  onMouseDown={onBucketLeft} >Bucket Left</Tab>
                <Tab  onMouseDown={onLetItGoBL} >Let It Go (BL)</Tab>
                <Tab  onMouseDown={onGiveHand}>Give Hand</Tab>
                <Tab onMouseDown={onShakeHand} >Shake Hand</Tab>
                <Tab onMouseDown={onResetUpperBody} >Reset Upper Body</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>l
            <Tabs>
              <TabList className="verticalTabs" id="Walter">
                <Tab  onMouseDown={onPickupBall} >Ball Or Dice</Tab>
                <Tab onMouseDown={onLetGoBall} >Let It Go (Ball/Dice)</Tab>
                <Tab onMouseDown={sendSpeakReqToFlask("Hello")}>Say Hello</Tab>
                <Tab  onMouseDown={onGiveHand} >Give Hand</Tab>
                <Tab onMouseDown={onShakeHand} >Shake Hand</Tab>
                <Tab onMouseDown={onResetUpperBody} >Reset Upper Body</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="GMF">
                <Tab>Introduce</Tab>
                <Tab>Laschet</Tab>
                <Tab onMouseDown={sendSpeakReqToFlask("Hello")} >Say Hello</Tab>
                <Tab  onMouseDown={onGiveHand} >Give Hand</Tab>
                <Tab onMouseDown={onShakeHand} >Shake Hand</Tab>
                <Tab onMouseDown={onResetUpperBody} >Reset Upper Body</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Head">
                <Tab>Head</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Animation">
                <Tab onMouseDown={sendAwarenessReqToFlask} >Awareness</Tab>
                <Tab>List
                  <select id = "dropdown" >
                  {animationList1.map(item => (<option value={item}>{item}</option>))}
                 
                  </select>

                
                </Tab>

                <Tab>Random</Tab>
                <Tab>List 

                <select id = "dropdown">
                  {animationList2.map(item => (<option value={item}>{item}</option>))}
                 
                  </select>

                </Tab>
                <Tab>Animation Mode</Tab>
                <Tab  >Hand L <> <input type="range" min={0}  max={100} step={1}  onChange={event => {sendHandMovReqToFlask(event.target.valueAsNumber,"LHand") }} />  </> </Tab>
                <Tab  >Hand R  <> <input type="range" min={0}  max={100} step={1}  onChange={event => {sendHandMovReqToFlask(event.target.valueAsNumber ,"RHand") }} />  </> </Tab>

                
                <Tab>LEDs Off</Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Say">
                <Tab>

                <select id = "dropdown" 
                    onChange={this.onSay} >
                  {sayList.map(item => (<option value={item}>{item}</option>))}
                 
                  </select>
                </Tab>
                <Tab>
                <select id = "dropdown" onChange={this.dropdownRender}>
                  {savedList.map(item => (<option value={item}>{item}</option>))}
                 
                  </select>
                </Tab>
                <Tab> <TextEditor/> 
                </Tab>
                <Tab onMouseDown={sayTextBox}>Say Text in the Box Above</Tab>
                <Tab  >Volume <> <input type="range" min={0}  max={100} step={1}  onChange={event => {sendVolumeReqToFlask(event.target.valueAsNumber) }} />  </> </Tab>
              </TabList>
            </Tabs>
          </TabPanel>

          <TabPanel>
            <Tabs>
              <TabList className="verticalTabs" id="Say">
                <Tab onMouseDown={startStream}>Stream</Tab>
                <Tab >Save</Tab>
                <Tab onMouseDown={takeSnapShot}>Take Photo</Tab>
                <Tab >
                  <div id="display_img">
                  
                  </div>
                </Tab>
                <Tab >
                <iframe src="http://127.0.0.1:8000/" autoPlay="true" > </iframe>
                </Tab>
                <Tab >
                  <Vstream/>
                </Tab>
                
              </TabList>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
      <img
        src={logo}
        style={{ position: "absolute", bottom: 0, right: 0 }}
        alt="Humanoid Lab logo"
        className="App-logo"
      />
    </div>
    )
  }
}




ReactDOM.render(<WebApp  />, document.getElementById('root'));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
