from turtle import width
from PIL import Image
import numpy
import math
from numpy import unicode_

name = "tradeZones"
img = Image.open(name + "/" + name + '.png', 'r').convert("RGBA")
WIDTH = 8192
HEIGHT = 3365


binaryImages = []

pix_vals = Image.Image.getdata(img)
""" print(str(img.size))
print(str(len(pix_vals))) """
""" make pix_vals only WIDHT*HEIGHT """

""" Check if its an issue with the way the getdata is gotten, or how it is saved """
""" If two pixels different in the saved image is also different in this test, the problem is getdata """

""" If two pixels different in the image getdata reads from is also different in this test, the saving is the issue"""



last_pixel_value = pix_vals[0]

uniqueColorsFound = [];

usedBits = 16

counter = 0
for pixel_value in pix_vals:
    if pixel_value in uniqueColorsFound:
        """ if len(binaryImages[uniqueColorsFound.index(pixel_value)])*usedBits <= counter:
            print(str(counter//usedBits) + str("vs.") + str(len(pix_vals))) """
        binaryImages[uniqueColorsFound.index(pixel_value)][counter//usedBits] += 2**(counter%usedBits)
    else:
        """ If the unique colour found is transparent, skip """
        if pixel_value[3] > 0:
            print("New color!: " + str(pixel_value) + ". Length: " + str(len(uniqueColorsFound)))
            binaryImages.append([0]*((WIDTH*HEIGHT//usedBits)+1))
            uniqueColorsFound.append(pixel_value)
            last_pixel_value = pixel_value
            binaryImages[uniqueColorsFound.index(pixel_value)][counter//usedBits] += 2**(counter%usedBits)
    counter += 1

counter = 0
for bimg in binaryImages:
    im_correct = []
    for i in range(0, WIDTH*HEIGHT - 1):
        im_correct.append(((0, 0, 0, 0), (255, 255, 255, 255))[(bimg[i//usedBits] & (2**(i % usedBits))) != 0])
    curimg = Image.new('RGBA', (WIDTH, HEIGHT))
    curimg.putdata(im_correct)
    curimg.save(name + "/Split_" + str(counter) + ".png")
    print("saving image: " + str(counter))
    counter += 1

