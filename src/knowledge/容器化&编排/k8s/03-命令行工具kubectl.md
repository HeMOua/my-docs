---
title: 3. 命令行工具 kubectl
category: 容器化&编排
tag:
  - k8s
---

# 命令行工具 kubectl

## 资源类型与别名

+ pods：po
+ deployments：deploy
+ services：svc
+ namespace：ns
+ nodes：no

## 资源操作

### 查看资源

```shell
kubectl get pods                   # 获取 Pod 列表
kubectl get deployments            # 获取 Deployment 列表
kubectl get services               # 获取 Service 列表
kubectl get nodes                  # 获取 Node 列表
kubectl get namespaces             # 获取 Namespace 列表
kubectl get ingress                # 获取 Ingress 列表
kubectl get replicasets            # 获取 ReplicaSet 列表
kubectl get statefulsets           # 获取 StatefulSet 列表
kubectl get cronjobs               # 获取 CronJob 列表
kubectl get configmaps             # 获取 ConfigMap 列表
kubectl get secrets                # 获取 Secret 列表
kubectl get pvc                    # 获取 PersistentVolumeClaim 列表
kubectl get pv                     # 获取 PersistentVolume 列表
kubectl get pods -n <namespace>    # 获取指定 Namespace 下的 Pod 列表
kubectl get <resource> -o wide     # 获取资源的详细信息
```

`get` 命令通常用于列出集群中的资源，可以加上 `-n` 来指定命名空间，`-o wide` 用于显示更多详细信息，`-o json` 或 `-o yaml` 可输出为 JSON 或 YAML 格式。

### 查看资源详情

```shell
kubectl describe pod <pod-name>             # 获取 Pod 的详细信息
kubectl describe deployment <deployment-name>   # 获取 Deployment 的详细信息
kubectl describe service <service-name>         # 获取 Service 的详细信息
kubectl describe node <node-name>               # 获取 Node 的详细信息
kubectl describe pvc <pvc-name>                # 获取 PersistentVolumeClaim 的详细信息
kubectl describe ingress <ingress-name>         # 获取 Ingress 的详细信息
```

`describe` 命令用于获取某个具体资源的详细信息，提供更多关于资源的事件、状态、配置等。



### 创建资源

```shell
kubectl apply -f <file>.yaml           # 使用 YAML 文件创建或更新资源
kubectl create -f <file>.yaml          # 使用 YAML 文件创建资源
kubectl create deployment <name> --image=<image>   # 创建 Deployment
kubectl create service clusterip <name> --tcp=<port>:<port>  # 创建 Service
kubectl create configmap <name> --from-file=<file-path>  # 创建 ConfigMap
kubectl create secret generic <name> --from-literal=<key>=<value>  # 创建 Secret
```

`apply` 和 `create` 命令用于通过 YAML 文件或命令行直接创建资源。`apply` 支持资源的更新，而 `create` 通常用于创建新资源。

### 更新资源

```shell
kubectl set image deployment/<deployment-name> <container-name>=<new-image>    # 更新 Deployment 中的容器镜像
kubectl patch deployment <deployment-name> -p '{"spec":{"replicas":<number>}}'  # 更新 Deployment 的副本数
kubectl apply -f <file>.yaml    # 使用更新后的 YAML 文件更新资源
```

### 删除资源

```shell
$ kubectl delete pod <pod-name>            # 删除 Pod
$ kubectl delete deployment <deployment-name>    # 删除 Deployment
$ kubectl delete service <service-name>        # 删除 Service
$ kubectl delete pvc <pvc-name>            # 删除 PersistentVolumeClaim
$ kubectl delete -f <file>.yaml             # 根据 YAML 文件删除资源
$ kubectl delete pod --all                 # 删除所有 Pod

# 删除 pod.json 文件中定义的类型和名称的 pod
$ kubectl delete -f ./pod.json   

# 删除名为“baz”的 pod 和名为“foo”的 service
$ kubectl delete pod,service baz foo

# 删除具有 name=myLabel 标签的 pod 和 serivce
$ kubectl delete pods,services -l name=myLabel  

# 删除具有 name=myLabel 标签的 pod 和 service，包括尚未初始化的
$ kubectl delete pods,services -l name=myLabel --include-uninitialized   

# 删除 my-ns namespace 下的所有 pod 和 serivce，包括尚未初始化的
$ kubectl -n my-ns delete po,svc --all                                      
```

