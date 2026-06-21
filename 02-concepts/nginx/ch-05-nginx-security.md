# NGINX security

How can use NGINX to protect your website

## Secure sites with NGINX

- Keep OS and software patched
- Restric access where possible
- Use password to protect sensitive information
- Use TLS/SSL to encrypt transmission

## Allow and deny directives

Can be used in the http, server, and location contexts.
- allow
- deny

Spefifies patterns to match incoming requests
- all
- IP
- CIDR block

Rules are applied in the order they are defined

## Password Authentication

auth_basic
auth_basic_user_file

use in server http, location

```c
location /admin {
    auth_basic "Please authenticate..."
    auth_basic_user_file /etc/nginx/password;
}
```

Use the `htpasswd` program to create and mange password files

## Configure HTTPS

Protect data between servers and clients

SSL deprecated
TSL current method for encrypting

## SSL Certificate

Self-signed certificate best for development and testing.
Broswer wont' be able to identify our website.
Traffic can still be encrypted.

- Create a private key
- Create a certificate
- Sign the cerf with the key

```sh
 openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/ssl/private/nginx.key \
        -out /etc/ssl/certs/nginx.crt
```