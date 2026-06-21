# Reverse Proxies and Load Balancing

Reverse Proxies and Load Balancers are very similar functions.

Reverse Proxies: one backend server

Load Balancer: multiple backend servers and has reverse proxie's ability.

If client has login in one server, the next time route to differenet server. The client must log in again.
That is bad, instead session persistence routes all connections

## Configure NGINX as a reverse proxy

The upstream directive
Defines group of servers that can be referenced by other directives

```
upstream example {
    server a.example.com:8001;
    server b.example.com:8002;
}
```

upstream is defined in http context so it can be used in location context

Let configure a reverse proxy
First define the upstream, a good practice name for upstream is in format <app_name>_<port>

```
upstream app_server_7001 {
    server 127.0.0.1:7001;
}
```

Second, use the upstream

```
# a location to proxy requests to the upstream named 'app_server_7001'
location /proxy {
    proxy_pass http://app_server_7001/;

    access_log /var/log/nginx/binaryville.local.proxy.access.log;
    error_log /var/log/nginx/binaryville.local.proxy.error.log;
}
```

## Configure NGINX as a load balencer

Load halacing methods
- Round-robin (default)
- Least connections
- IP hasing
- Weight