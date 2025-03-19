# 关于Traefik证书安装失败的问题

## 问题描述

    使用DNS Challenge模式为网站生成证书，证书生成成功，但是Traefik一直报错（No default certificate, fallback to the internal generated certificate ）,网站被迫使用Traefik无效的默认证书。。。最后什么配置也没变，莫名其妙问题消失了。。。
    只记得最后一次改配置，把`whoami`服务的标签值`traefik.http.routers.whoami.tls.certresolver`改为一个不存在的certResolver，重启docker，证书竟然装上了。。。
    然后改回正确的certResolver，再重启docker，证书仍然可以安装。。。
    可能Traefik存在缓存吧。。。
        再次测试发现如果把`certificatesresolvers.myresolver.acme`的caServer设置为用于调试的地址`https://acme-staging-v02.api.letsencrypt.org/directory`会发生证书颁发成功但没有安装的问题，而如果证书安装成功后即使certResolver值错误也没事。。。
