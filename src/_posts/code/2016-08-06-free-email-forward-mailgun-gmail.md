---
title: "Free email forward with Mailgun.com"
excerpt: "Free email forward with Mailgun.com"
image:
  path: &image "/assets/images/free-email-forward-mailgun-gmail-feature.png"
  feature: *image
  thumbnail: "/assets/images/free-email-forward-mailgun-gmail-feature-th.png"
  teaser: *image
tags:
  - Mailgun
comments: false
comments_locked: false
published: true
last_modified_at: 2016-08-06T15:45:26
toc: true
---
I recently started moving away from my Danish Domain and DNS provider GratisDNS which charges me about $7.5 per year just for an email forward service which I use to be able to send and receive emails as serek.eu from my gmail account. This can be done for free using [Mailgun.com](https://mailgun.com){:rel="nofollow"}! This includes unlimited incoming mails and 10.000 outgoing mails per month which is more than enough for my needs.

This guide shows how to

* Forward incoming emails to any email address using you own domain (e.g. `user@example.com` --> `user@gmail.com`)
* Send emails from gmail as `user@example.com`

Replace `example.com` and all emails with your own.

## Initial setup

1. Create an account at [Mailgun.com](https://mailgun.com){:rel="nofollow"}.
2. Login to Mailgun.com and click `Add new domain` under `Domains`. Ignore the recommendation to use a subdomain, just add your base domain, e.g. `example.com`.
3. After adding the domain successfully you will be shown a `Now Follow These Steps To Verify Your Domain` page. Follow the instructions to add the two TXT records, two MX records and the CNAME entry to your DNS settings. Remember to remove existing MX settings for the chosen domain that to prevent conflicts.
4. Confirm that the DNS works by going to `Domains` --> Click on your domain --> Click `Domain Verification & DNS` and lastly click `Check DNS Records Now`. It might take a day or two for everything to confirm depending on your existing DNS / TTL settings.

## Setup incoming emails

1. In Mailgun.com go to `Routes` and click `Create route`
2. Configure a mail forward as follows:
  * Expression Type --> `Match recipient`
  * Recipient --> `user@example.com`
  * Action --> Check `Forward` and enter the email to forward to, e.g. `user@gmail.com`
  * Priority --> Set to `10`
  * Description --> Add the same as in `Recipient`
  * Click `Create route`
3. Repeat step 2 for each email forward you want.

{% figure caption:"Example of Mailgun.com routes for email forward" %}
![](/assets/images/free-email-forward-mailgun-gmail-feature.png)
{% endfigure %}

{:start="4"}
4. (Optional) Create a route to catch every mail not caught using `Match recipient`. This will ensure that every possible recipient using `@example.com` will be caught and forwarded.
  * Expression Type --> `Catch All`
  * Action --> Check `Forward` and enter the email to forward to, e.g. `user@gmail.com`
  * Priority --> Set to `99`
  * Description --> `Catch all mailforward`
  * Click `Create route`

Thats it, you can now receive emails on `@example.com`.

## Setup outgoing emails

1. Log into gmail
2. Go to `Settings` --> `Accounts and Import`
3. Go to section `Send mail as` and click `Add another email address that you own`
4. Enter an `@example.com` email address and click `Next Step`
5. Configure the form with information from Mailgun.com --> `Domains` --> `example.com`
  * SMTP Server --> `SMTP Hostname` from Mailgun
  * Port --> `587`
  * Username --> `Default SMTP Login` from Mailgun
  * Password --> `Default Password` from Mailgun
  * Check `Secured connection using TLS`
  * Click `Save Changes`
  {% figure caption:"Example of gmail send as settings using Mailgun.com SMTP settings" %}
  ![](/assets/images/free-email-forward-mailgun-gmail-send-as-settings.png)
  {% endfigure %}

{:start="6"}
6. Repeat step 3 - 5 for each email you would like to be able to send as
7. Go back to `Settings` --> `Accounts and Import` --> `Send mail as`. Choose which email is the default to use when sending mails and which email to use when replying

Thats it! When composing a new email from gmail you now get a dropdownlist in the `From` field where you can choose who to send as.

{% figure caption:"Send email from gmail using your own domain" %}
![](/assets/images/free-email-forward-mailgun-gmail-send-mail-as.png)
{% endfigure %}
