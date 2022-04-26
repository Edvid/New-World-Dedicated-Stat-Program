from turtle import width
from PIL import Image
import numpy
import math
from numpy import unicode_

name = "tradeZones"
img = Image.open(name + "/" + name + '.png', 'r')
WIDTH = 8392
HEIGHT = 3363


imgs = []

pix_vals_raw = list(img.getdata())

pix_vals = [(0,0,0,0)]*WIDTH*HEIGHT

counter = 0
tempTupleArray = [0,0,0,0]
for raw in pix_vals_raw:
    tempTupleArray[counter % 4] = raw
    if((counter - 1) % 4 == 0): 
        pix_vals[math.floor(counter / 4)] = (tempTupleArray[0], tempTupleArray[1], tempTupleArray[2], tempTupleArray[3])
    counter += 1

counter = 0
last_pixel_value = pix_vals[0]

uniqueColorsFound = [];

for pixel_value in pix_vals:
    if pixel_value in uniqueColorsFound:
        imgs[uniqueColorsFound.index(pixel_value)][counter] = pixel_value
    else:
        print("New color! Length:" + str(len(uniqueColorsFound)))
        imgs.append([(0,0,0,0)]*WIDTH*HEIGHT)
        uniqueColorsFound.append(pixel_value)
        last_pixel_value = pixel_value
        imgs[uniqueColorsFound.index(pixel_value)][counter] = pixel_value
    counter += 1

counter = 0
for im in imgs:
    curimg = Image.new('RGBA', (WIDTH, HEIGHT))
    curimg.putdata(im)
    """ curimg.show() """
    curimg.save(name + "/Split_" + str(counter) + ".png")
    counter += 1

