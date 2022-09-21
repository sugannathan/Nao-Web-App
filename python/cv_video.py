from flask import Flask, render_template, Response
import cv2
import naoqi
from naoqi import ALProxy
import numpy as np
from numpy import array
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)





def gen_frames():  # generate frame by frame from camera

    robotIP = '10.7.4.106'
    PORT = 9559
  # use 0 for web camera
#  for cctv camera use rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_stream=0.sdp' instead of camera
# for local webcam use cv2.VideoCapture(0)
    nameID = "photo_subscribe"
    videoDevice = ALProxy("ALVideoDevice",robotIP, PORT)
    k4VGA=3
    kRGBColorSpace=11
    captureDevice = videoDevice.subscribeCamera(nameID, 0,k4VGA, kRGBColorSpace, 20)
    while True:
        # Capture frame-by-frame

        result = videoDevice.getImageRemote(captureDevice);
        width=result[0]
        height=result[1]
        ima_data=result[6]
        frame=Image.frombytes('RGB',(width,height),ima_data)
        im_file = BytesIO()
        frame.save(im_file, format="JPEG")
        img2 = np.array(frame)
        cv2.imshow('graycsale image',img2)
        ret, buffer = cv2.imencode('.jpg', img2)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
    videoDevice.unsubscribe(captureDevice)


@app.route('/video_feed', methods=['GET'])
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/', methods=['GET'])
def index():
    """Video streaming home page."""
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000,debug=True)
