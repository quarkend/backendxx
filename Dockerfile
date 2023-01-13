FROM node:14
# FROM pm2-runtime

WORKDIR /backend

# COPY package.json /backend/package.json


# # Same as npm install
# RUN npm i   --force

# COPY . /backend 
RUN npm install 
# ENV PM2_PUBLIC_KEY n462zhq0onrfl11
# ENV PM2_SECRET_KEY 51n7fyi8ifs71rp

CMD npm start
