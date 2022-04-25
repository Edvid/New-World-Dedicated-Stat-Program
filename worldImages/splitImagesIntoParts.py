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

pix_vals = list(img.getdata())

counter = 0
last_pixel_value = pix_vals[0]

uniqueColorsFound = [];


for pixel_value in pix_vals:
    if pixel_value in uniqueColorsFound:
        imgs[uniqueColorsFound.index(pixel_value)][math.floor(counter / WIDTH)][counter % WIDTH] = pixel_value
    else:
        imgs.append([[0]*WIDTH]*HEIGHT)
        
        uniqueColorsFound.append(pixel_value)
        last_pixel_value = pixel_value
        imgs[uniqueColorsFound.index(pixel_value)][math.floor(counter / WIDTH)][counter % WIDTH] = pixel_value
    counter += 1

counter = 0
for im in imgs:
    Image.new('RBGA', (WIDTH, HEIGHT)).putdata(im).show().save(name + "/Split_" + counter + ".png")
    counter += 1

