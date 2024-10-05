# Import all spaces from spaces.json,
# all groups from groups.json,
# and all links from links.json
# NOTE: Run export_all.py first to generate the files above

import requests
import json

url = "http://localhost:3000"

spaces, groups, links = "", "", ""
with open("spaces.json", "r") as fp:
    loaded = json.load(fp)
    spaces = json.dumps(loaded)
with open("groups.json", "r") as fp:
    loaded = json.load(fp)
    groups = json.dumps(loaded)
with open("links.json", "r") as fp:
    loaded = json.load(fp)
    links = json.dumps(loaded)

x = requests.post(url + "/api/import?importQuery=import_spaces",
                  data=spaces)
x = requests.post(url + "/api/import?importQuery=import_groups",
                  data=groups)
x = requests.post(url + "/api/import?importQuery=import_links",
                  data=links)
