#!/usr/bin/python3
import cgi
import os

print('Cache-Control: no-cache;')
print('Set-Cookie: ')
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