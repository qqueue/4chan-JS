#!/usr/bin/env bash

set -e
set -o pipefail

git checkout master
git pull origin master

EXTENSION=$(curl \
  --fail \
  --user-agent "4chan-JS-auto-updater/1.0.0" \
  "http://s.4cdn.org/js/extension.$(date +%s).js")

js-beautify --indent-size=2 - <<< "$EXTENSION" > extension.js

CORE=$(curl \
  --fail \
  --user-agent "4chan-JS-auto-updater/1.0.0" \
  "http://s.4cdn.org/js/core.$(date +%s).js")

js-beautify --indent-size=2 - <<< "$CORE" > core.js

CATALOG=$(curl \
  --fail \
  --user-agent "4chan-JS-auto-updater/1.0.0" \
  "http://s.4cdn.org/js/catalog.$(date +%s).js")

js-beautify --indent-size=2 - <<< "$CATALOG" > catalog.js

if [[ -n $(git status --porcelain) ]]; then
  git add *.js
  git commit \
    --message "Update scripts" \
    --message "(update detected by update.sh)" \
    --author "Anonymous ## Developer <sage@4chan.org>"
  git push origin master
fi

