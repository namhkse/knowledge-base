## Additionla NGINX configuration

## Configure location

**Location Directive**
Extends the configuration based on the URI

Locatiion direcectives is in format block and in `server` blocks.

Syntax `localtion [modifier] location_definition {...}`

**Location Modifiers**

Proceed the location definition, control how the definition is interpreted by NGINX

## Configure logs

Access logs
- Time of the request
- Result of the request
- Client IP address
- Client browser

Error logs
- Configuration errors
- Service stops and starts
- Service errors

`/etc/nginx/nginx.conf`

error_log  /var/log/nginx/error.log notice;
access_log  /var/log/nginx/access.log  main;

Contains logs from all sites.
Loggin can aslo be configured in servers and locations

Best pracite use the log file name is sames to the config files.

Custom log in the site

```
server {
    ...
    access_log /var/log/nginx/binaryville.local.access.log
    error_log /var/log/nginx/binaryville.local.error.log
}
```

Custom log in the location `/image`

```
localtion /images {
    ...
    access_log /var/log/nginx/binaryville.local.images.access.log
    error_log /var/log/nginx/binaryville.local.images.error.log
}
```

## Troubleshotting the NGINX

Check for configuration file typos
`nginx -t`

Check nginx status and reload the configuration
`systemctl status nginx`

Check the ports
`sudo lsof -i : 80 -i 443 | grep nginx`
or
`sudo netstat -plan | grep nginx`

Trace the logs
`tail -f /var/logs/nginx/*.log`