#!/bin/sh

docker build -t apig-demo-app .
docker tag apig-demo-app:latest <your_ecr_repo>/apig-demo-app:latest
aws ecr get-login-password --region <some_region> --profile=<your_profile> | docker login --username AWS --password-stdin <your_ecr_repo>
docker push <your_ecr_repo>/apig-demo-app:latest

