docker build -t nexus .

docker run -d -p 3001:3001 -v $pwd nexus

docker kill