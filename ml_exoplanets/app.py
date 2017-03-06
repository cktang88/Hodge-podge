#!python3
import xml.etree.ElementTree as ET, urllib.request, gzip, io
import os
def run():
    raw = os.getcwd() + "/data/systems.xml"
    openExoplanetCatalogue = ET.parse(raw)
    printall(openExoplanetCatalogue)

def printall(oec):
    outputfile = open('data.txt', 'w')
    numSystems = 0;
    #systems
    for system in oec.findall("./system"):
        numSystems += 1
        for planet in system.findall(".//planet"):
            outputfile.write(str(numSystems) + " * System: " + system.findtext("name"))
            printPlanet(planet, outputfile)
            outputfile.write("\n")

def printPlanet(planet, outputfile):
    outputfile.write("\t Planet: " + planet.findtext("name"))
    arr_keys = ["mass", "radius", "temperature", "age", "period", "eccentricity", "metallicity"]
    arr_keys2 = ["period", "periastron", "periastrontime", "semimajoraxis"]
    ### can't use "spectraltype" b/c missing some data??
    arr_keys += arr_keys2

    arr = []
    for tag in arr_keys:
        arr.append(planet.findtext(tag))
    #print(arr)
    outputfile.write("\t " + str(arr))

    ##### TODO: remove features where >80% of planets don't have it


if __name__ == '__main__':
    run()
