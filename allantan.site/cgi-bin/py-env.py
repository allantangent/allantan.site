#!/usr/bin/python3
import cgi
import os

print('Content-type: text/html\r\n\r\n')
for param in os.environ.keys():
  print('<b>%s</b>: %s<\br>' % (param, os.environ[param]))