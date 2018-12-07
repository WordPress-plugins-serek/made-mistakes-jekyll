---
title: "Using OpenVPN client with Ubuntu 16.04 server"
excerpt: "Using OpenVPN client with Ubuntu 16.04 server"
tags:
  - VPS
  - VPN
  - Ubuntu
comments: false
comments_locked: false
published: true
last_modified_at: 2017-05-31T14:36:06
toc: true
---
The post will show you how to setup a headless linux server using Ubuntu 16.04 LTS and only allowing outgoing connections using a secure VPN [^vpn] connection with OpenVPN. If the VPN connection fails, no traffic is leaked. I will be using NordVPN as an example VPN provider since it is what I use myself, but any VPN provider with OpenVPN profiles should work.

## VPN setup
First we install the OpenVPN client and required dependencies as described at NordVPN [guide](https://nordvpn.com/tutorials/linux/openvpn/):
```terminal
$sudo apt install openvpn unzip ca-certificates
```

Next we download and unzip the OpenVPN configuration files:
```terminal
$cd /etc/openvpn
$sudo wget https://nordvpn.com/api/files/zip
$sudo unzip zip
$sudo rm zip
```

Now we can connect to a server. To see a list of all servers available, do a `ls -al` from `/etc/openvpn`. Choose one of these files, e.g.
```terminal
$sudo openvpn at1.nordvpn.com.udp1194.ovpn
```

And enter your login credentials. You can test that you are in Austria (AT) from another shell using:
```terminal
$curl ipinfo.io/country
AT
```

And when disconnecting the OpenVPN from the first shell (just use `CTRL + C`) and rerunning the above command you should get your origin country.

## Firewall
Next we make sure we can only use the VPN internet connection. If you are doing this over SSH remember to do a `sudo ufw allow 22` to prevent being locked out.
```terminal
$sudo apt install ufw
$sudo ufw default deny incoming
$sudo ufw default deny outgoing
$sudo ufw allow out 1194/udp
$sudo ufw allow out on tun0
$sudo ufw enable
```

The above will prevent all incoming and outgoing connections except for `tun0` which is the VPN and port 1194 so we can connect to the VPN. Notice that I do not allow VPN connections on port 443 since I might accidentally connect to websites without VPN.

We also make sure to use NordVPN's DNS servers as described [here](https://support.nordvpn.com/hc/en-us/articles/208083995-DNS-servers).
```terminal
$sudo nano /etc/resolvconf/resolv.conf.d/base
```

And add the following in the end of the file:
```shell
nameserver 78.46.223.24
nameserver 162.242.211.137
```

We now test the connection without being on the VPN which prevents data-connections and DNS lookups.
```terminal
$ping google.com -c 1
ping: unknown host google.com
$curl ipinfo.io/country
curl: (6) Could not resolve host: ipinfo.io
```

And with the VPN we are able to
```terminal
$ping google.com -c 1
PING google.com (172.217.21.206) 56(84) bytes of data.
64 bytes from fra16s12-in-f206.1e100.net (172.217.21.206): icmp_seq=1 ttl=57 time=34.3 ms

--- google.com ping statistics ---
1 packets transmitted, 1 received, 0% packet loss, time 0ms
rtt min/avg/max/mdev = 34.301/34.301/34.301/0.000 ms
$curl ipinfo.io/country
CH
```

## Autostart VPN
First we save our credentials in a file. The information is stored as cleartext so be sure to secure it. Replace `Username` and `Password` with your own information.
```terminal
$sudo printf "Username\nPassword" > /etc/openvpn/NordVPN_credentials
```

Next we modify the OpenVPN files to use the credentials from the file.
```terminal
$sudo sed -i -- 's/auth-user-pass.*/auth-user-pass \/etc\/openvpn\/NordVPN_credentials/g' /etc/openvpn/*
```

And finally we create a cronjob to autostart the VPN client on boot, replace `at1.nordvpn.com.udp1194.ovpn` with whatever configuration file you want to use.
```terminal
$(crontab -u root -l; echo "@reboot sleep 10 && /usr/sbin/openvpn /etc/openvpn/at1.nordvpn.com.udp1194.ovpn" ) | crontab -u root -
```

Restart the server and you should automatically use the VPN connection.

[^vpn]: A [virtual private network](https://en.wikipedia.org/wiki/Virtual_private_network) (VPN) extends a private network across a public network, and enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.
