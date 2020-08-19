#!/usr/bin/python3
import cgi
import os

name = "You do not have a name set"
print('Cache-Control: no-cache;')
if(not inSession() and cgi.FieldStorage()['username'].value is not None):
  print('Set-Cookie:session = ' + cgi.FieldStorage()['username'].value)

print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>General Echo</title>')
print ('</head>')
print ('<body>')
print ('<h1>Python Sessions Page 1</h1>')

name = cgi.FieldStorage()['username'].value
if name is None:
  name = 'You do not have a name set'

print('<p><b>Name:</b> %s' % name)

print ('<a href=\'./py-sessions-2.py\'>Session Page 2</a><br/>')
print ('<a href=\'../py-cgiform.html\'>Python CGI Form</a><br />')
print ('<form style=\'margin-top:30px\' action=\'./py-destroy-session.py\' method=\'get\'>')
print ('<button type=\'submit\'>Destroy Session</button>')
print ('</form>')

print ('</body>')
print ('</html>')

def inSession():
  if os.environ.has_key('HTTP_COOKIE'):
    for cookie in map(strip, os.environ['HTTP_COOKIE'].split(';')):
      (key, value) = cookie.split('=')
      if key == "session":
        val = value
    if val > 0:
      return True
  return False