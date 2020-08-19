#!/usr/bin/python3
import cgi
import os
import hashlib, time
from http import cookies

cookie = cookies.SimpleCookie()
string_cookie = os.environ.get('HTTP_COOKIE')
if not string_cookie:
  name = 'You do not have a name set'
else:
  cookie.load(string_cookie)
  sid = cookie['sid'].value
  name = cookie['name'].value

print('Cache-Control: no-cache;')
print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>Python Sessions</title>')
print ('</head>')
print ('<body>')
print ('<h1>Python Sessions Page 2</h1>')

try:
  name = cookie['name'].value
except:
  name = 'You do not have a name set'

print('<p><b>Name:</b> %s' % name)
print('<br />')
print ('<a href=\'./py-sessions-1.py\'>Session Page 1</a><br/>')
print ('<a href=\'../py-cgiform.html\'>Python CGI Form</a><br />')
print ('<form style=\'margin-top:30px\' action=\'./py-destroy-session.py\' method=\'get\'>')
print ('<button type=\'submit\'>Destroy Session</button>')
print ('</form>')

print ('</body>')
print ('</html>')