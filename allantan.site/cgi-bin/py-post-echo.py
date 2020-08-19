#!/usr/bin/python3
import cgi
import os

print('Cache-Control: no-cache')
print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>POST Echo</title>')
print ('</head>')
print ('<body>')
print ('<h1>POST Message Body</h1>')
print ('<hr />')
qString = cgi.FieldStorage()
print ('<p>Message Body: </p>')
for key in qString:
  if key:
    print('<p>%s: %s</p>' % (key, qString[key].value))
print ('</body>')
print ('</html>')