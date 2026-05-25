import http.server, os
os.chdir('/Users/Andre/Documents/A2 Engenharia/site')
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=3030, bind='127.0.0.1')
