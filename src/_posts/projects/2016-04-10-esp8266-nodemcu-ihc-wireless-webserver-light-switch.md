---
title: "ESP8266  Controlling an IHC wireless light switch"
excerpt: "ESP8266  Controlling an IHC wireless light switch"
image:
  path: &image "/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-feature-th.jpg"
  teaser: *image
tags:
  - Internet of things
  - ESP8266
  - NodeMCU
comments: false
comments_locked: false
published: true
last_modified_at: 2016-04-09T22:00:47
toc: true
---
Recently I installed several intelligent IHC Wireless lightswitches and power outlets from Lauritz Knudsen. They can be programmed so that any switch can wirelessly control any other switch or power outlet. I wanted to control these switches using my phone and was left with three options

1. Buy an IHC Wireless Controller for around $750 and try to integrate an ESP8266 to control the switches
2. Try to hack the proprietary IHC Wireless protocol and send the commands directly to the switches using an ESP8266 and a radio transceiver module
3. Modify an IHC Wireless switch so that an ESP8266 can control the buttons directly

Option 1 is too expensive for what I want to do and as far as I know nobody has been able to hack the protocol in option 2. So that left option 3!
I bought a battery powered IHC Wireless switch with a total of 7 buttons. Each lightswitch has one on and one off button. The last button is used to program the switch. This was the cheapest option at around $75. Next I took the switch apart and saw it was a simple matter to activate the 7 small buttons.

{% figure caption:"IHC Wireless battery powered switch, here shown fully assembled, with the button panels of and with the front cover off" class:"gallery-3-col" %}
  [![IHC Wireless battery powered switch](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-front.jpg)](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-front.jpg)
  [![IHC Wireless battery powered switch with the button panels taken off](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-without-button-panels.jpg)](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-without-button-panels.jpg)
  [![IHC Wireless battery powered switch with the front panel off](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-internal.jpg)](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-internal.jpg)
{% endfigure %}

Next I hooked up and ESP8266 development board, a few BC547B transistors, 10K resistors and wires and that was it for the hardware setup.

{% figure caption:"ESP8266 development board controlling button 1 and 2 of the IHC Wireless switch" class:"gallery-2-col" %}
  [![ESP8266 development board controlling button 1 and 2 of the IHC Wireless switch](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-working-prototype.jpg)](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-working-prototype.jpg)
  [![ESP8266 development board controlling button 1 and 2 of the IHC Wireless switch – closeup](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-working-prototype-closeup.jpg)](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-working-prototype-closeup.jpg)
{% endfigure %}

Notice that I have only hooked up two buttons, but the webserver supports up to 7 buttons

## Parts
If you don't mind waiting a few weeks I would recommend buying from AliExpress as I have done for the lowest price and free shipping, even to Europe! I cannot recommend Amazon for parts like these since they are very expensive even with free shipping from Amazon Prime. I have created a table to compare the prices so that people can make up their own mind.

{% include affiliate-disclosure.html %}

