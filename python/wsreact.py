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
# import cv2 as cv
import matplotlib.pyplot as plt
import asyncio
import random
import datetime
import websockets

robotIP = '10.7.4.109'
PORT = 9559
async def handler(websocket, path):
    while True:
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
            
        data = [
            { 
              "image_data": im_b64,
            },
            
        ]
        await websocket.send(json.dumps(data))
        await asyncio.sleep(1)

start_server = websockets.serve(handler, "127.0.0.1", 8888)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
