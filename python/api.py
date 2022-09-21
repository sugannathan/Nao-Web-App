#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import print_function
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_cors import cross_origin

import time
import sys
import math
import json

import naoqi
from naoqi import ALProxy
import vision_definitions as vd

from numpy import array
from PIL import Image
import base64
from io import BytesIO
import matplotlib.pyplot as plt
import cv2


# from cv2 import COLOR_RGB2BGRA

moveOrNot="walk"

robotIP = '10.7.4.106'
PORT = 9559
app = Flask(__name__)

access_token = 'a'
action = 'd'



@app.route('/posture', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoActionControl():
    req_data = request.data
    req_json = json.loads(req_data)

    # print(nao_json, file=sys.stderr)

    # print('THis is the req Data', req_data, file=sys.stderr)

    # nao_json= jsonify(nao_data);

    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)

    nao_data = req_json['data']
    data_body = nao_data['body']
    body_action = data_body['action']
    access_token = body_action + 's'

    # print('THis is the Nao Data ', nao_data, file=sys.stderr)
    # print('THis is the  Data body', data_body, file=sys.stderr)
    # print('THis is the body action', body_action, file=sys.stderr)
    # print('THis is the body action 1', file=sys.stderr)

    if body_action == 'stand up':


        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('Stand', 0.5)
        tts = ALProxy("ALTextToSpeech", robotIP, PORT)
        tts.say("hello")
    elif body_action == 'rest':

        motionProxy = ALProxy('ALMotion', robotIP, PORT)
        motionProxy.rest()
    elif body_action == 'sit down':

        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('Sit', 0.5)
    elif body_action == 'wake up':

        motionProxy = ALProxy('ALMotion', robotIP, PORT)
        motionProxy.wakeUp()

    elif body_action == 'stand zero':

        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('StandZero', 0.5)
    elif body_action == 'stand init':

        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('StandInit', 0.5)
    elif body_action == 'crouch':

        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('Crouch', 0.5)
    elif body_action == 'sit relax':

        postureProxy = ALProxy('ALRobotPosture', robotIP, PORT)
        postureProxy.goToPosture('SitRelax', 0.5)

    return (jsonify({'access_token': access_token}), 200)


@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/nav', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoWalkControl():
    req_data = request.data
    req_json = json.loads(req_data)

    # print(nao_json, file=sys.stderr)

    # print('THis is the req Data', req_data, file=sys.stderr)

    # nao_json= jsonify(nao_data);

    nao_data = req_json['data']
    data_body = nao_data['body']
    xCoord = data_body['xpos']
    yCoord = data_body['ypos']
    direction = data_body['dir']
    rCoord=data_body['rpos']

    # print('THis is the Nao Data ', nao_data, file=sys.stderr)
    # print('THis is the  Data body', data_body, file=sys.stderr)
    # print('THis is the x coordinate', xCoord, file=sys.stderr)
    # print('THis is the y coordinate', yCoord, file=sys.stderr)
    # print('THis is the r coordinate', rCoord, file=sys.stderr)
    print('THis is the direction', direction, file=sys.stderr)
    # angle = math.atan2(yCoord, xCoord)
    # xVel = math.cos(angle);
    # yVel = math.sin(angle);
    # print('THis is the angle', angle, file=sys.stderr)
    # print('THis is the xvel', xVel, file=sys.stderr)
    # print('THis is the yvel', yVel, file=sys.stderr)
    motionProxy  = ALProxy("ALMotion", robotIP, PORT)
    postureProxy = ALProxy("ALRobotPosture", robotIP, PORT)


    # Wake up robot
    motionProxy.wakeUp()

    # Send robot to Stand
    postureProxy.goToPosture("StandInit", 0.5)

    #####################
    ## Enable arms control by Motion algorithm
    #####################
    motionProxy.setMoveArmsEnabled(True, True)
    # motionProxy.setMoveArmsEnabled(False, False)

    #####################
    ## FOOT CONTACT PROTECTION
    #####################
    #motionProxy.setMotionConfig([["ENABLE_FOOT_CONTACT_PROTECTION", False]])
    motionProxy.setMotionConfig([["ENABLE_FOOT_CONTACT_PROTECTION", True]])


    Theta = 0.0
    Frequency =0.5# low speed
    if(moveOrNot!="stop"):
        print('THis is the x value', xCoord,"THis is the y value",yCoord, file=sys.stderr)
        motionProxy.moveToward(yCoord, xCoord, Theta, [["Frequency", Frequency]])


    # if(rCoord>1):
    #     angle = math.atan2(yCoord, xCoord)
    #     xVel = math.cos(angle);
    #     yVel = math.sin(angle);
    #
    #     print('THis is the angle', angle, file=sys.stderr)
    #     print('THis is the xvel', xVel, file=sys.stderr)
    #     print('THis is the yvel', yVel, file=sys.stderr)


    # if direction == 'FORWARD':
    #     motionProxy.moveToward(0.21, 0, Theta, [["Frequency", Frequency]])
    # elif direction == 'BACKWARD':
    #     motionProxy.moveToward(-0.21, 0, Theta, [["Frequency", Frequency]])
    # elif direction == 'LEFT':
    #     motionProxy.moveToward(0, 0.21, Theta, [["Frequency", Frequency]])
    # elif direction == 'RIGHT':
    #     motionProxy.moveToward(0, -0.21, Theta, [["Frequency", Frequency]])

    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return jsonify('works')


