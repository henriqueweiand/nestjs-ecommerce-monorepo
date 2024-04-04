docker run -d -p 5000:5000 --name registry registry:2

docker tag nestjs-ecommerce-monorepo_auth:latest localhost:5000/nestjs-ecommerce-monorepo_auth:latest
docker tag nestjs-ecommerce-monorepo_orders:latest localhost:5000/nestjs-ecommerce-monorepo_orders:latest

docker push localhost:5000/nestjs-ecommerce-monorepo_auth:latest
docker push localhost:5000/nestjs-ecommerce-monorepo_orders:latest

kubectl create deployment auth --image=localhost:5000/nestjs-ecommerce-monorepo_auth:latest --dry-run=client -o yaml > deployment.yaml
kubectl create deployment orders --image=localhost:5000/nestjs-ecommerce-monorepo_orders:latest --dry-run=client -o yaml > deployment.yaml

kubectl create secret generic mongodb --from-literal=connectionString=MONGOCONNECTIONSTRING

helm upgrade ecommerce .
