#!/usr/bin/python
from datetime import datetime
import cgi
import html
import os

print ("Content-type:text/html\r\n\r\n")
print ('<html>')
print ('<head>')
print ('<title>Hello, Python!</title>')
print ('</head>')
print ('<body>')
print ('<h1>Hello, Python!</h1>')
print ('<p>Current time: ' + datetime.now() + '</p>')
print ('<br />')
print ('Your IP address is: ' + html.escape(os.environ["REMOTE_ADDR"]))
print ('</body>')
print ('</html>')