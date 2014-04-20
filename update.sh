#!/usr/bin/env bash

set -e
set -o pipefail

git checkout master
git pull origin master

# download file and commit if changed
function poll {
  file=$1

  echo "polling $file ..."

  CODE=$(curl \
    --fail \
    --dump-header /tmp/headers \
    --user-agent "4chan-JS-auto-updater/1.0.0" \
    "http://s.4cdn.org/js/$file.$(date +%s).js")

  js-beautify --indent-size=2 - <<< "$CODE" > $file.js

  if [[ -n $(git status --porcelain $file.js) ]]; then
    modified=$(grep 'Last-Modified' /tmp/headers |\
      awk -F ': ' '{print $2}')

    echo "update of $file detected, last modified: $modified"

    git add $file.js
    git commit \
      --message "Update $file.js" \
      --message "(update detected by update.sh)" \
      --author "Anonymous ## Developer <sage@4chan.org>" \
      --date "$modified"
  fi
}

poll extension 
poll extension-compiled
poll core
poll core-compiled
poll catalog

