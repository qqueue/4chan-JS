#!/usr/bin/env bash

set -e
set -o pipefail

git checkout master
git pull origin master

# download file and commit if changed
function poll {
  file=$1
  filename="$file.js"

  echo "polling $file ..."

  # XXX ipv6 cloudflare is 522ing, thanks not-moot
  curl \
    --ipv4 \
    --fail \
    --dump-header /tmp/headers \
    --user-agent "4chan-JS-auto-updater/1.0.0" \
    "http://s.4cdn.org/js/$file.$(date +%s).js" > $filename

  if [[ -n $(git status --porcelain $filename) ]]; then
    modified=$(grep 'Last-Modified' /tmp/headers |\
      awk -F ': ' '{print $2}')

    echo "update of $file detected, last modified: $modified"

    git add $filename
    git commit \
      --message "Update $file" \
      --message "(update detected by update.sh)" \
      --author "Anonymous ## Developer <sage@4chan.org>" \
      --date "$modified"
  fi
}

poll extension 
poll core
poll catalog

git push
