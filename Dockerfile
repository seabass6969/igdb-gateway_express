FROM node:latest
ENV PORT=3001
ENV WORKDIR=/work/
EXPOSE ${PORT}

ADD . $WORKDIR

WORKDIR ${WORKDIR}
RUN npm install -g npm@latest 
RUN npm install
CMD ["npm", "start"]
