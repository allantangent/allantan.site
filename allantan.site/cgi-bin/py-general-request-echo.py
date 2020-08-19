#!/usr/bin/python3
import cgi
import os

print('Cache-Control: no-cache')
print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>General Echo</title>')
print ('</head>')
print ('<body>')
print ('<h1>General Request Echo</h1>')
print ('<hr />')
print ('<p><b>HTTP Protocol:</b> ' + os.environ['SERVER_PROTOCOL'] + '</p>')
print ('<p><b>HTTP Method:</b> ' + os.environ['REQUEST_METHOD'] + '</p>')
print ('<p><b>Query String:</b> ' + os.environ['QUERY_STRING'] + '</p>')

qString = cgi.FieldStorage()
print ('<p><b>Message Body:</b> ' +  '</p>')
if bool(qString):
  for key in qString:
    if key is not None:
      print('<p>%s: %s</p>' % (key, qString[key].value))

print ('</body>')
print ('</html>')