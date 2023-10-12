docker build -t nexus-be . && docker run -d -p 3001:3001 nexus-be

docker kill

docker build -t nexus-fe . && docker run -d -p 3000:3000 nexus-fe

ssh -i nexus.pem ubuntu@54.159.116.83