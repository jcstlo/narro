# Exports all links to links.json,
# all groups to groups.json,
# and all spaces to spaces.json
import requests
import json

url = "http://localhost:3000"


def request_debug_print(req):
    print(f"DEBUG: status_code = {req.status_code}")
    print(f"DEBUG: headers = {req.headers['content-type']}")
    print(f"DEBUG: encoding = {req.encoding}")
    print(f"DEBUG: text = {req.text}")
    print(f"DEBUG: json = {req.json()}")


def format_json(resp_json):
    return json.dumps(resp_json, indent=2)


def write_resp_to_file(resp, filename):
    formatted_json = format_json(resp.json())
    with open(filename, "w") as fp:
        fp.write(formatted_json)


all_spaces = requests.get(url + "/api/export?exportQuery=all_spaces")
all_groups = requests.get(url + "/api/export?exportQuery=all_groups")
all_links = requests.get(url + "/api/export?exportQuery=all_links")

write_resp_to_file(all_spaces, "spaces.json")
write_resp_to_file(all_groups, "groups.json")
write_resp_to_file(all_links, "links.json")
