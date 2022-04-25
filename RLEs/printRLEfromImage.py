from PIL import Image
from numpy import unicode_
img = Image.open('../../tradezones.png', 'r')

pix_vals = list(img.getdata())

counter = 0
last_pixel_value = pix_vals[0]
""" Must Match the const symbols in printRLEFromImage.py """
symbols = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

uniqueColorsFound = [];


for pixel_value in pix_vals:
    if(pixel_value == last_pixel_value):
        counter += 1
    else:
        print(counter, end="")
        index = 0
        try:
            index = uniqueColorsFound.index(last_pixel_value)
        except ValueError:
            index = len(uniqueColorsFound)
            uniqueColorsFound.append(last_pixel_value)

        print(symbols[index], end="")

        counter = 1
        last_pixel_value = pixel_value