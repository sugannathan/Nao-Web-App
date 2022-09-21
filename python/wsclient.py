import websocket
import naoqi
from naoqi import ALProxy
import vision_definitions as vd

from numpy import array
from PIL import Image
import base64
from io import BytesIO


robotIP = '10.7.4.109'
PORT = 9559

try:
    import thread
except ImportError:
    import _thread as thread
import time

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):

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
        videoDevice.unsubscribe(captureDevice)
        for i in range(3):
            time.sleep(1)
            ws.send(im_b64 % i)
        time.sleep(1)
        ws.close()
        print("thread terminating...")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocket()
    ws.connect("ws://echo.websocket.org",
    http_proxy_host="127.0.0.1", http_proxy_port="8888",
    proxy_type="http", http_proxy_auth=("username", "password123"))

    ws.on_open = on_open
    ws.run_forever()
