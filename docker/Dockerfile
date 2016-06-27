FROM node:argon

RUN apt-get update
RUN apt-get install -y sudo git vim zsh

# /usr/sbin/groupadd -g 500
RUN /usr/sbin/groupadd -g 500 node
RUN /usr/sbin/groupadd -g 1000 xw
RUN /usr/sbin/useradd -d /home/xw -m  -u 1000 -g 1000 -G 500 xw
RUN echo xw:xw | chpasswd
RUN echo 'xw ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN mkdir /data
RUN chgrp -R node /data

# jenkins
RUN /usr/sbin/groupadd -g 1001 jenkins && /usr/sbin/useradd -d /home/jenkins -m -s /bin/zsh -u 1001 -g 1001 -G 500,1000 jenkins
RUN echo jenkins:jenkins | chpasswd
RUN echo 'jenkins ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
ADD zshrc /home/jenkins/.zshrc

USER xw
ADD launch.sh /app/launch.sh

EXPOSE 3000
EXPOSE 80
CMD "--bind 0.0.0.0"

WORKDIR /data
CMD /app/launch.sh
