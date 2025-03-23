# `Docker Secret`与`Nginx TLS`证书

## 生成根证书Key

```bash
openssl genrsa -out "root-ca.key" 4096
```

## 生成根证书CSR

```bash
openssl req \
          -new -key "root-ca.key" \
          -out "root-ca.csr" -sha256 \
          -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA'
```

```bash
openssl req -new -key "root-ca.key" -out "root-ca.csr" -sha256 -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=Swarm Secret Example CA'
```

## 什么是.csr文件

`.csr`文件是证书签名请求（Certificate Signing Request）的缩写。它是一种包含公钥和其他信息的文件，用于向证书颁发机构（CA）申请数字证书。

## 新建`root-ca.cnf`文件，约束根证书只能给终端证书签名，不能用于中间证书

```INI
[root_ca]
basicConstraints = critical,CA:TRUE,pathlen:1
keyUsage = critical, nonRepudiation, cRLSign, keyCertSign
subjectKeyIdentifier=hash
```

## 签名根证书

```bash
openssl x509 -req  -days 3650  -in "root-ca.csr" \
               -signkey "root-ca.key" -sha256 -out "root-ca.crt" \
               -extfile "root-ca.cnf" -extensions \
               root_ca
```

```bash
openssl x509 -req  -days 3650  -in "root-ca.csr" -signkey "root-ca.key" -sha256 -out "root-ca.crt" -extfile "root-ca.cnf" -extensions root_ca
```

## 什么是.crt文件

`.crt`文件是证书文件（Certificate）的缩写。它是一种包含公钥和证书颁发机构（CA）签名的文件，用于验证服务器或客户端的身份。

## 生成站点证书Key

```bash
openssl genrsa -out "site.key" 4096
```

## 生成站点证书CSR

```bash
openssl req -new -key "site.key" -out "site.csr" -sha256 \
          -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost'
```

```bash
openssl req -new -key "site.key" -out "site.csr" -sha256 -subj '/C=US/ST=CA/L=San Francisco/O=Docker/CN=localhost'
```

## 新建`site.cnf`,约束站点证书只能用于服务器认证，不能用于签名

```INI
[server]
authorityKeyIdentifier=keyid,issuer
basicConstraints = critical,CA:FALSE
extendedKeyUsage=serverAuth
keyUsage = critical, digitalSignature, keyEncipherment
subjectAltName = DNS:localhost, IP:127.0.0.1
subjectKeyIdentifier=hash
```

## 签名站点证书

```bash
openssl x509 -req -days 750 -in "site.csr" -sha256 \
    -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial \
    -out "site.crt" -extfile "site.cnf" -extensions server
```

```bash
openssl x509 -req -days 750 -in "site.csr" -sha256 -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial -out "site.crt" -extfile "site.cnf" -extensions server
```

## 分别为`key`,`crt`,`conf`创建secret

```bash
docker secret create site.key ./nginx/secret/site.key
docker secret create site.crt ./nginx/secret/site.crt
docker secret create site.conf ./nginx/conf/site.conf

```

## 配置并启动Nginx服务

### 方式一

```bash
docker service create \
     --name nginx \
     --secret site.key \
     --secret site.crt \
     --secret site.conf \
     --publish published=30000,target=443 \
     --publish published=38080,target=80 \
     --mount type=bind,source=./nginx/logs,target=/var/log/nginx \
     nginx:latest \
     sh -c "ln -s /run/secrets/site.conf /etc/nginx/conf.d/site.conf && exec nginx -g 'daemon off;'"
```

### 方式二

```bash
docker service create \
     --name nginx \
     --secret site.key \
     --secret site.crt \
     --secret source=site.conf,target=/etc/nginx/conf.d/site.conf \
     --publish published=30000,target=443 \
     --publish published=38080,target=80 \
     --mount type=bind,source=./nginx/logs,target=/var/log/nginx \
     nginx:latest \
     sh -c "exec nginx -g 'daemon off;'"
```

### 使用指定的证书验证Nginx Server

```bash
curl --cacert ./nginx/secret/root-ca.crt https://localhost:30000
```

```bash
openssl s_client -connect localhost:30000 -CAfile ./nginx/secret/root-ca.crt
```
