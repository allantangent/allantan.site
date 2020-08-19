#!/usr/bin/python3
import cgi
import os
from http import cookies

cookie = cookies.SimpleCookie()
string_cookie = os.environ.get('HTTP_COOKIE')
cookie.load(string_cookie)
cookie['sid'] = None
cookie['name'] = None
print(cookie)

print('Cache-Control: no-cache;')
print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>Python Sessions</title>')
print ('</head>')
print ('<body>')
print ('<h1>Session Destroyed</h1>')

print ('<a href=\'../py-cgiform.html\'>Back to the Python CGI Form</a><br />')
print ('<a href=\'./py-sessions-1.py\'>Back to Page 1</a><br/>')
print ('<a href=\'./py-sessions-2.py\'>Back to Page 2</a><br/>')

print ('</body>')
print ('</html>')