| Part			                      | Ali Express	| Amazon      |
|-------------------------------|-------------|-------------|
|1x [ESP8266 development board](https://www.amazon.com/dp/B010O1G1ES/){:rel="nofollow" data-amazon-asin="[us]B010O1G1ES[ca]B019FBLEYU[uk]B010N1SPRK[de]B0182JOWOK[es][it][fr]"}                      |   [$4.2](https://www.aliexpress.com/item/V2-4M-4FLASH-NodeMcu-Lua-WIFI-Networking-development-board-Based-ESP8266/32448662166.html){:rel="nofollow"}                      |  [$9](https://www.amazon.com/dp/B010O1G1ES/){:rel="nofollow" data-amazon-asin="[us]B010O1G1ES[ca]B019FBLEYU[uk]B010N1SPRK[de]B0182JOWOK[es][it][fr]"}     |
| 1x [IHC Wireless switch](http://www.wattoo.dk/lk-ihc-wireless-batteritryk-lk-fuga-6-slutte-hvid-1092001540){:rel="nofollow"}                    | N/A            |  N/A           |
| 1x [breadboard](https://www.amazon.com/dp/B0084A7PI8/){:rel="nofollow" data-amazon-asin="[us][ca][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS"}                      |  [$1.2](https://www.aliexpress.com/item/1pcs-Quality-mini-bread-board-breadboard-8-5CM-x-5-5CM-400-holes-For-expansion-arduino/1906352269.html){:rel="nofollow"}                       | [$5.2](https://www.amazon.com/dp/B0084A7PI8/){:rel="nofollow" data-amazon-asin="[us][ca][es]B0084A7PI8[uk][de]B00JGFDKBQ[it][fr]B00PQC72ZS"}            |
| 1-7x [10K resistor](https://www.amazon.com/dp/B00B5RJF1M/){:rel="nofollow" data-amazon-asin="[us]B00B5RJF1M[ca]B0087ZDSV8[uk]B004S0XA1O[de]B00IYUWT2A[es][it][fr]"} (one for each button you want to control)                   |  [$0.7](https://www.aliexpress.com/item/100pcs-10k-ohm-1-4W-10k-Metal-Film-Resistor-10kohm-0-25W-1-ROHS/32577051768.html){:rel="nofollow"}                       | [$4.9](https://www.amazon.com/dp/B00B5RJF1M/){:rel="nofollow" data-amazon-asin="[us]B00B5RJF1M[ca]B0087ZDSV8[uk]B004S0XA1O[de]B00IYUWT2A[es][it][fr]"}            |
| 1-7x [BC547B transistor](https://www.amazon.com/dp/B00CHTOVU2/){:rel="nofollow" data-amazon-asin="[us]B00CHTOVU2[ca]B01BT93MY6[uk]B00UB2YS5U[de][it][fr]B00Q6WQ14K[es]B01M3R5GE8"} (one for each button you want to control)                    | [$1.1](https://www.aliexpress.com/item/FREE-SHIPPING-50PCS-BC547B-BC547-TO-92-TO92-DIP-NPN-general-purpose-transistors/32328944159.html){:rel="nofollow"}                      | [$5.5](https://www.amazon.com/dp/B00CHTOVU2/){:rel="nofollow" data-amazon-asin="[us]B00CHTOVU2[ca]B01BT93MY6[uk]B00UB2YS5U[de][it][fr]B00Q6WQ14K[es]B01M3R5GE8"}            |
| [Various breadboard wires](https://www.amazon.com/dp/B014JOV4TI/){:rel="nofollow" data-amazon-asin="[us]B014JOV4TI[ca]B0002H7AIQ[uk]B01B7M5S6K[de]B01B4HO30K[es]B01GQOJY7I[it]B01GZ2LP82[fr]B01IX7WMAM"}                      | [$2.6](https://www.aliexpress.com/af/breadboard%25252dwires.html?SearchText=breadboard+wires&blanktest=0&origin=n&jump=afs){:rel="nofollow"}              | [$5.9](https://www.amazon.com/dp/B014JOV4TI/){:rel="nofollow" data-amazon-asin="[us]B014JOV4TI[ca]B0002H7AIQ[uk]B01B7M5S6K[de]B01B4HO30K[es]B01GQOJY7I[it]B01GZ2LP82[fr]B01IX7WMAM"}      |
|**Total**                      | $84.8       | $105.5      |
|**Total without IHC Wireless switch**                      | $9.8       | $30.5      |

## Hardware setup
{% figure caption:"Hardware setup" %}
![](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-fritzing.png)
{% endfigure %}

The two buttons connected by the yellow wires are from the IHC Wireless switch. Other than that the setup is straight forward.

## Code
Upload the following code as `init.lua` to your ESP8266. If you don't know how, take a look at my post [here](/projects/esp8266-nodemcu-getting-started-hello-world/). The most important parameters to configure are:

* `switch*_pin`: Map up to 7 switches to the GPIO of the ESP8266
* `wifi_SSID`: Wifi name
* `wifi_password`: Wifi password
* `client_*`: Optionally set a static ip address, netmask and gateway. If `client_ip` is not set, DHCP will be used

{% highlight lua linenos %}
-- Webserver to control several on / off switches.
-- Idea inspired by: https://www.youtube.com/watch?v=DPVmGG4xifU
-- HTML inspired by: https://github.com/mrkale/NodeMCU-WifiDoubleSwitch

-- Config
switch1_pin = 2 -- Room 1 On
switch2_pin = 1 -- Room 1 Off
switch3_pin = 3 -- Room 2 On
switch4_pin = 3 -- Room 2 Off
switch5_pin = 3 -- Room 3 On
switch6_pin = 3 -- Room 3 Off
switch7_pin = 3 -- Programmable switch

--- WIFI ---
wifi_SSID = "wifi_name"
wifi_password = "wifi_password"
-- wifi.PHYMODE_B 802.11b, More range, Low Transfer rate, More current draw
-- wifi.PHYMODE_G 802.11g, Medium range, Medium transfer rate, Medium current draw
-- wifi.PHYMODE_N 802.11n, Least range, Fast transfer rate, Least current draw
wifi_signal_mode = wifi.PHYMODE_N
-- If the settings below are filled out then the module connects
-- using a static ip address which is faster than DHCP and
-- better for battery life. Blank "" will use DHCP.
-- My own tests show around 1-2 seconds with static ip
-- and 4+ seconds for DHCP
client_ip="192.168.1.111"
client_netmask="255.255.255.0"
client_gateway="192.168.1.1"

-- Connect to the wifi network
wifi.setmode(wifi.STATION)
wifi.setphymode(wifi_signal_mode)
wifi.sta.config(wifi_SSID, wifi_password)
wifi.sta.connect()
if client_ip ~= "" then
    wifi.sta.setip({ip=client_ip,netmask=client_netmask,gateway=client_gateway})
end

-- Connect
tmr.alarm(0, 1000, 1, function()
   if wifi.sta.getip() == nil then
      print("Connecting to AP...\n")
   else
      ip, nm, gw=wifi.sta.getip()
      print("IP address: ",ip)
      tmr.stop(0)

      gpio.mode(switch1_pin, gpio.OUTPUT)
      gpio.mode(switch2_pin, gpio.OUTPUT)
      gpio.mode(switch3_pin, gpio.OUTPUT)
      gpio.mode(switch4_pin, gpio.OUTPUT)
      gpio.mode(switch5_pin, gpio.OUTPUT)
      gpio.mode(switch6_pin, gpio.OUTPUT)
      gpio.mode(switch7_pin, gpio.OUTPUT)
      tmr.start(1)
   end
end)

tmr.alarm(1, 100, 1, function()
    gpio.write(switch1_pin, gpio.LOW)
    gpio.write(switch2_pin, gpio.LOW)
    gpio.write(switch3_pin, gpio.LOW)
    gpio.write(switch4_pin, gpio.LOW)
    gpio.write(switch5_pin, gpio.LOW)
    gpio.write(switch6_pin, gpio.LOW)
    gpio.write(switch7_pin, gpio.LOW)
    tmr.stop(1)
end)

-- Start a simple http server
srv=net.createServer(net.TCP)

srv:listen(80,function(conn)
  conn:on("receive",function(conn,request)
    -- https://github.com/marcoskirsch/nodemcu-httpserver/issues/36#issuecomment-167442461
    -- Some browsers send the POST data in multiple chunks, like Safari on OS X and IOS
    -- Collect data packets until the size of HTTP body meets the Content-Length stated in header
    -- This fixed issues where the webpage was rendered twice after posting data to the server in some browsers
    if request:find("Content%-Length:") or bBodyMissing then
       if fullPayload then fullPayload = fullPayload .. request else fullPayload = request end
       if (tonumber(string.match(fullPayload, "%d+", fullPayload:find("Content%-Length:")+16)) > #fullPayload:sub(fullPayload:find("\r\n\r\n", 1, true)+4, #fullPayload)) then
          bBodyMissing = true
          return
       else
          print("HTTP packet assembled! size: "..#fullPayload)
          request = fullPayload
          fullPayload, bBodyMissing = nil
       end
    end

    -- Handle POST request - switching on and off the various switches
    _, j = string.find(request, 'switch=')
    if j ~= nil then
        command = string.sub(request, j + 1)
        print("Switch "..command.." click")
        gpio.write(tonumber(command), gpio.HIGH)
        tmr.start(1)
    end

    -- Reponse HTTP headers
    conn:send("HTTP/1.1 200 OK\r\n")
    conn:send("Content-Type: text/html\r\n")
    conn:send("Connection: keep-alive\r\n\r\n")

    -- HTML response
    conn:send('<!DOCTYPE html>')
    conn:send('<html lang="en">')
    conn:send(' <head>')
    conn:send('     <meta charset="utf-8" />')
    conn:send('     <title>IHC Wireless</title>')
    conn:send('     <meta http-equiv="X-UA-Compatible" content="IE=edge">')
    conn:send('     <meta name="viewport" content="width=device-width, initial-scale=1">')
    conn:send('     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">')
    conn:send(' </head>')
    conn:send(' <body>')
    conn:send('     <h1 class="hidden-xs text-center">IHC Wireless</h1>')
    conn:send('     <form method="post">')
    conn:send('         <div class="container">')
    conn:send('             <div class="row">')
    conn:send('                 <div class="col-sm-4 col-sm-offset-0">')
    conn:send('                     <h3 class="text-primary text-center">Kitchen</h3>')
    conn:send('                     <button class="btn btn-block btn-lg btn-success" role="button" type="submit" name="switch" value="'..switch1_pin..'">On</>')
    conn:send('                     <button class="btn btn-block btn-lg btn-danger" role="button" type="submit" name="switch" value="'..switch2_pin..'">Off</>')
    conn:send('                 </div>')
    conn:send('                 <div class="col-sm-4 col-sm-offset-0">')
    conn:send('                     <h3 class="text-primary text-center">Living room</h3>')
    conn:send('                     <button class="btn btn-block btn-lg btn-success" role="button" type="submit" name="switch" value="'..switch3_pin..'">On</>')
    conn:send('                     <button class="btn btn-block btn-lg btn-danger" role="button" type="submit" name="switch" value="'..switch4_pin..'">Off</>')
    conn:send('                 </div>')
    conn:send('                 <div class="col-sm-4 col-sm-offset-0">')
    conn:send('                     <h3 class="text-primary text-center">Bedroom</h3>')
    conn:send('                     <button class="btn btn-block btn-lg btn-success" role="button" type="submit" name="switch" value="'..switch5_pin..'">On</>')
    conn:send('                     <button class="btn btn-block btn-lg btn-danger" role="button" type="submit" name="switch" value="'..switch6_pin..'">Off</>')
    conn:send('                 </div>')
    conn:send('             </div>')
    conn:send('             <div class="row">')
    conn:send('                 <div class="col-sm-4 col-sm-offset-4">')
    conn:send('                     <h3 class="text-primary text-center">Setup</h3>')
    conn:send('                     <button class="btn btn-block btn-lg btn-warning" role="button" type="submit" name="switch" value="'..switch7_pin..'">Program</>')
    conn:send('                 </div>')
    conn:send('             </div>')
    conn:send('         </div>')
    conn:send('     </form>')
    conn:send(' </body>')
    conn:send('</html>')
  end)

  conn:on("sent",function(conn)
    conn:close()
  end)
end)
{% endhighlight %}

## Results
With all connected and up and running, the browser should be accessible from the IP address specified in `client_ip` or assigned from DHCP. The site is fully responsive so it looks nice on any device.

{% figure caption:"Desktop browser" %}
![](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-desktop-browser.png)
{% endfigure %}

{% figure caption:"Mobile device" class:"gallery-2-col center" %}
![](/assets/images/esp8266-nodemcu-ihc-wireless-webserver-light-switch-mobile-browser.png)
{% endfigure %}

And the most important part, it actually works!

{% youtube 2Lpl3N411eA %}

Connecting to the ESP8266 using the serial ports shows the following output:

{% highlight terminal %}
NodeMCU custom build by frightanic.com
	branch: dev
	commit: 093a895980fbd4ab8b3ebedcd6efe36e26419887
	SSL: true
	modules: node,file,gpio,wifi,net,tmr,adc,mqtt,dht
 	built on: 2015-10-13 18:26
  powered by Lua 5.1.4
> IP address: 	192.168.1.111
Switch 1 click
Switch 2 click
{% endhighlight %}

## Whats next?

* Hook up the remaining buttons to the ESP8266
* Solder all the wires and hide the whole thing in a case
* Power the IHC Wireless switch using the ESP8266. It currently uses an 3V CR2022 coin cell battery and the ESP8266 development board uses 3.3V so it should be possible
