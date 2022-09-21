from __future__ import print_function
from flask import Flask, jsonify, request
from flask_cors import CORS

import time
from flask import Flask
import sys
import cv2

#import naoqi
#from naoqi import ALProxy


robotIP="10.7.4.109"
PORT=9559
app = Flask(__name__)

access_token='a'
action="d"


@app.route('/time')
def get_current_time():
    
    return {'time': time.time()}
    

@app.route('/login', methods=['POST'])
def nao():
    nao_json = request.get_json()
    #tts = ALProxy("ALTextToSpeech", robotIP, PORT)
    #tts.say(request.method)
    print('This is error output', file=sys.stderr)

    if not nao_json:
        return jsonify({'msg': 'Missing JSON'}), 400

    action = nao_json.get('action')
    access_token= action+'s'

    print(access_token, file=sys.stderr)
    #if(action == "clicked"):
	#tts = ALProxy("ALTextToSpeech", robotIP, PORT)
	#postureProxy = ALProxy("ALRobotPosture", robotIP, PORT)
	#motionProxy  = ALProxy("ALMotion", robotIP, PORT)

	#postureProxy.goToPosture("StandInit", 0.5)
	#tts.say("Hello, world!")
	#motionProxy.rest()
    #elif (action == "d"):
	#tts = ALProxy("ALTextToSpeech", robotIP, PORT)
	#tts.say("Hello, my ip is!")
    #else:
    	#tts = ALProxy("ALTextToSpeech", robotIP, PORT)
	#tts.say("Hello hi")
   

    return jsonify({'access_token': access_token}), 200

@app.route('/api/query', methods = ['POST'])
def get_query_from_react():
    if not request.json:
    	print(request.json, file=sys.stderr)
        return "not a json post"
    nao_json = request.get_json()
    #tts = ALProxy("ALTextToSpeech", robotIP, PORT)
    #tts.say(request.method)
    #tts.say("hello jk")	
    #data = request.get_json()
    #action = data.get('action')
    #access_token= action+'s'
    print('This is error output', file=sys.stderr)
    print(nao_json)
    return nao_json, 200

@app.route('/api/v1', methods=['POST','GET'])
def postTest():
    if not request.json:
        data = request.stream.read()
    	print(request.json, file=sys.stderr)
        return data
    return "json post succeeded"

