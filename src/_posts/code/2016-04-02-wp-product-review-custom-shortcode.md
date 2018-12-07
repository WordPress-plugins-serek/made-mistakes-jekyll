---
title: "WP Product Review custom shortcode"
excerpt: "WP Product Review custom shortcode"
image:
  path: &image "/assets/images/wp-product-review-custom-shortcode-feature.png"
  feature: *image
  thumbnail: "/assets/images/wp-product-review-custom-shortcode-feature-th.png"
  teaser: *image
tags:
  - WordPress
  - PHP
comments: false
comments_locked: true
published: true
last_modified_at: 2016-04-02T19:45:05
toc: true
---
I am preparing to write reviews on my blog and stumbled on the [WP Product Review](https://wordpress.org/plugins/wp-product-review/) plugin for Wordpress which seemed like a perfect fit. However, when I inserted the review box at the end of my posts, it was placed below my social share buttons.

{% figure caption:"WP Product Review inserted after the social share buttons. This is not what I want!" %}
![](/assets/images/wp-product-review-custom-shortcode-before-links.png)
{% endfigure %}

To place the box above my social share links I have two options:

1. Purchase the [single review shortcode addon](http://themeisle.com/plugins/wppr-single-review-shortcode/) for 20 USD or get the [pro edition](http://themeisle.com/plugins/wp-product-review-pro-add-on/) for 75 USD to get the shortcode functionality. This shortcode can be used at the very end of my post to insert the review box before my social links, e.g. `[P_REVIEW post_id=3067 visual='full']`
2. Use PHP just before my social links get inserted, e.g., `<?php echo cwppos_show_review('postid'); ?>`

I didn't feel like paying 20 USD just to get the shortcode functionality so I used option two to create a custom shortcode for WP Product Review. This is just some basic functionality to place the review box where I want, it does not offer the full functionality of the purchased add-on / pro version.

## Custom shortcode
Add this code to your `functions.php` file in your child theme:

{% highlight php linenos %}
function product_review_shortcode( $atts ) {
    extract( shortcode_atts(
        array(
            'post_id' => get_the_ID(),
        ), $atts )
    );
    if (is_numeric($post_id)) {
        return cwppos_show_review($post_id);
    } else {
        return "Post_id is not a number: ".$post_id;
    }
}
add_shortcode( 'product_review', 'product_review_shortcode' );
{% endhighlight %}

Then configure WP Product Review to place the review box "Manually". You can now use the shortcode the following ways:

### Display the review box using the current post as post_id
```php
[[product_review]]
```
If the post is not configured as a WP Product Review, it will not show anything.

### Display the review box using a specific post id
```php
[[product_review post_id='1511']]
```

If the id does not point to a valid WP Product Review post it will not show anything. If the ID is not a number, e.g., "123r", then it will write a small "Invalid id" message.

## Custom shortcode v2.0
One last issue I had was that I use Amazon Link shortcodes to generate my affiliate links to Amazon. WP Product Review only supports static links for the optional "buy" buttons at the bottom of the review box. Hence I updated my shortcode function again:

{% highlight php linenos %}
function product_review_shortcode( $atts ) {
    extract( shortcode_atts(
        array(
            'post_id' => get_the_ID(),
            'aff_link_content1' => '',
            'aff_link_content2' => '',
        ), $atts )
    );
    $content = '';
    if (is_numeric($post_id)) {
        $content = cwppos_show_review($post_id);
    } else {
        return "Post_id is not a number: ".$post_id;
    }
    $aff_link_content1 = str_replace('{', '[', $aff_link_content1);
    $aff_link_content1 = str_replace('}', ']', $aff_link_content1);
    $aff_link_content2 = str_replace('{', '[', $aff_link_content2);
    $aff_link_content2 = str_replace('}', ']', $aff_link_content2);
    $cssClass = "affiliate-button";
    if($aff_link_content1 && $aff_link_content2){
        $cssClass .= "2 affiliate-button";
    }
    $content .= "<div style='width: 100%; overflow: hidden;'>";
    if($aff_link_content1){
        $content .= "<div class='".$cssClass."'>".$aff_link_content1."</div>";
    }
    if($aff_link_content2){
        $content .= "<div class='".$cssClass."'>".$aff_link_content2."</div>";
    }
    $content .= "</div>";
    return $content;
}
add_shortcode( 'product_review', 'product_review_shortcode' );
{% endhighlight %}

This adds an additional option to generate up to two "buy" button below the review box. You should disable the built-in ones for every review box where you use my custom shortcode to generate these.

### Display the review box using the current post as post_id and a single button
```php
[[product_review aff_link_content1="{amazon text='Buy from Amazon'&asin{us}=B009BUBF9K}"]]
```
The shortcode `[Amazon text='Buy from Amazon'&asin[us]=B009BUBF9K]` is used to generate the link for the button below the review box. Notice that you need to replace all [] brackets in `aff_link_content1` with curly brackets, the function will replace them again into normal brackets.

### Display the review box using the current post as post_id and two buttons
```php
[[product_review aff_link_content1="{amazon text='Buy from Amazon'&asin{us}=B009BUBF9K}" aff_link_content1="<a href="http://ebay.com" rel="nofollow">Buy from Ebay</a>"]]
```
The same as above, only now we add a second buy button below using plain old html.

## Result
The end result is that the review box is now placed correctly and the "Buy from Amazon" button is created using Amazon Link.

{% figure caption:"WP Product Review inserted before the social share buttons. The \"Buy from Amazon\" button is also generated using another shortcode from a plugin called Amazon Link." %}
![](/assets/images/wp-product-review-custom-shortcode-after-links.png)
{% endfigure %}

Leave a comment if you have any better and simpler ideas!
