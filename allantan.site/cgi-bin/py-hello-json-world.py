#!/usr/bin/python3
from datetime import datetime
import cgi
import os
import json

data_set = {"message": "Hello World", "date": datetime.now().strftime(), "currentIp": cgi.escape(os.environ["REMOTE_ADDR"])}
print ("Content-type:text/html\r\n\r\n")
print ('<html>')
print ('<head>')
print ('<title>Hello, Python!</title>')
print ('</head>')
print ('<body>')
print ('<pre>')
print (json.dumps(data_set))
print ('</pre>')
print ('</body>')
print ('</html>')