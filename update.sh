#!/usr/bin/env bash

set -e
set -o pipefail

git checkout master
git pull origin master

JS=$(curl \
  --fail \
  --user-agent "4chan-JS-auto-updater/1.0.0" \
  "http://s.4cdn.org/js/extension.js")

js-beautify --indent-size=2 - <<< "$JS" > extension.js

if [[ -n $(git status --porcelain) ]]; then
  git add extension.js
  git commit \
    --message "Update extension.js" \
    --message "(update detected by update.sh)" \
    --author "Anonymous ## Developer <sage@4chan.org>"	
  git push origin master
fi