`delete` 命令用于删除指定的资源，可以使用 `-f` 来基于文件删除，也可以通过 `--all` 删除所有相应类型的资源。

### 修补资源

```shell
$ kubectl patch node k8s-node-1 -p '{"spec":{"unschedulable":true}}' # 部分更新节点

# 更新容器镜像； spec.containers[*].name 是必须的，因为这是合并的关键字
$ kubectl patch pod valid-pod -p '{"spec":{"containers":[{"name":"kubernetes-serve-hostname","image":"new image"}]}}'

# 使用具有位置数组的 json 补丁更新容器镜像
$ kubectl patch pod valid-pod --type='json' -p='[{"op": "replace", "path": "/spec/containers/0/image", "value":"new image"}]'

# 使用具有位置数组的 json 补丁禁用 deployment 的 livenessProbe
$ kubectl patch deployment valid-deployment  --type json   -p='[{"op": "remove", "path": "/spec/template/spec/containers/0/livenessProbe"}]'
```

### 编辑资源

```shell
$ kubectl edit svc/docker-registry                      # 编辑名为 docker-registry 的 service
$ KUBE_EDITOR="nano" kubectl edit svc/docker-registry   # 使用其它编辑器

```

### 资源拓展与缩容

```shell
$ kubectl scale deployment <deployment-name> --replicas=<number>   # 缩放 Deployment 副本数
$ kubectl autoscale deployment <deployment-name> --min=<min> --max=<max> --cpu-percent=<cpu>   # 自动扩展 Deployment

$ kubectl scale --replicas=3 rs/foo                                 # Scale a replicaset named 'foo' to 3
$ kubectl scale --replicas=3 -f foo.yaml                            # Scale a resource specified in "foo.yaml" to 3
$ kubectl scale --current-replicas=2 --replicas=3 deployment/mysql  # If the deployment named mysql's current size is 2, scale mysql to 3
$ kubectl scale --replicas=5 rc/foo rc/bar rc/baz                   # Scale multiple replication controllers
```

`scale` 命令用来手动调整 Deployment 的副本数，`autoscale` 设置基于资源使用量的自动扩展。

### 执行操作（对资源进行交互式操作）

```shell
kubectl exec -it <pod-name> -- /bin/bash    # 进入 Pod 内部并打开 bash
kubectl exec -it <pod-name> -- <command>    # 在 Pod 内部执行命令
kubectl logs <pod-name>                      # 查看 Pod 的日志
kubectl logs -f <pod-name>                   # 实时查看 Pod 的日志
kubectl logs <pod-name> -c <container-name>  # 查看特定容器的日志
```

`exec` 用于在 Pod 中执行命令，`logs` 用于查看 Pod 中的日志，`-f` 用于实时查看日志。

### 资源的重启与滚动更新

```shell
kubectl rollout restart deployment <deployment-name>  # 重启 Deployment
kubectl rollout status deployment <deployment-name>   # 查看 Deployment 的滚动更新状态
kubectl rollout history deployment <deployment-name>  # 查看 Deployment 的历史版本
```

`rollout` 命令用于管理 Deployment 的滚动更新，如重启、查看更新状态或历史。

### 访问资源

```shell
kubectl port-forward pod/<pod-name> <local-port>:<remote-port>  # 将 Pod 的端口转发到本地端口
kubectl expose pod <pod-name> --port=<port> --name=<service-name>    # 创建 Service 暴露 Pod
kubectl proxy                      # 启动代理服务器，通过 HTTP 访问 Kubernetes API
```

`port-forward` 用于将 Pod 的端口映射到本地，`expose` 用于暴露 Pod 或其他资源为 Service。

### 其他常用命令

