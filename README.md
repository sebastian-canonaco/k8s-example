# Kubernetes Example

## Docker Desktop
You will need to install Docker Desktop on your machine to run it locally

###1- Enable Kubernetes on your Docker Desktop installation
Open your Docker Desktop app and go to Preferences, Kubernetes and check the box "Enable Kubernetes"
If you already have and it's not working click on the button "Reset Kubernetes Cluster"

###2- Bring up the cluster
Execute the steps 2, 5 and 6

###3- Test the Kubernetes Cluster
Go to http://localhost:3001/persons and you should see the persons in the DB

## Minikube
You will need a Docker and Kubernetes Engine installed on your machine to run it locally
- Docker Desktop
- MiniKube (in this README we will use minikube, but you could use only Docket Desktop)
- Virtual Box

###1- Minikube config
Modify the configuration of minikube to add this

```sh
minikube config set memory 1000mb
minikube config set cpus 5
minikube config set driver virtualbox
minikube start
```

###2- Mysql config
Build custom docker image for mysql to override access rights in local env

In mysql.deployment.yml change this path to your user in your local machine for kind: PersistentVolume
```sh
hostPath:
    path: "/Users/fabio-giaquinta/mysql/data"
```
Go to k8s-example/k8s/mysql folder and execute to bring up the mysql service and pod

```sh
kubectl create -f . 
```

To delete it execute this
```sh
kubectl delete -f .
```

### 3- Test Mysql Deployment
Open another terminal window and check if everything it's ok executing the Minikube Dashboard

```sh
minikube dashboard
```

### 4- Let minikube use local docker image
Open a terminal and execute this command to be able to use local Docker images in kubernetes deployment

```sh
eval $(minikube docker-env)
```

### 5- Let minikube use local docker image
Now go to k8s-example/node directory with the Dockerfile and build the image of your application, in this case the NodeJS server with this command:

```sh
docker build --no-cache . -t node-app:1
```


### 6- Node deployment

Go to k8s-example/k8s/node folder and execute to take up the pod

```sh
kubectl create -f .
```

To delete it execute this
```sh
kubectl delete -f .
```

### 7- Test Node deployment
Check if everthing it's ok in the minikube dashboard that is already open in the browser

### 8- Test the Kubernetes Cluster

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