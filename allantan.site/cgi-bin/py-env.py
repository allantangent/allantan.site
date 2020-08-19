#!/usr/bin/python3
import cgi
import os

print('Content-type: text/html\r\n\r\n')
print ('<html>')
print ('<head>')
print ('<title>Environment Variables</title>')
print ('</head>')
print ('<body>')
print ('<h1>Environment Variables</h1>')
print ('<hr />')
for param in os.environ.keys():
  print('<b>%s</b>: %s</br>' % (param, os.environ[param]))

print ('</body>')
print ('</html>')