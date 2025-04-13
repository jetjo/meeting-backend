# Docker Secret与Mysql和Wordpress

## 生成Mysql pwd

*`-`*的意思是从标准输入读取

```sh
openssl rand -base64 20 | docker secret create mysql_password -
```

## 生成Mysql root pwd

```sh
openssl rand -base64 20 | docker secret create mysql_root_password -
```

## 创建overlay网络

```sh
docker network create -d overlay  mysql_private
```

## 运行Mysql service

```sh
docker service create \
     --name mysql \
     --replicas 1 \
     --network mysql_private \
     --mount type=volume,source=mydata,destination=/var/lib/mysql \
     --secret source=mysql_root_password,target=mysql_root_password \
     --secret source=mysql_password,target=mysql_password \
     -e MYSQL_ROOT_PASSWORD_FILE="/run/secrets/mysql_root_password" \
     -e MYSQL_PASSWORD_FILE="/run/secrets/mysql_password" \
     -e MYSQL_USER="wordpress" \
     -e MYSQL_DATABASE="wordpress" \
     mysql:latest
```

## 运行Wordpress service

```sh
docker service create \
     --name wordpress \
     --replicas 1 \
     --network mysql_private \
     --publish published=38081,target=80 \
     --mount type=volume,source=wpdata,destination=/var/www/html \
     --secret source=mysql_password,target=wp_db_password \
     -e WORDPRESS_DB_USER="wordpress" \
     -e WORDPRESS_DB_PASSWORD_FILE="/run/secrets/wp_db_password" \
     -e WORDPRESS_DB_HOST="mysql:3306" \
     -e WORDPRESS_DB_NAME="wordpress" \
     wordpress:latest
```

## 生成新的Mysql pwd

```sh
openssl rand -base64 20 | docker secret create mysql_password_v2 -
```

## 授权`mysql`service访问新的secret, ***不能重命名或更新secret***

***更新service，会导致服务重启***
***但是，至此，wordpress用户的pwd还是原来的***

```sh
docker service update \
    --secret-rm mysql_password mysql

docker service update \
    --secret-add source=mysql_password,target=old_mysql_password \
    --secret-add source=mysql_password_v2,target=mysql_password \
    mysql

```

## 使用`mysqladmin`CLI修改`wordpress`用户的pwd

### 找出`mysql`service-task的container id

```sh
docker ps --filter name=mysql -q
```

### 登录container，运行`mysqladmin`

```sh
docker container exec $(docker ps --filter name=mysql -q) \
    bash -c 'mysqladmin --user=wordpress --password="$(< /run/secrets/old_mysql_password)" password "$(< /run/secrets/mysql_password)" '

```

### 更新Wordpress服务使用新的secret

```sh
docker service update \
    --secret-rm mysql_password \
    --secret-add source=mysql_password_v2,target=wp_db_password \
    wordpress

```

## 吊销mysql service对旧secret的访问，并删除旧secret

```sh
docker service update \
     --secret-rm mysql_password \
     mysql

docker secret rm mysql_password
```

## 清理

```sh
docker service rm wordpress mysql

docker volume rm mydata wpdata

docker secret rm mysql_password_v2 mysql_root_password
```
