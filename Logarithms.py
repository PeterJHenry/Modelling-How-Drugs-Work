from math import *
from graphics import *
from time import *

xmin = -11
xmax = -2
range = xmax - xmin
inc = (range)/100

def oneSite(win, ki):
    x = xmin
    binding = 100.0
    print("---Min and Max---")
    print(xmin)
    print(xmax)
    print("---------")
    while (x < xmax):
        oldBind = binding
        binding = 100.0/(1+pow(10.0,(x+ki)))
        oldX = x
        x = x + inc
        line = Line(Point((oldX-xmin)*1920/range, (100-oldBind)*1080/100), Point((x-xmin)*1920/range, (100-binding)*1080/100))
        line.setWidth = 3
        line.setFill = color_rgb(0,0,255)
        line.draw(win)
        print(oldX, x, oldBind, binding)

def twoSite(win, d1, d2, ki1, ki2):
    x = xmin
    binding = 100.0
    while (x < xmax):
        oldBind = binding
        binding = (d1/(1+pow(10.0,(x+ki1)))+d2/(1+pow(10.0,(x+ki2))))
        oldX = x
        x = x + inc
        line = Line(Point((oldX-xmin)*1920/range, (100-oldBind)*1080/100), Point((x-xmin)*1920/range, (100-binding)*1080/100))
        line.setWidth = 3
        line.setFill = color_rgb(255,0,0)
        line.draw(win)
        print(binding)

def threeSite(win, d1, d2, d3, ki1, ki2, ki3):
    x = xmin
    binding = 100.0
    while (x < xmax):
        oldBind = binding
        binding = (d1/(1+pow(10.0,(x+ki1)))+d2/(1+pow(10.0,(x+ki2)))+d3/(1+pow(10.0,(x+ki3))))
        oldX = x
        x = x + inc
        line = Line(Point((oldX-xmin)*1920/range, (100-oldBind)*1080/100), Point((x-xmin)*1920/range, (100-binding)*1080/100))
        line.setWidth = 3
        line.setFill = color_rgb(0,255,0)
        line.draw(win)
        print(binding)

def main():
    win = GraphWin("Scratchpad", 1920, 1080)
    oneSite(win, 9.0)
    twoSite(win, 50.0, 50.0, 8.0, 7.0)
    threeSite(win, 40.0, 30.0, 30.0, 9.0, 8.0, 7.0)
    sleep(10)

main()