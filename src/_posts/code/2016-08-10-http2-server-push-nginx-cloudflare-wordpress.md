---
title: "HTTP/2 Server Push with NGINX, CloudFlare and WordPress"
excerpt: "HTTP/2 Server Push with NGINX, CloudFlare and WordPress"
image:
  path: &image "/assets/images/http2-server-push-nginx-cloudflare-wordpress-http2-server-feature.png"
  feature: *image
  thumbnail: "/assets/images/http2-server-push-nginx-cloudflare-wordpress-http2-server-feature-th.png"
  teaser: *image
tags:
  - WordPress
  - NGINX
  - CloudFlare
comments: false
comments_locked: false
published: true
last_modified_at: 2016-08-10T20:19:02
toc: true
---
With CloudFlare [supporting](https://blog.cloudflare.com/announcing-support-for-http-2-server-push-2/) HTTP/2 and Server Push, we can leverage that by using CloudFlare as a CDN even though NGINX does not support Server Push.

## Setup CloudFlare

1. Login / create an account at [CloudFlare.com](https://www.cloudflare.com)
2. Make sure you use CloudFlares nameservers as your primary nameservers. Your domain must resolve using CloudFlares DNS server
3. Go to DNS settings and create an A record pointing to your WordPress domain, e.g. blog.example.com
4. Make sure to choose "DNS and HTTP proxy (CDN)" and not "DNS only". Every requests to blog.example.com will go through CloudFlare which does its CDN magic. The added bonus is that everything runs under the same address so you save a DNS lookup to e.g. cdn.blog.example.com

## Setup WordPress

1. Make sure to disable your current CDN if using any. Since all traffic goes through CloudFlare now they will now automatically serve your static resources via their CDN network. I am using WP Super Cache for WordPress and it was as simple as unselecting a checkbox.

{% figure caption:"Be sure to disable your traditional CDN. Example shown for WP Super Cache for WordPress." %}
![](/assets/images/http2-server-push-nginx-cloudflare-wordpress-wp-super-cache-cdn.png)
{% endfigure %}

## Setup NGINX

1. NGINX needs to send a link header for each static resource to preload. Identify these using Chromes built-in developer tools.

{% figure caption:"Using Chrome to identify a websites static resources" %}
![](/assets/images/http2-server-push-nginx-cloudflare-wordpress-http2-server-push-none.png)
{% endfigure %}

{:start="2"}
2. For each identified static resource to preload, add an add_header statement to your NGINX server block. Examples are given below for scripts, stylesheets and images.
```terminal
add_header link "</wp-includes/js/jquery/jquery.js>; rel=preload; as=script";
add_header link "</wp-content/themes/twentyfifteen/genericons/genericons.css>; rel=preload; as=styles";
add_header link "</wp-content/uploads/201604/image.jpg>; rel=preload; as=image";
```
3. Restart NGINX, e.g. on Ubuntu type `sudo service nginx restart`

Notice that I could not get my fonts preloaded, if you have a working example of preloading a woff2 font, please leave a comment.

## Test
The best way to confirm everything is working is downloading and installing [Google Chrome Canary](https://www.google.com/chrome/browser/canary.html), the newest bleeding edge Chrome browser. Open developer tools, check `disable cache` and enter your website url. You should now see `Push / ...` in the `Initiator` column for each preloaded resource. If it does work try clearing your browser cache.

{% figure caption:"Example of resources delivered using HTTP/2 Server Push. Notice the difference compared to non Sever Push resources. It cuts about 100 ms from the timeline." %}
![](/assets/images/http2-server-push-nginx-cloudflare-wordpress-http2-server-push.png)
{% endfigure %}

For me I see about 100 ms faster load of the resources I preload, longer if the network is slow. It might not look like much, but with a pageload around 1 second, that is still 10% faster pageload if you can do this for every resource. Or you might just have a single resource or two that takes much longer to load that you could Server Push. If you look closer at the header for the first line, the HTML document, you will see a `f-h2-pushed` header. This header confirms that CloudFlare took all the Link headers we send and pushed them out to the browser, e.g. example from my site:
```terminal
cf-h2-pushed: </wp-includes/js/jquery/jquery.js>,</wp-content/themes/twenty...genericons/genericons.css>,</wp-content/themes/twentyfifteen-child/style.css>,</wp-content/themes/twentyfifteen/style.css>,</wp-includes/js/jquery/jquery-migrate.min.js>,</wp-content/custom/analytics.js>,</wp-content/themes/twenty...js/skip-link-focus-fix.js>,</wp-includes/js/comment-reply.min.js>,</wp-content/themes/twentyfifteen/js/functions.js>,</wp-includes/js/jquery/jquery.form.min.js>,</wp-includes/js/wp-embed.min.js>
```
If you see a link header for each resource you want to preload, CloudFlare did not do its magic.

## Conclusion
An easy way to get a bit faster pageload if you can do this for all your resources or just the one really slow loading resource. It does require that the resources are hosted under your own domain so no external resources and that you use CloudFlare as a DNS and CDN. For now it works best on static resources you know each pageload needs, but for more dynamic content like images it works poorly. There are WordPress plugins for adding the preload tag for images, scripts and stylesheets, these however do not work when serving static html version of PHP pages since the PHP processor is never hit, only the first time. For me that means I need to disable WP Super Cache or just add the headers manually. Googles PageSpeed module for NGINX might at some point be able to handle it dynamic content better.
