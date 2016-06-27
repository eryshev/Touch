#!/bin/bash
[ -f "/etc/profile.d/proxy.sh" ] && source /etc/profile.d/proxy.sh

export HTTPS_PROXY=$HTTP_PROXY
npm config set prefix /app/npm-global
if [ ! -d "/app/npm-global" ]; then
  sudo mkdir -p /app/npm-global
  sudo chown $(whoami):$(whoami) -R /app/npm-global
fi
npm install

echo "RUN SERVER"
if [ $MODE == 'BUILD' ]; then
    echo "BUILD MODE"
    npm run build
else
    echo "DEV MODE"
    npm run dev 
fi
