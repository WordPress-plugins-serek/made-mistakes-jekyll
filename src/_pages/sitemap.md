---
layout: page
permalink: /sitemap/
title: "Sitemap"
excerpt: "An index of all the pages found on odd-one-out.serek.eu"
last_modified_at: 2018-11-27T16:00:24-05:00
---

A complete list of sections and pages found on the site. For you robots out there, here is an [XML version](/sitemap.xml) available for your crawling pleasure.

## Pages

- [About](/about/)
- [Support](/support/)
- [Tag index](/tag/)
- [Terms & policies](/terms/)

## [Projects](/projects/)

<ul>
  {% for post in site.categories.projects %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Code](/code/)

<ul>
  {% for post in site.categories.code %}
    {% include post-list.html %}
  {% endfor %}
</ul>

## [Reviews](/reviews/)

<ul>
  {% for post in site.categories.reviews %}
    {% include post-list.html %}
  {% endfor %}
</ul>
