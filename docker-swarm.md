# Swarm及Secret相关命令

## 打印单个Swarm Service信息

```bash
docker service ps [服务名]
```

如果服务异常频繁重启，打印输出中会有多条`Shutdown`记录，如下所示：

| NAME | IMAGE | NODE | STATE | ERROR |
|------|-------|------|-------|-------|
| redis.1.siftice35gla | redis:alpine | moby | Running 4 seconds ago ||
| redis.1.whum5b7gu13e | redis:alpine | moby | Shutdown | Failed 20 seconds ago "task: non-zero exit (1)" |

## 查询单个Swarm Service的Task都在哪些Container上运行（仅输出Container的ID）

```bash
docker ps --filter name=[服务名] -q
```

同时登录并执行命令

```bash
docker container exec $(docker ps --filter name=redis -q) ls -l /run/secrets
```

```bash
docker container exec $(docker ps --filter name=redis -q) cat /run/secrets/my_secret_data
```

## Secret由Docker Swarm Manager集中管理，当授权某个服务访问某个secret后，负责运行服务任务的container才有权限读取此secret值， secret文件被从Swarm Manager加密发送给此container，并挂载到container内存中，挂在点的路径是Compose文件中配置的，格式为：`/run/secrets/[Secret名]`

## 列出所有secrets

```bash
docker secrets ls
```

## 移除服务对某个secret的访问权

```bash
docker service update --secret-rm [secret名] [service名]
```

## 移除service

```bash
docker service rm [service名]
```

## 移除secret

```bash
docker secret rm [secret名]
```
