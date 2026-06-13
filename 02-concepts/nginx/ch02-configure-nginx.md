# Install and configure NGINX

## The NGINX command line interface

Check status 
`systemctl nginx status`

Start nginx
`systemctl start nginx`

Reload nginx
`systemctl start nginx`
or
`ngixn -s reload`

## NGINX files

Config files is in `/etc/nginx`

## Inside nginx.conf

One directive per line

Block directive has {}

```
events {
    ...
}
```

Inlcude directives `inlucde /etc/nginx/conf.d/*.conf`

## Configgure a virtual host

NGINX can serve multple site from same IP address
