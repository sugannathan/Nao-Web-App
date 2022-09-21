import React, { useState, useEffect } from 'react';
import logo from "./launcher-icon.png";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Joystick } from 'react-joystick-component';

import JoyStick from "react-joystick";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import axios from 'axios';

var actionType;
const animationList1 = ['a', 'b', 'c'];
const animationList2 = ['a', 'b', 'c'];
const sayList = ['hier, bitte',
'guten Tag',
'vielen Dank',
'auf Wiedersehen',
'ja',
'nein',
'weiß nicht',
//'Hallo Armin, trinken wir einen Sekt': saytext,
'Laschet Text',
'Laschet Text Edith'];
const savedList = ['a', 'b', 'c'];





function App() {


  return (
//   const [currentTime, setCurrentTime] = useState(0);
//   const [accessToken, setAccessToken] = useState(null);
//   const clicked = 'clicked';
//   const [postId, setPostId] = useState(null);

  
//   let [Name, setname] = useState('');
  
  
//   function sliderHandleChange(event){
//     setname(event.target.value);
//     alert("hi")
//   }



//   useEffect(() => {
//     fetch('/time').then(res => res.json()).then(data => {
//       setCurrentTime(data.time);
//     });
//   }, []);

//   const user = {
//     "name": "sugan"
//   };

//   function sendPostureReqToFlask(actionParam) {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
//       body: { title: 'React Hooks POST Request Example',action: actionParam }
//     };
//     var myParams = {
//     data: requestOptions
//     }

//     if (requestOptions != "") {
//       axios.post('http://127.0.0.1:5000/posture', myParams)
//           .then(function(response){
//               console.log(response);
//      //Perform action based on response
//      alert(response.json())
//      setAccessToken(response.access_token)
//       })
//       .catch(function(error){
//           console.log(error);
//      //Perform action based on error
//       });
//   } else {
//       alert("The search query cannot be empty")
//   }

//   }


//   function standUp() {
//     actionType="stand up"
//     sendPostureReqToFlask(actionType);

//   }
//   function sitDown() {
//      actionType="sit down"
//      sendPostureReqToFlask(actionType);
//   }

//   function wakeUp() {
//     actionType="wake up"
//     sendPostureReqToFlask(actionType);

//   }
//   function rest() {
//      actionType="rest"
//      sendPostureReqToFlask(actionType);
//   }

//   function runBehavior() {
//     actionType="stand up"
//     sendPostureReqToFlask(actionType);

//   }
//   function volumeChange(volumeRange) {
//      actionType="volume"
//      sendPostureReqToFlask(actionType);
//   }

//   function standZero() {
//     actionType="stand zero"
//     sendPostureReqToFlask(actionType);

//   }
//   function standInit() {
//      actionType="stand init"
//      sendPostureReqToFlask(actionType);
//   }

//   function crouch() {
//     actionType="crouch"
//     sendPostureReqToFlask(actionType);

//   }
//   function sitRelax() {
//      actionType="sit relax"
//      sendPostureReqToFlask(actionType);
//   }





//   // axios.post('http://127.0.0.1:5000/api/query', { user })
//   //   .then(res => {
//   //     console.log(res);
//   //     console.log(res.data);
//   //   })



//     // useEffect(() => {
//     //   // POST request using axios inside useEffect React hook
//     //   const article = { title: 'React Hooks POST Request Example' };
//     //   axios.post('http://127.0.0.1:5000/api/query', article)
//     //       .then(response => console.log(response));

//   // empty dependency array means this effect will only run once (like componentDidMount in classes)
//   // }, []);


// //   const requestOptions = {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ title: 'React Hooks POST Request Example',action: 'clicked' })
// // };





// // const requestOptions = {
// //   method: 'POST',
// //   headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
// //   body: JSON.stringify({ title: 'React Hooks POST Request Example',action: 'clicked' })
// // };
// // var myParams = {
// // data: requestOptions
// // }




// //   useEffect(() => {
// //     // POST request using fetch inside useEffect React hook
// //     const requestOptions = {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5000' },
// //         body: JSON.stringify({ title: 'React Hooks POST Request Example',action: 'clicked' })
// //     };
// //     var myParams = {
// //       data: requestOptions
// //     }
// //     fetch('http://127.0.0.1:5000/login', myParams)
// //         .then(response => response.json())
// //         .then(data => setAccessToken(response.access_token));

// // // empty dependency array means this effect will only run once (like componentDidMount in classes)
// // }, []);




//   return (
//     <div className="App">
//       <div className="leftPane">
      
//       <div className="joyStick"   >
//         <Joystick  size={300} baseColor="gray" stickColor="black" ></Joystick>

//         </div>
//         <p>The current time is {currentTime}.</p>
//         <p>The access token is {accessToken}.</p>
//         <div className="card-body">
//                 Returned Id: {postId}
//             </div>


      
//       </div>

//       <div className="rightPane" >
//         <Tabs>
//           <TabList>
//             <Tab>Setup</Tab>
//             <Tab>Glass</Tab>
//             <Tab>Pick</Tab>
//             <Tab>Walter</Tab>
//             <Tab>GMF</Tab>
//             <Tab>Head</Tab>
//             <Tab>Animation</Tab>
//             <Tab>Say</Tab>
//             <Tab>Video</Tab>
//           </TabList>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Setup">
//                 <Tab onClick={wakeUp} >Wakeup</Tab>
//                 <Tab onClick={standUp} >Stand Up</Tab>
//                 <Tab onClick={standZero} >Stand Zero   </Tab>
//                 <Tab onClick={standInit} >Stand Init</Tab>
//                 <Tab onClick={rest} >Rest</Tab>
//                 <Tab onClick={sitDown}>Sit Down</Tab>
//                 <Tab onClick={crouch}>Crouch</Tab>
//                 <Tab onClick={sitRelax}>Sit Relax</Tab>
//                 <Tab onClick={runBehavior}>Run Behavior</Tab>
//                 <Tab onChange={sliderHandleChange} >Volume <> <Slider />  </> </Tab>
                
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Glass">
//                 <Tab>Reach</Tab>
//                 <Tab>Grasp</Tab>
//                 <Tab>Fold Hand</Tab>
//                 <Tab>Offer Glass And Say</Tab>
//                 <Tab>Say Again</Tab>
//                 <Tab>Open</Tab>
//                 <Tab>Thank You</Tab>
//                 <Tab>Reset Upper Body</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Pick">
//                 <Tab>Ball Or Dice</Tab>
//                 <Tab>Let It Go (Ball/Dice)</Tab>
//                 <Tab>Bucket Right</Tab>
//                 <Tab>Let It Go (BR)</Tab>
//                 <Tab>Bucket Left</Tab>
//                 <Tab>Let It Go (BL)</Tab>
//                 <Tab>Give Hand</Tab>
//                 <Tab>Shake Hand</Tab>
//                 <Tab>Reset Upper Body</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Walter">
//                 <Tab>Ball Or Dice</Tab>
//                 <Tab>Let It Go (Ball/Dice)</Tab>
//                 <Tab>Say Hello</Tab>
//                 <Tab>Give Hand</Tab>
//                 <Tab>Shake Hand</Tab>
//                 <Tab>Reset Upper Body</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="GMF">
//                 <Tab>Introduce</Tab>
//                 <Tab>Laschet</Tab>
//                 <Tab>Say Hello</Tab>
//                 <Tab>Give Hand</Tab>
//                 <Tab>Shake Hand</Tab>
//                 <Tab>Reset Upper Body</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Head">
//                 <Tab>Head</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Animation">
//                 <Tab>Awareness</Tab>
//                 <Tab>List
//                   <select id = "dropdown">
//                   {animationList1.map(item => (<option value={item}>{item}</option>))}
                 
//                   </select>

                
//                 </Tab>

//                 <Tab>Random</Tab>
//                 <Tab>List 

//                 <select id = "dropdown">
//                   {animationList2.map(item => (<option value={item}>{item}</option>))}
                 
//                   </select>

//                 </Tab>
//                 <Tab>Animation Mode</Tab>
//                 <Tab>Hand L <> <Slider />  </> </Tab>
//                 <Tab>Hand R <> <Slider />  </></Tab>
//                 <Tab>LEDs Off</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Say">
//                 <Tab>Say

//                 <select id = "dropdown">
//                   {sayList.map(item => (<option value={item}>{item}</option>))}
                 
//                   </select>
//                 </Tab>
//                 <Tab>Saved 
//                 <select id = "dropdown">
//                   {savedList.map(item => (<option value={item}>{item}</option>))}
                 
//                   </select>
//                 </Tab>
//                 <Tab>Text Box
//                 <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
//                 </Tab>
//                 <Tab>Say</Tab>
//                 <Tab>Volume <> <Slider />  </></Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>

//           <TabPanel>
//             <Tabs>
//               <TabList className="verticalTabs" id="Say">
//                 <Tab>Stream</Tab>
//                 <Tab>Save</Tab>
//                 <Tab>Take Photo</Tab>
//               </TabList>
//             </Tabs>
//           </TabPanel>
//         </Tabs>
//       </div>
//       <img
//         src={logo}
//         style={{ position: "absolute", bottom: 0, right: 0 }}
//         alt="Humanoid Lab logo"
//         className="App-logo"
//       />
//     </div>


<div className="App">
<h1>Hello World!</h1>
</div>

  );
}

export default App;
