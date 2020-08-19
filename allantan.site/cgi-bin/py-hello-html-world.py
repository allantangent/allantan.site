#!/usr/bin/python3
from datetime import datetime
import cgi
import os

print ("Content-type:text/html\r\n\r\n")
print ('<html>')
print ('<head>')
print ('<title>Hello, Python!</title>')
print ('</head>')
print ('<body>')
print ('<h1>Hello, Python!</h1>')
print ('<p>Current time: ', datetime.now())
print ('</p>')
print ('<p>Your IP address is: ' + cgi.escape(os.environ["REMOTE_ADDR"]) + '</p>')
print ('</body>')
print ('</html>')