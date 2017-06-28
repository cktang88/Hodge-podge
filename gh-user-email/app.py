"""main app. searches for api keys on github search via webscraping"""
""" USAGE: use javascript server.js instead
import os
import urllib3

def makeurl(word, page):
    """makes github url"""
    string = ''.join(['https://github.com/search?p=',
                      str(page), '&q=', word, '%3D&type=Code'])
    return string

# search for 'apikey' and 'api_key'

def run():
    """main method"""
    http = urllib3.PoolManager()
    filename = os.getcwd() + "/data/data.html"
    tempfile = open(filename, 'w')
    useragent = ' '.join(['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1)',
                          'AppleWebKit/537.36 (KHTML, like Gecko)',
                          'Chrome/39.0.2171.95 Safari/537.36'])
    print useragent
    for i in range(1, 2):
        # for i in range(1, 101):
        addr = makeurl('apikey', i)
        req = http.request('GET', addr, headers={'User-Agent': useragent})
        tempfile.write(req.data)
        print addr
        print req.status
    tempfile.close()


if __name__ == '__main__':
    run()
