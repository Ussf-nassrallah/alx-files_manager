import base64
import requests
import sys

file_path = sys.argv[1]
file_name = file_path.split('/')[-1]

r_headers = {'X-Token': sys.argv[2]}

with open(file_path, "rb") as image_file:
    for chunk in iter(lambda: image_file.read(4096), b''):
        file_encoded = base64.b64encode(chunk).decode('utf-8')
        r_json = {'name': file_name, 'type': 'image', 'isPublic': True, 'data': file_encoded, 'parentId': sys.argv[3]}

        r = requests.post("http://0.0.0.0:5000/files", json=r_json, headers=r_headers)

        try:
            r.raise_for_status()
        except requests.exceptions.HTTPError as http_error:
            print(f"HTTP error occurred: {http_error}")
            break
