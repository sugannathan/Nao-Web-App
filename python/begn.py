import naoqi
from naoqi import ALProxy

from PIL import Image
import base64
from io import BytesIO
# import cv2 as cv
import matplotlib.pyplot as plt



robotIP = '10.7.4.109'
PORT = 9559


nameID = "test_subscribe"
videoDevice = ALProxy("ALVideoDevice",robotIP, PORT)
k4VGA=3
kRGBColorSpace=11
captureDevice = videoDevice.subscribeCamera(nameID, 0,k4VGA, kRGBColorSpace, 20)
result = videoDevice.getImageRemote(captureDevice);
width=result[0]
height=result[1]
ima_data=result[6]
Nao_ima=Image.frombytes('RGB',(width,height),ima_data)

plt.imshow(Nao_ima)
Nao_ima.show()
im_file = BytesIO()
Nao_ima.save(im_file, format="JPEG")
im_bytes = im_file.getvalue()  # im_bytes: image in binary format.
im_b64 = base64.b64encode(im_bytes)
print("This is the image ",result)

