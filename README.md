# Kubernetes Example

You will need a Docker and Kubernetes Engine installed on your machine to run it locally 
- Docker Desktop
- MiniKube (in this README we will use minikube, but you could use only Docket Desktop)
- Virtual Box

###1- Minikube config
Modify the configuration of minikube to add this

```
minikube config set memory 1000mb
minikube config set cpus 5
minikube config set driver virtualbox
minikube start
```

###2- Mysql config
Build custom docker image for mysql to override access rights in local env

In mysql.deployment.yml change this path to your user in your local machine for kind: PersistentVolume
```
hostPath:
    path: "/Users/fabio-giaquinta/mysql/data"
```
Go to k8s-example/k8s/mysql folder and execute to bring up the mysql service and pod

```sh
kubectl create -f . 
```

Open another terminal window and check if everything it's ok executing the Minikube Dashboard

```sh
minikube dashboard
```

To delete it execute this
```sh
kubectl delete -f .
```

### 4- Node docker
Open a terminal and execute this command to be able to use local Docker images in kubernetes deployment

```sh
eval $(minikube docker-env)
```

Now go to k8s-example/node directory with the Dockerfile and build the image of your application, in this case the NodeJS server with this command:

```sh
docker build . -t node-app:1
```
Keep in mind that if you already build an image with version 1, you'll need to build another one with version 2
and so forth (at least in my case if I make changes to the node app, it wouldn't update the image with the same
version number)

### 4- Node deployment config

Go to k8s-example/k8s/node folder and execute to take up the pod

```sh
kubectl create -f .
```

Check if everthing it's ok in the minikube dashboard

To delete it execute this
```sh
kubectl delete -f .
```

### 5- Test

If you are using minikube, you'll probably need a couple more steps

Execute this commands to get the pods names for the node pods 

```sh
minikube tunnel
```

Take one of the node names and replace POD_NAME in the next command

```sh
kubectl get services
```
You need the External Ip address for node-service, then open a browser window and complete the url

http://EXTERNAL-IP:3001/persons