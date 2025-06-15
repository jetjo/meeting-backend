
```sh
# 1、使用docker swarm init初始化swarm集群
# 2、使用docker swarm join-token worker获取worker节点加入集群的命令
# 3、使用docker swarm join-token manager获取manager节点加入集群的命令
# 4、使用docker node ls查看节点状态
# 在另一台服务器上执行
# docker swarm join --token <your_token> <your_ip_address>:2377
# This node joined a swarm as a worker.
# 使用ip addr show eth1查看局域网ip, 如果没有局域网eth1,
# 使用ip addr show eth0查看公网ip
docker swarm join --token SWMTKN-1-xxxxxx-xx 10.55.12.27:2377
# code /etc/nftables/firewall.xyz.nft
# !下面这句👇有严重问题，没有指明`parent`,如果主机有多个网络接口（eth0,eth1...）
# 在不指明`parent`的情况下，会导致所创建网络的网关绑定出口在eth0上
# 如果后续的worker在join时是从eth1上join的，那么就会导致网络不通
# docker network create --driver=overlay --attachable vpn_overlay

docker run -it --name alpine1 --network vpn_overlay alpine
# 此时在worker节点上执行`docker network ls`可以确认`vpn_overlay`网络还不存在
# 在worker节点上执行`docker run -dit --name alpine2 --network vpn_overlay alpine`
# 后续执行`docker network ls`可以确认`vpn_overlay`网络已经存在，且和manager节点上的`vpn_overlay`网络ID一致


# 解决步骤

# 旧manager节点运行
docker swarm join-token manager
# 另一个host上运行  ,以worker身份加入swarm集群
# ！如果以manager身份加入swarm集群，当前的manager节点会意外地被降级为worker节点
docker swarm join --token SWMTKN-1-- 10.55.12.27:2377
# 旧manager节点运行
docker node demote old_manager_node_name
docker swarm leave --force
# !一旦离开了swarm集群，之前创建的screts都会被删除...
# 在新的manager节点上运行
docker node rm old_manager_node_name
docker swarm leave --force 
# 旧manager节点从头再来 ...
docker swarm init --advertise-addr eth1:2377


docker network create --driver=overlay --attachable -o=parent=eth1 overlay_eth1
docker network create --driver=overlay --attachable -o=parent=eth0 overlay_eth0

```