from turtle import width
from PIL import Image
import numpy
import math
from numpy import unicode_

name = "tradeZones"
img = Image.open(name + "/" + name + '.png', 'r').convert("RGBA")
WIDTH = 8392
HEIGHT = 3363


imgs = []

pix_vals = list(img.getdata())

last_pixel_value = pix_vals[0]

uniqueColorsFound = [];

usedBits = 16

counter = 0
for pixel_value in pix_vals:
    if pixel_value in uniqueColorsFound:
        if len(imgs[uniqueColorsFound.index(pixel_value)])*usedBits <= counter:
            print(counter)
        imgs[uniqueColorsFound.index(pixel_value)][counter//usedBits] += 1**(counter%usedBits)
    else:
        print("New color!: " + str(pixel_value) + ". Length: " + str(len(uniqueColorsFound)))
        imgs.append([0]*math.ceil(WIDTH*HEIGHT/usedBits))
        uniqueColorsFound.append(pixel_value)
        last_pixel_value = pixel_value
        imgs[uniqueColorsFound.index(pixel_value)][counter//usedBits] = 1**(counter%usedBits)
    counter += 1

counter = 0
for im in imgs:

    im_correct = []
    for i in range(WIDTH*HEIGHT):
            im_correct.append(((0, 0, 0, 0), (255, 255, 255, 255))[im[i//usedBits] & 1**(i%usedBits)])

    curimg = Image.new('RGBA', (WIDTH, HEIGHT))
    curimg.putdata(im_correct)
    """ curimg.show() """
    curimg.save(name + "/Split_" + str(counter) + ".png")
    print("saving image: " + str(counter))
    counter += 1