@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/stop', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoStop():
    req_data = request.data
    req_json = json.loads(req_data)

    # print(nao_json, file=sys.stderr)

    print('THis is the req Data', req_data, file=sys.stderr)

    # nao_json= jsonify(nao_data);

    nao_data = req_json['data']
    data_body = nao_data['body']
    movement = data_body['action']

    # print('THis is the Nao Data ', nao_data, file=sys.stderr)
    # print('THis is the  Data body', data_body, file=sys.stderr)
    print('THis is the movement', movement, file=sys.stderr)
    motionProxy = ALProxy('ALMotion', robotIP, PORT)
    postureProxy = ALProxy("ALRobotPosture", robotIP, PORT)
    motionProxy.move(0, 0, 0);
    postureProxy.goToPosture('Stand', 0.5)
    moveOrNot="stop"


    if movement == 'stop':
        print('THis is the stop case ', file=sys.stderr)
        motionProxy.move(0, 0, 0);
        postureProxy.goToPosture('Stand', 0.5)


    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return jsonify('works')


@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response



@app.route('/volume', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoVolumeControl():

    req_data = request.data
    req_json = json.loads(req_data)

    # print(nao_json, file=sys.stderr)

    # print('THis is the req Data', req_data, file=sys.stderr)

    # nao_json= jsonify(nao_data);


    nao_data = req_json['data']
    data_body = nao_data['body']
    nao_volume = data_body['volume']

    # audioDeviceProxy = ALProxy("ALAudioDevice", robotIP, PORT)
    # audioDeviceProxy.setOutpALProxy("ALAudioDevice")
    tts = ALProxy("ALAudioDevice", robotIP, PORT)
    tts.setOutputVolume(int(nao_volume))
    print("This is the volume ",nao_volume, file=sys.stderr)
    # tts.say(nao_volume)

    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return jsonify('works')


@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response

@app.route('/text', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoSpeechControl():

    req_data = request.data
    req_json = json.loads(req_data)
    nao_data = req_json['data']
    data_body = nao_data['body']
    # print("This is data body json ",data_body, file=sys.stderr)
    nao_speechText = data_body['speechText']
    speechText=nao_speechText

    tts = ALProxy("ALTextToSpeech", robotIP, PORT)
    tts.say(str(nao_speechText))
    #tts.say(nao_volume)

    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return jsonify('works')


@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/video', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoVideoControl():

    req_data = request.data
    req_json = json.loads(req_data)
    nao_data = req_json['data']
    data_body = nao_data['body']
    print("This is data body json ",data_body, file=sys.stderr)
    vidCmd = data_body['video_command']
    vidFlag=data_body['vFlag']

    # photoCaptureProxy = ALProxy("ALPhotoCapture", robotIP, PORT)
    # photoCaptureProxy.setResolution(2)
    # photoCaptureProxy.setPictureFormat("jpg")
    # photoCaptureProxy.takePictures(3, "/home/sugan", "image")
    if vidCmd=="start_stream":


            # nameID = "photo_subscribe"
            # videoDevice = ALProxy("ALVideoDevice",robotIP, PORT)
            # k4VGA=3
            # kRGBColorSpace=11
            # captureDevice = videoDevice.subscribeCamera(nameID, 0,k4VGA, kRGBColorSpace, 20)
            # result = videoDevice.getImageRemote(captureDevice);
            # width=result[0]
            # height=result[1]
            # ima_data=result[6]
            # Nao_ima=Image.frombytes('RGB',(width,height),ima_data)
            # im_file = BytesIO()
            # Nao_ima.save(im_file, format="JPEG")
            # Nao_ima.show()
            # im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
            # im_b64 = base64.b64encode(im_bytes)
            # # Nao_ima.show()
            # # print("This is the image ",Nao_ima, file=sys.stderr)
            # # print("This is the base64image ",im_b64, file=sys.stderr)
            # videoDevice.unsubscribe(captureDevice)
            nameID = "photo_subscribe"
            videoDevice = ALProxy("ALVideoDevice",robotIP, PORT)
            k4VGA=3
            kRGBColorSpace=11
            captureDevice = videoDevice.subscribeCamera(nameID, 0,k4VGA, kRGBColorSpace, 20)
            result = videoDevice.getImageLocal(captureDevice)
            print("This is the image ",result, file=sys.stderr)


    elif vidCmd== "take_photo":


            nameID = "photo_subscribe"
            videoDevice = ALProxy("ALVideoDevice",robotIP, PORT)
            k4VGA=3
            kRGBColorSpace=11
            captureDevice = videoDevice.subscribeCamera(nameID, 0,k4VGA, kRGBColorSpace, 20)
            result = videoDevice.getImageRemote(captureDevice);
            width=result[0]
            height=result[1]
            ima_data=result[6]
            Nao_ima=Image.frombytes('RGB',(width,height),ima_data)
            im_file = BytesIO()
            Nao_ima.save(im_file, format="JPEG")
            im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
            im_b64 = base64.b64encode(im_bytes)
            videoDevice.unsubscribe(captureDevice)
        # Nao_ima=cv.cvtColor(array(Nao_ima),COLOR_RGB2BGRA)
        # cv.imshow("Camera_OpenCV2", Nao_ima)


    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return (jsonify({'image' : im_b64}), 200)



@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/behavior', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoBehaviorControl():

    req_data = request.data
    req_json = json.loads(req_data)
    nao_data = req_json['data']
    data_body = nao_data['body']
    print("This is data body json ",data_body, file=sys.stderr)
    behaviorName = data_body['behavior_command']
    managerProxy = ALProxy("ALBehaviorManager", robotIP, PORT)
    #
    names = managerProxy.getInstalledBehaviors()
    print("Behaviors on the robot: ",names, file=sys.stderr)
    print("Behavior Name: ",behaviorName, file=sys.stderr)
    names1 = managerProxy.getLoadedBehaviors()
    # print("Running behaviors: ",names1, file=sys.stderr)


    if (managerProxy.isBehaviorInstalled(str(behaviorName))):
        # Check that it is not already running.
        if (not managerProxy.isBehaviorRunning(str(behaviorName))):
            # Launch behavior. This is a blocking call, use _async=True if you do not
            # want to wait for the behavior to finish.
            managerProxy.runBehavior(str(behaviorName))
            time.sleep(0.5)

        else:
            print("Running behaviors: ", file=sys.stderr)

    else:
        print("Behavior not found ", file=sys.stderr)

    if (managerProxy.isBehaviorRunning(str(behaviorName))):
        managerProxy.stopBehavior(str(behaviorName))
        time.sleep(1.0)

    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return (jsonify({'image' : 'hello'}), 200)





@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/handMov', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def naoHandControl():

    req_data = request.data
    req_json = json.loads(req_data)
    nao_data = req_json['data']
    data_body = nao_data['body']
    print("This is data body json ",data_body, file=sys.stderr)
    handMovVal = data_body['handMoveCmd']
    handDirVal = data_body['handDirCmd']
    motionProxy = ALProxy("ALMotion", robotIP, PORT)
    if handDirVal == "LHand" :

        motionProxy.setAngles("LHand", int(handMovVal) / 100., 0.2);

    elif handDirVal == "RHand" :

        motionProxy.setAngles("RHand", int(handMovVal) / 100., 0.2);


    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return (jsonify({'image' : 'hello'}), 200)





@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response


@app.route('/awareness', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def awarenessControl():

    req_data = request.data
    req_json = json.loads(req_data)
    nao_data = req_json['data']
    data_body = nao_data['body']
    print("This is data body json ",data_body, file=sys.stderr)

    baproxy = ALProxy("ALBasicAwareness", robotIP, PORT)
    motionProxy = ALProxy("ALMotion", robotIP, PORT)


    motionProxy.wakeUp()


    baproxy.setEnabled(True)
    motionProxy.setBreathEnabled("Body", bool("true"))


    time.sleep(30)


    baproxy.setEnabled(False)


    motionProxy.rest()


    if not req_json:
        return (jsonify({'msg': 'Missing JSON'}), 400)
    return (jsonify({'image' : 'hello'}), 200)





@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response
