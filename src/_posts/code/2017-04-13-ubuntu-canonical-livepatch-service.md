---
title: "Ubuntu Canonical Livepatch Service"
excerpt: "Ubuntu Canonical Livepatch Service - free livepatching of running kernels without a reboot."
tags:
  - LXD
  - VPS
  - Ubuntu
comments: false
comments_locked: false
published: true
last_modified_at: 2017-04-13T11:03:31
redirect_from: "/ubuntu-canonical-livepatch-service/"
toc: false
---
Since I am running several machines with LXD [^lxd] containers, it is extra important to keep the host kernel up-to-date with security patches since every container uses the host kernel. Using Canonicals Livepatch Service enables live patching without a reboot / restart for free for up to 3 machines.

{% notice warning %}
**Notice**: Once a livepatch passes Ubuntu's internal test, it is rolled out on a canary testing basis, first to a tiny percentage of the Ubuntu Community users of the Canonical Livepatch Service - the free tier of this service. If you do not wan't the risk of ending up being a guinea pig you need to pay for the service.
{% endnotice %}

For this to work you need:

* Fully updated 64-bit Ubuntu 16.04 LTS (Xenial) running kernel 4.4 (GA) [^kernel] and not the optional HWE kernel which is at 4.8
* A free Ubuntu One account

To install and enable livepatching simply do:

1. Go to [https://ubuntu.com/livepatch](https://ubuntu.com/livepatch) and select "Ubuntu User" and click "Get your Livepatch token" to retrieve your livepatch token
2. In the terminal install the service
```terminal
$sudo snap install canonical-livepatch
```

{:start="3"}
3. Enable the service with the token retrieved from step 1
```terminal
$sudo canonical-livepatch enable "Livepatch token from step 1"
```

{:start="4"}
4. Check if the service is running
```terminal
$canonical-livepatch status --verbose
client-version: "7.21"
machine-id: 432b7728d2c94336325f494158288c1b
machine-token: ec2a887cc4ff40edbfaa590cd73f9266
architecture: x86_64
cpu-model: QEMU Virtual CPU version (cpu64-rhel6)
last-check: 2017-04-13T12:56:36.992+02:00
boot-time: 2017-04-13T12:56:21+02:00
uptime: 2m43s
status:
- kernel: 4.4.0-72.93-generic
  running: true
  livepatch:
    checkState: checked
    patchState: nothing-to-apply
    version: ""
    fixes: ""
```

[^kernel]: The general availability (GA) kernel is based on the generic kernel that originally ships with a new Ubuntu version. New hardware gets released all the time and if an Ubuntu host is running an older kernel then that hardware likely won't be supported by it. Ubuntu's response to this is to backport more recent kernels. Doing this effectively enables more hardware. Hence, HWE is an acronym for HardWare Enablement. ([Source](https://docs.ubuntu.com/maas/2.1/en/installconfig-nodes-ubuntu-kernels))
[^lxd]: LXD (pronounced lex-dee) is a container based hypervisor that runs unmodified Linux guest operating systems with VM-style operations at higher speed and density than a full blown traditional hypervisor like VMWare and KVM. Take a look at my posts [here](/code/lxd-2-0-container-hypervisor/) and [here](/code/latest-stable-lxd-ubuntu-16-04-lts/) for more info.
