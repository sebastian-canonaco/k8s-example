# Kubernetes Example

You will need a Docker and Kubernetes Engine installed on your machine to run it locally (Docker Desktop or MiniKube recommended)

First generate the image of your application, in this case the NodeJS application with this command:

```sh
docker build -t <image-name>:<tag> /path/to/Dockerfile
```

Apply the Kubernetes configuration

```sh
kubectl apply -f /path/to/yaml/manifest
```