```shell
kubectl top pod                      # 查看 Pod 的资源使用情况（需要 metrics-server）
kubectl top node                     # 查看 Node 的资源使用情况（需要 metrics-server）
kubectl api-resources                # 列出所有可用的资源类型
kubectl explain <resource>            # 解释某个资源的结构和用法


# run 是快速创建资源（如 Pod 或 Deployment）的一种方式，它是创建资源（Creation）类型的命令。这个命令创建的 Pod 默认不会绑定到 YAML 文件，因此不支持后续的 apply 更新方式，更多适用于简单的测试场景。
kubectl run <pod-name> --image=<image>           # 创建一个 Pod
kubectl run <deployment-name> --image=<image> --replicas=<number>  # 创建一个 Deployment
kubectl run <pod-name> --image=<image> --port=<port>           # 创建 Pod 并暴露端口
kubectl run <deployment-name> --image=<image> --env=<key>=<value>  # 设置环境变量


# replace 命令用于根据提供的 YAML 文件完全替换指定的资源。它会删除当前的资源并创建一个新的。
kubectl replace -f <file>.yaml        # 使用 YAML 文件替换资源
kubectl replace deployment <deployment-name> --image=<new-image>   # 替换 Deployment 的容器镜像


# label 命令用于为资源添加或修改标签。标签用于标识资源并进行选择操作。
kubectl label pods <pod-name> <key>=<value>          # 为 Pod 添加标签
kubectl label deployment <deployment-name> <key>=<value>   # 为 Deployment 添加标签
kubectl label nodes <node-name> <key>=<value>        # 为 Node 添加标签
kubectl label pods --all <key>=<value>               # 为所有 Pod 添加标签


# annotate 命令用于给资源添加或修改注解。注解通常用于存储非标识性的元数据，适合用于配置、版本信息、描述等。
kubectl annotate pod <pod-name> <key>=<value>          # 为 Pod 添加注解
kubectl annotate deployment <deployment-name> <key>=<value>    # 为 Deployment 添加注解
kubectl annotate node <node-name> <key>=<value>        # 为 Node 添加注解
kubectl annotate pods --all <key>=<value>              # 为所有 Pod 添加注解

```

## Pod 与集群

### 与运行的 Pod 交互

```shell
$ kubectl logs my-pod                                 # dump 输出 pod 的日志（stdout）
$ kubectl logs my-pod -c my-container                 # dump 输出 pod 中容器的日志（stdout，pod 中有多个容器的情况下使用）
$ kubectl logs -f my-pod                              # 流式输出 pod 的日志（stdout）
$ kubectl logs -f my-pod -c my-container              # 流式输出 pod 中容器的日志（stdout，pod 中有多个容器的情况下使用）
$ kubectl run -i --tty busybox --image=busybox -- sh  # 交互式 shell 的方式运行 pod
$ kubectl attach my-pod -i                            # 连接到运行中的容器
$ kubectl port-forward my-pod 5000:6000               # 转发 pod 中的 6000 端口到本地的 5000 端口
$ kubectl exec my-pod -- ls /                         # 在已存在的容器中执行命令（只有一个容器的情况下）
$ kubectl exec my-pod -c my-container -- ls /         # 在已存在的容器中执行命令（pod 中有多个容器的情况下）
$ kubectl top pod POD_NAME --containers               # 显示指定 pod 和容器的指标度量
```

### 与节点和集群交互

```shell
$ kubectl cordon my-node                                                # 标记 my-node 不可调度
$ kubectl drain my-node                                                 # 清空 my-node 以待维护
$ kubectl uncordon my-node                                              # 标记 my-node 可调度
$ kubectl top node my-node                                              # 显示 my-node 的指标度量
$ kubectl cluster-info                                                  # 显示 master 和服务的地址
$ kubectl cluster-info dump                                             # 将当前集群状态输出到 stdout                                    
$ kubectl cluster-info dump --output-directory=/path/to/cluster-state   # 将当前集群状态输出到 /path/to/cluster-state

# 如果该键和影响的污点（taint）已存在，则使用指定的值替换
$ kubectl taint nodes foo dedicated=special-user:NoSchedule
```

## 格式化输出

- 输出 json 格式
  - -o json
- 仅打印资源名称
  - -o name
- 以纯文本格式输出所有信息
  - -o wide
- 输出 yaml 格式
  - -o yaml
