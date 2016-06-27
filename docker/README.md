- Build docker
```
docker build -t touch_app_img
```
- Run docker in dev mode
```
docker run --rm -it -u xw -v $(pwd):/data/ -p 3000:3000 --name touch_app -v /etc/profile.d/proxy.sh:/etc/profile.d/proxy.sh touch_app_img
```
- Build app
```
docker run --rm -it -u xw -v $(pwd):/data/ -p 3000:3000 --name touch_app -v /etc/profile.d/proxy.sh:/etc/profile.d/proxy.sh -e "MODE=BUILD" touch_app_img
```