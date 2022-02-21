#! /bin/sh
docker pull mongo
docker rm -f dmongodb
docker run -it -v mongodata:/data/db -p 27019:27017 --name dmongodb -d mongo 
