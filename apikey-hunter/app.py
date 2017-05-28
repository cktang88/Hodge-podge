"""main app. searches for api keys on github search via webscraping"""
import os
import urllib3

def makeurl(word, page):
    """makes github url"""
    return ''.join(['https://github.com/search?p=', str(page), '&q=', word, '%3D&type=Code'])

def run():
    """main method"""
    http = urllib3.PoolManager()
    filename = os.getcwd() + "/data/data.json"
    tempfile = open(filename, 'w')
    for i in range(1, 2):
    #for i in range(1, 101):
        addr = makeurl('apikey', i)
        req = http.request('GET', addr)
        tempfile.write(req.data)
    tempfile.close()


if __name__ == '__main__':
    run()
