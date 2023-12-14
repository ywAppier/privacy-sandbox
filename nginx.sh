#!/usr/bin/env bash
export DOLLAR="$"
export BASE_PATH=$(nginx -V 2>&1 | grep -o '\-\-conf\-path=[/a-z]*.conf' | cut -d '=' -f2 | rev | cut -d '/' -f2- | rev)
export PWD=$(pwd)
set -o allexport
source .env
set +o allexport
export DSP_ORIGIN=$(echo $VITE_DSP_URL | grep -o 'https://[^/]*')
export ADVERTISER_ORIGIN=$(echo $VITE_ADVERTISER_URL | grep -o 'https://[^/]*')
export SSP_ORIGIN=$(echo $VITE_SSP_URL | grep -o 'https://[^/]*')
export PUBLISHER_ORIGIN=$(echo $VITE_PUBLISHER_URL | grep -o 'https://[^/]*')

envsubst < nginx_dbg.conf.template > nginx_dbg.conf

nginx -c $(pwd)/nginx_dbg.conf -g 'daemon off; error_log /dev/stdout info;'
