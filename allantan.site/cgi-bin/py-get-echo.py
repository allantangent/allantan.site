#!/usr/bin/python3
import cgi
import os

print('Cache-Control: no-cache')
print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>GET Echo</title>')
print ('</head>')
print ('<body>')
print ('<h1>GET query string</h1>')
print ('<hr />')
print ('<p>Raw query string: ' + os.environ['QUERY_STRING'] + '</p>')

qString = cgi.FieldStorage()
print ('<p>Formatted Query String:' +  '</p>')
for key in qString:
  if key:
    print('<p>' + key + ': ' + qString[key] + '</p>')

print ('</body>')
print ('</html>')