---
title: "Let's Encrypt DNS challenge with acme.sh and CloudFlare"
excerpt: "Get signed SSL certificates using Let's Encrypt. Using DNS challenge with the `acme.sh` script as proof of ownership you do not even need to expose a server to the public internet!"
tags:
  - Let's Encrypt
  - CloudFlare
comments: false
comments_locked: false
published: true
last_modified_at: 2017-04-20T19:16:24
toc: false
---
I wrote a small blog [post](/code/free-ssl-certificate-lets-encrypt/) about getting free SSL certificates using Let's Encrypt. It required outside access for the validations process to work. But now I needed SSL certificates for my local services without public access, this turned out to be very easy using [acme.sh](https://github.com/Neilpang/acme.sh) DNS challenge and CloudFlare DNS.

First we install it. Notice that I do this as root.
```terminal
#curl https://get.acme.sh | sh
```

Then we export two variables needed for the CloudFlare DNS challenge to work. Replace `your@mail.com` and `edfgdfgdfgd` with your own values from CloudFlare.
```terminal
#export CF_Key="edfgdfgdfgd"
#export CF_Email="your@mail.com"
```

Finally we request the certificate. Replace `yourdomain.com` with your own domain.
```terminal
#cd ~/.acme.sh
#./acme.sh --issue --dns dns_cf -d yourdomain.com
```

This also sets up a cronjob to automatically renew the certificate, you can do an `crontab -e` to see it.
Now that we have a certificate, we can use the same script to install it to a webserver, e.g. NGINX. Again, replace `yourdomain.com` with your own domain and make sure the `key-file` and `fullchain-file` matches that of your NGINX configuration.
```terminal
#./acme.sh --install-cert -d yourdomain.com \
--cert-file /etc/nginx/ssl/yourdomain.com.cer \
--key-file /etc/nginx/ssl/yourdomain.com.key  \
--fullchain-file /etc/nginx/ssl/fullchain.cer \
--reloadcmd "service nginx force-reload"
```

Thats it! Now you have an automatically renewable SSL certificate that works on local networks that are not accessible from the internet.
