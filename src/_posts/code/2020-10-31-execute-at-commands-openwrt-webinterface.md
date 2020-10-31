---
title: "Executing AT commands from OpenWRT webinterface"
excerpt: "Executing AT commands from OpenWRT webinterface"
tags:
  - OpenWRT
comments: false
comments_locked: false
published: true
last_modified_at: 2020-10-31T14:36:06
toc: true
---
I wanted a quick way of executing AT commands to my 4G modem in my OpenWRT router and reading the results. To do this I installed

```terminal
root@OpenWrt:~# opkg update
root@OpenWrt:~# opkg install coreutils-stty
```

Then I created this script, execAT.sh, and added to OpenWRT:

```
#!/bin/sh
# First parameter: Device
# Second parameter: AT command to execute

# Example sh execAT.sh ttyUSB2 at!gstatus?

# set up modem device to translate outgoing \n into \r\n
stty -F /dev/$1 9600 -echo igncr icanon onlcr

# Open modem for reading and writing
exec 5</dev/$1
exec 6>/dev/$1

echo $2 >&6

# Remove the echo and the blank line
read <&5
read <&5

FLAG="GO"
ZeroCounter=0
#READING FROM SERIAL
while [ "${FLAG}" == "GO" ]; do
    read -t 1 RESPONSE <&5
    echo -e "$RESPONSE"

    if [ "${#RESPONSE}" -eq 0 ];
    then
      ZeroCounter=$((ZeroCounter+1))
    else
      ZeroCounter=0 # Reset counter
    fi

    # If we get and OK then quit; or we we get an empty response 3 times in a row
    if [ "${RESPONSE}" == "OK" ] || [ "${ZeroCounter}" == "3" ];
    then
      FLAG="EXIT"
    fi
done

# Close the connections
exec 5<&-
exec 6>&-
```

I tested it from the commandline first:

```
root@OpenWrt:~# chmod +x execAT.sh
root@OpenWrt:~# sh execAT.sh ttyUSB2 ati
Model: EM7455
Revision: SWI9X30C_02.32.11.00 r8042 CARMD-EV-FRMWR2 2019/05/15 21:52:20
MEID: 35399007042761
IMEI: 353990070427617
IMEI SV: 19
FSN: LF611310230210
+GCAP: +CGSM


OK
```

Then I add a plugin to execute shell scripts from the user interface and read the results:

```
root@OpenWrt:~# opkg install luci-app-commands
```

And then I just configure the command in OpewWRT and can execute it directly from the interface and read the response:

{% figure caption:"Using custom commands I can execute AT commands directly from the webinterface of OpenWRT %}
![](/assets/images/execute-at-commands-openwrt-webinterface.png)
{% endfigure %}
