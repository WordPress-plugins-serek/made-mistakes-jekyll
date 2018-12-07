---
title: "ESP8266 NodeMCU - OLED display using SPI"
excerpt: "ESP8266 NodeMCU - OLED display using SPI"
image:
  path: &image "/assets/images/esp8266-nodemcu-oled-display-spi-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/esp8266-nodemcu-oled-display-spi-feature-th.jpg"
  teaser: *image
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: false
comments_locked: false
published: true
last_modified_at: 2016-04-16T21:19:17
toc: true
---
I bought a $4 1 inch OLED SPI display that I wanted to use with my ESP8266 development board. By using an online [service](http://nodemcu-build.com) to create a streamlined NodeMCU firmware this was a breeze!

## NodeMCU with the correct modules
Flash the ESP8266 with a version of NodeMCU that contains the following modules:

* bit
* SPI
* U8G

Follow my post [here](/projects/esp8266-nodemcu-dht22-custom-modules-firmware/) on how to built a custom NodeMCU firmware the easy way!

{% figure caption:"Custom NodeMCU build for OLED SPI displays" %}
![](/assets/images/esp8266-nodemcu-oled-display-spi-modules.png)
{% endfigure %}

If you need help flashing the firmware you can take a look at my guide [here](/projects/esp8266-development-kit-nodemcu-firmware-update-os-x/).

## Parts
If you don't mind waiting a few weeks I would recommend buying from AliExpress as I have done for the lowest price and free shipping, even to Europe! Amazon, even with Amazon Prime is just a bit too expensive.

{% include affiliate-disclosure.html %}

| Part                 | Ali Express             | Amazon               |
|-------------         |----------------         |-----------           |
|1x [ESP8266 development board](https://www.amazon.com/dp/B010O1G1ES/){:rel="nofollow" data-amazon-asin="[us]B010O1G1ES[ca]B019FBLEYU[uk]B010N1SPRK[de]B0182JOWOK[es][it][fr]"}|[$4.2](https://www.aliexpress.com/item/V2-4M-4FLASH-NodeMcu-Lua-WIFI-Networking-development-board-Based-ESP8266/32448662166.html){:rel="nofollow"}|[$9](https://www.amazon.com/dp/B010O1G1ES/){:rel="nofollow" data-amazon-asin="[us]B010O1G1ES[ca]B019FBLEYU[uk]B010N1SPRK[de]B0182JOWOK[es][it][fr]"}|
|1x [0.96 inch 128X64 OLED SPI module](https://www.amazon.com/dp/B01KFSXMR4/){:rel="nofollow" data-amazon-asin="[us]B01KFSXMR4[uk][it][fr]B01KUF1CDS[de][es]B010B1UPDE"}| [$4.1](https://www.aliexpress.com/item/0-96-blue-0-96-inch-OLED-module-New-128X64-OLED-LCD-LED-Display-Module-For/32595649930.html){:rel="nofollow"}| [$10.7](https://www.amazon.com/dp/B01KFSXMR4/){:rel="nofollow" data-amazon-asin="[us]B01KFSXMR4[uk][it][fr]B01KUF1CDS[de][es]B010B1UPDE"}|
|1x [breadboard](https://www.amazon.com/dp/B0084A7PI8/){:rel="nofollow" data-amazon-asin="[us][ca][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS"}|[$1.2](https://www.aliexpress.com/item/1pcs-Quality-mini-bread-board-breadboard-8-5CM-x-5-5CM-400-holes-For-expansion-arduino/1906352269.html){:el="nofollow"}|[$5.2](https://www.amazon.com/dp/B0084A7PI8/){:rel="nofollow" data-amazon-asin="[us][ca][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS"}|
|1x [10K resistor](https://www.amazon.com/dp/B00B5RJF1M/){:rel="nofollow" data-amazon-asin="[us]B00B5RJF1M[ca]B0087ZDSV8[uk]B004S0XA1O[de]B00IYUWT2A[es][it][fr]"}|[$0.7](https://www.aliexpress.com/item/100pcs-10k-ohm-1-4W-10k-Metal-Film-Resistor-10kohm-0-25W-1-ROHS/32577051768.html){:rel="nofollow"}|[$4.9](https://www.amazon.com/dp/B00B5RJF1M/){:rel="nofollow" data-amazon-asin="[us]B00B5RJF1M[ca]B0087ZDSV8[uk]B004S0XA1O[de]B00IYUWT2A[es][it][fr]"}|
|[Various breadboard wires](https://www.amazon.com/dp/B014JOV4TI/){:rel="nofollow" data-amazon-asin="[us]B014JOV4TI[ca]B0002H7AIQ[uk]B01B7M5S6K[de]B01B4HO30K[es]B01GQOJY7I[it]B01GZ2LP82[fr]B01IX7WMAM"}|[$2.6](https://www.aliexpress.com/af/breadboard%25252dwires.html?SearchText=breadboard+wires&blanktest=0&origin=n&jump=afs){:rel="nofollow"}|[$5.9](https://www.amazon.com/dp/B014JOV4TI/){:rel="nofollow" data-amazon-asin="[us]B014JOV4TI[ca]B0002H7AIQ[uk]B01B7M5S6K[de]B01B4HO30K[es]B01GQOJY7I[it]B01GZ2LP82[fr]B01IX7WMAM"}|
|**Total**|$12.8|$35.7|

## Hardware setup
{% figure caption:"Connecting an inexpensive OLED display using SPI" %}
![](/assets/images/esp8266-nodemcu-oled-display-spi-fritzing.png)
{% endfigure %}

## Code
To get started I cheated a bit and used the test code from the U8G library from Github [here](https://github.com/nodemcu/nodemcu-firmware/tree/master/lua_examples/u8glib). I downloaded the file [u8g_graphics_test.lua](https://github.com/nodemcu/nodemcu-firmware/blob/master/lua_examples/u8glib/u8g_graphics_test.lua) and changed line 158 to
```lua
--init_i2c_display()
```

and line 159 to

```lua
init_spi_display()
```

Then I renamed the file to `init.lua` and uploaded the file to the ESP8266. The modified file can also be copied from here:
{% highlight lua linenos %}
-- ***************************************************************************
-- Graphics Test
--
-- This script executes several features of u8glib to test their Lua bindings.
--
-- Note: It is prepared for SSD1306-based displays. Select your connectivity
--       type by calling either init_i2c_display() or init_spi_display() at
--       the bottom of this file.
--
-- ***************************************************************************

-- setup I2c and connect display
function init_i2c_display()
    -- SDA and SCL can be assigned freely to available GPIOs
    local sda = 5 -- GPIO14
    local scl = 6 -- GPIO12
    local sla = 0x3c
    i2c.setup(0, sda, scl, i2c.SLOW)
    disp = u8g.ssd1306_128x64_i2c(sla)
end

-- setup SPI and connect display
function init_spi_display()
    -- Hardware SPI CLK  = GPIO14
    -- Hardware SPI MOSI = GPIO13
    -- Hardware SPI MISO = GPIO12 (not used)
    -- CS, D/C, and RES can be assigned freely to available GPIOs
    local cs  = 8 -- GPIO15, pull-down 10k to GND
    local dc  = 4 -- GPIO2
    local res = 0 -- GPIO16

    spi.setup(1, spi.MASTER, spi.CPOL_LOW, spi.CPHA_LOW, 8, 8)
    disp = u8g.ssd1306_128x64_hw_spi(cs, dc, res)
end


-- graphic test components
function prepare()
    disp:setFont(u8g.font_6x10)
    disp:setFontRefHeightExtendedText()
    disp:setDefaultForegroundColor()
    disp:setFontPosTop()
end

function box_frame(a)
    disp:drawStr(0, 0, "drawBox")
    disp:drawBox(5, 10, 20, 10)
    disp:drawBox(10+a, 15, 30, 7)
    disp:drawStr(0, 30, "drawFrame")
    disp:drawFrame(5, 10+30, 20, 10)
    disp:drawFrame(10+a, 15+30, 30, 7)
end

function disc_circle(a)
    disp:drawStr(0, 0, "drawDisc")
    disp:drawDisc(10, 18, 9)
    disp:drawDisc(24+a, 16, 7)
    disp:drawStr(0, 30, "drawCircle")
    disp:drawCircle(10, 18+30, 9)
    disp:drawCircle(24+a, 16+30, 7)
end

function r_frame(a)
    disp:drawStr(0, 0, "drawRFrame/Box")
    disp:drawRFrame(5, 10, 40, 30, a+1)
    disp:drawRBox(50, 10, 25, 40, a+1)
end

function stringtest(a)
    disp:drawStr(30+a, 31, " 0")
    disp:drawStr90(30, 31+a, " 90")
    disp:drawStr180(30-a, 31, " 180")
    disp:drawStr270(30, 31-a, " 270")
end

function line(a)
    disp:drawStr(0, 0, "drawLine")
    disp:drawLine(7+a, 10, 40, 55)
    disp:drawLine(7+a*2, 10, 60, 55)
    disp:drawLine(7+a*3, 10, 80, 55)
    disp:drawLine(7+a*4, 10, 100, 55)
end

function triangle(a)
    local offset = a
    disp:drawStr(0, 0, "drawTriangle")
    disp:drawTriangle(14,7, 45,30, 10,40)
    disp:drawTriangle(14+offset,7-offset, 45+offset,30-offset, 57+offset,10-offset)
    disp:drawTriangle(57+offset*2,10, 45+offset*2,30, 86+offset*2,53)
    disp:drawTriangle(10+offset,40+offset, 45+offset,30+offset, 86+offset,53+offset)
end

function ascii_1()
    local x, y, s
    disp:drawStr(0, 0, "ASCII page 1")
    for y = 0, 5, 1 do
        for x = 0, 15, 1 do
            s = y*16 + x + 32
            disp:drawStr(x*7, y*10+10, string.char(s))
        end
    end
end

function extra_page(a)
    disp:drawStr(0, 12, "setScale2x2")
    disp:setScale2x2()
    disp:drawStr(0, 6+a, "setScale2x2")
    disp:undoScale()
end


-- the draw() routine
function draw(draw_state)
    local component = bit.rshift(draw_state, 3)

    prepare()

    if (component == 0) then
        box_frame(bit.band(draw_state, 7))
    elseif (component == 1) then
        disc_circle(bit.band(draw_state, 7))
    elseif (component == 2) then
        r_frame(bit.band(draw_state, 7))
    elseif (component == 3) then
        stringtest(bit.band(draw_state, 7))
    elseif (component == 4) then
        line(bit.band(draw_state, 7))
    elseif (component == 5) then
        triangle(bit.band(draw_state, 7))
    elseif (component == 6) then
        ascii_1()
    elseif (component == 7) then
        extra_page(bit.band(draw_state, 7))
    end
end

function graphics_test()

    disp:firstPage()
    repeat
        draw(draw_state)
    until disp:nextPage() == false

    if (draw_state <= 7 + 8*8) then
        draw_state = draw_state + 1
    else
        print("--- Restarting Graphics Test ---")
        draw_state = 0
    end

    print("Heap: " .. node.heap())
    -- retrigger timer to give room for system housekeeping
    tmr.start(0)
end

draw_state = 0

--init_i2c_display()
init_spi_display()

-- set up timer 0 with short interval, will be retriggered in graphics_test()
tmr.register(0, 100, tmr.ALARM_SEMI, function() graphics_test() end)

print("--- Starting Graphics Test ---")
tmr.start(0)
{% endhighlight %}

## Result
{% figure caption:"Running the U8G test program" %}
![](/assets/images/esp8266-nodemcu-oled-display-spi-final.jpg)
{% endfigure %}

{% youtube 1RrZqFnIecY %}

Everything works and from here it is just a matter on using the U8G library to show what you need. Take a look at the NodeMCU U8G documentation [here](https://nodemcu.readthedocs.org/en/dev/en/modules/u8g/).
