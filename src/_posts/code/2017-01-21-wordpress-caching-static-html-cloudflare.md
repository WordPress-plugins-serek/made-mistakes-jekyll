---
title: "Turbocharging WordPress: Caching static HTML with CloudFlare for free"
excerpt: "Caching static WordPress HTML with CloudFlare for free. Faster pageload for served HTML."
image:
  path: &image "/assets/images/wordpress-caching-static-html-cloudflare-feature.png"
  feature: *image
  thumbnail: "/assets/images/wordpress-caching-static-html-cloudflare-feature-th.png"
  teaser: *image
tags:
  - WordPress
  - CloudFlare
comments: false
comments_locked: true
published: true
last_modified_at: 2017-01-21T19:41:16
toc: true
---
I already use CloudFlare as a CDN (content delivery network) to cache my static resources and serve them closer to the visitor. CloudFlare also automatically serves content using HTTP/2 and even allows one to use [Server Push](/code/http2-server-push-nginx-cloudflare-wordpress/) feature to push resources before the browser even has received the HTML page. The last step is to cache everything at CloudFlare - the HTML pages.

## Setup
Disable your existing CDN if you have one and setup CloudFlare CDN as described in my post [here](/code/http2-server-push-nginx-cloudflare-wordpress/). I am using the free tier which limits us to 3 Page Rules to allow us to play with static HTML caching. First we setup a Page Rule to prevent caching of the admin pages of WordPress. Secondly we create a rule to prevent caching of preview pages. Lastly we create a rules to cache everything else. Replace `odd-one-out.serek.eu` with your own domain.

{% figure caption:"Using CloudFlares free tier, we leverage the 3 Page Rules to enable static HTML caching of WordPress pages, except admin and preview pages" %}
![](/assets/images/wordpress-caching-static-html-cloudflare-feature.png)
{% endfigure %}

You can tweak the above Page Rules to your liking, but the most important part in the first two rules are to set `Cache Level` to `Bypass` and the last rule to set `Cache Level` to `Cache Everything`. I also set the `Browser Cache TTL` to the lowest I can and the `Edge Cache TTL` to the highest.

One last problem is that the login page to WordPress is cached, to solve this I use the [Rename wp-login.php](https://wordpress.org/plugins/rename-wp-login/) plugin as recommended by [this](https://blog.thirdechelon.org/2015/05/cloudflare-page-rules-for-wordpress-caching/) post. Make sure the login is renamed to something that begins with `wp-admin` to match the first Page Rule, e.g. `wp-admin-mylogin`.

## Result
The results are amazing, my average page load was around 1.5 seconds before this change, now I am around 0.5 seconds!

{% figure caption:"GTMetrix pageload after static HTML cache using CloudFlare" %}
![](/assets/images/wordpress-caching-static-html-cloudflare-GTMetrix-pageload.png)
{% endfigure %}

My server load has also been reduced dramatically since almost no requests ever hit my server again. In fact, I had to change my [server monitor url](/code/free-wordpress-jetpack-monitor-replacement/) to include `?preview=true` in the request URL since I was receiving a cached version of my page. I did not even notice that my server had been down for several days! But then neither did my visitors.

## Limitations
There are a few limitations to this approach:

1. When updating / changing pages and posts in WordPress I need to manually clear the cache in CloudFlare. There are WordPress plugins to clear the CloudFlare cache automatically, but when I only post once or twice a month it is not a problem
2. I am currently using a geolocation aware cache to serve different content to my visitors based on their location. This does not work perfectly with this type of caching since [CloudFlares POP's](https://www.cloudflare.com/network/) (Point Of Presence) will cache the first request made be the nearest visitor - which could be a different country then the one the POP resides! Then this cached copy will be wrongly served to the next visitor. The way around this is to serve content dynamically, e.g. retrieve the location / country of the visitor using AJAX and modifying the page with javascript.
