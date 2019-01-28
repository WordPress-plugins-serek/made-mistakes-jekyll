---
title: "Server idling at 9 watt"
excerpt: "A proper server supporting ECC memory and 3 PCIe slots, without the noise, heat issues and high power consumption. Idling at only 8-9 watt - measured from the power outlet!"
image:
  path: &image "/assets/images/low-power-server-feature.jpg"
  feature: *image
  thumbnail: "/assets/images/low-power-server-th.jpg"
  teaser: *image
tags:
  - Server
comments: false
comments_locked: false
published: true
last_modified_at: 2018-09-23T22:24:00
toc: true
---
I was on the lookout for a proper low power server, which meant
* Consuming less than 10 watts idle
* Silent
* ECC memory
* Several PCIe expansion slots
* Relatively small

I did own a Kaby lake Intel NUC which was passively cooled, but while the idle power consumption was great at around 6 watts, it lacked room for expansion (only a single M.2 and SATA slot, no PCIe slots) and did not support ECC memory. The idle temperatures was also too high, my M.2 hard disk was around 38 degrees Celsius idle with a room temperature of 25 degrees.

I ended up with a small micro-atx motherboard with a case not much larger than the board itself.

{% figure caption:"The Cooltek C2 case is a small case with plenty of room for a large silent CPU cooler." %}
![](/assets/images/low-power-server-case.jpg)
{% endfigure %}

The setup consists of

{% include affiliate-disclosure.html %}

* [Fujitsu D3417-B2 motherboard](http://www.fujitsu.com/global/products/computing/peripheral/mainboards/extended-lifecycle-main/pmod-177972.html)
* [A single Samsung 16 GB ECC memory module (M391A2K43BB1-CRC)](https://www.amazon.de/dp/B07BG6BMY7/){:rel="nofollow" data-amazon-asin="[uk][de][es][it][fr]B07BG6BMY7[us][ca]"}
* [Intel Pentium G4600](https://www.amazon.com/dp/B01NADEVZI/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B01NADEVZI"}
* [Noctua NH-D15S CPU cooler](https://www.amazon.com/dp/B00XUVGLEU/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00XUVGLEU"} with an included 140mm fan
* [Noctua NF-A15 PWM 150mm case fan](https://www.amazon.com/dp/B00AED7XFI/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B00AED7XFI"}
* [Cooltek C2 case](https://www.aliexpress.com/item/Jonsbo-C2-Black-C2BK-HTPC-ITX-Mini-computer-case-in-aluminum-support-3-5-HDD-USB3/32718835069.html){:rel="nofollow"}
* [PicoPSU 160XT](https://www.amazon.com/dp/B005TWE6B8/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B005TWE6B8"} power supply
* [60 watt power brick](https://www.amazon.com/dp/B005TWE6B8/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B001W3UYLY"}
* 3 M.2 SATA hard disks (single Transcend MTS400 32GB boot disk and two [1 terabyte Crucial MX300](https://www.amazon.com/dp/B01L80DH1Y/){:rel="nofollow" data-amazon-asin="[us][ca]][uk][de][es][it][fr]B01L80DH1Y"}
* Two [Ekwaterblocks EK-RAM M.2 Nvme Heatsink Kit Black](https://www.amazon.com/dp/B073RHHYCM/){:rel="nofollow" data-amazon-asin="[us][ca]][uk][de][es][it][fr]B073RHHYCM"}
* [IOCrest 3.5" 2.5" HDD / SSD Mounting Bracket for PCI Slot](https://www.amazon.com/dp/B01LZQGZ95/){:rel="nofollow" data-amazon-asin="[us][ca]][uk][de][es][it][fr]B01LZQGZ95"}
* [DELOCK Converter 4x SATA 7pin > 4x M.2 NGFF](https://www.amazon.de/dp/B00PIGON4U/){:rel="nofollow" data-amazon-asin="[uk][de][es][it][fr]B00PIGON4U[us][ca]B00J4UYAXK"}

Which resulted in a server which is silent and consumes only 8-9 watts idle with 3 hard disks running Ubuntu 16.04.3 server and hosting 10 LXD containers. The only thing connected to the server is the power brick and an ethernet cable for the network. No mouse, keyboard or monitor since these consume some additional power. Some details of the build:

## Power consumption
The PicoPSU with a low wattage power brick does the trick at maintaining a good power efficiency at very low power consumption. When switching to a 192 watt power brick the idle power is around 11-12 watts so the choice of power brick does matter. I have a feeling that it is possible to find an even more efficient combination than I have.

## Heat
The the 140mm and 150mm fans does a very good job at keeping the whole setup cool. The case fan at the bottom draws air inside the case and directs it directly at the hard disks which have added heatsinks.

{% figure caption:"3.5 inch SATA adapter capable of mounting 4 M.2 hard disks." %}
![](/assets/images/low-power-server-hard-disks.jpg)
{% endfigure %}

The massive CPU cooler takes up half the space in the small case and does a good job at keeping the CPU cool. The hard disks stays at around 33 degrees Celsius when idle and the CPU at 30 degrees.

{% figure caption:"Massive cooler that barely fits - and only because I use an external power supply.A low profile cooler and a regular ATX power supply could have worked here instead, but I went for a more silent build." %}
![](/assets/images/low-power-server-cooler.jpg)
{% endfigure %}

It should be possible to disconnect one of the fans, maybe even both, for an even lower idle power consumption, but I prefer to have some additional cooling.

## Noise
With two large fans and a massive CPU cooler, the whole setup is dead silent. I need to put my ear right next to the case to hear a hint of noise. I have been running this setup for 3 months without and it is still silent!

## Size
{% figure caption:"The Cooltek C2 case is a small case with plenty of room for a large silent CPU cooler." %}
![](/assets/images/low-power-server-case.jpg)
{% endfigure %}

The case is quite small, but not near as small as the Intel NUC systems. It is however small enough to be hidden away in a closet or shelf - in my case in a small wooden beer crate.

## Expansion
The case is a very tight fit with room for 2 additional PCIe slots since the third is taken up with the hard disk adapter.

{% figure caption:"PCI mounting bracket for hard disks. The M.2 hard disks are mounted upside down to get the full cooling from the bottom fan." %}
![](/assets/images/low-power-server-pcie.jpg)
{% endfigure %}

The adapter is strictly not needed since I could mount it on the case front or side panel with some double-sided tape / glue. I could have gotten away with a smaller CPU cooler to free up some internal space, but prefer better cooling.

I have since replaced the PCI mounting bracket and DELOCK Converter to two [StarTech 3-port M.2 PCI adapter](https://www.amazon.com/dp/B01IR05DLK/){:rel="nofollow" data-amazon-asin="[us][ca][uk][de][es][it][fr]B01IR05DLK"}.

{% figure caption:"Two 3-port M.2 PCI adapters makes for a cleaner and more versatile setup" %}
![](/assets/images/low-power-server-pci-adapters-inside.jpg)
{% endfigure %}

Much more compact setup and added benefit of a net gain of two additional PCI M.2 slots. Does add a bit of flashing lights in the rear!

{% figure caption:"Two 3-port M.2 PCI adapters seen from outside the case" %}
![](/assets/images/low-power-server-pci-adapters.jpg)
{% endfigure %}

## Conclusion
Been running this setup for months with no issues and the average power consumption measured from the wall socket has been 9 watts - not bad!
