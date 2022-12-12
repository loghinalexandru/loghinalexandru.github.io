---
title: "CoreDNS AdBlock"
date: 2022-12-12T10:39:46+02:00
author: Loghin Alexandru
description: Personal project for a custom made version of CoreDNS with ad blocking capabilities on k8s.
tags:
  - opensource
  - coredns
  - adblock
draft: false
---

# Why

There are a lot of popular ad-blocking software out there. To name a few, [Pihole](https://pi-hole.net/) & [AdGuard](https://adguard.com/en/welcome.html) are the most popular ones.

However they do come with an UI and they are generally not that fast. Deploying them will consume a lot of memory for which I do not have the resources in the first place and the scaling of these solutions also means adding the UI into the mix.

Que my solution with automatic initialization & updating of a *hosts* blacklist file with resources specifiable via the values file in helm.

```yaml
# Use this as a hosts file to set custom DNS records
customRecords: 
  - 192.168.1.33 some-service.home

# The lists must be the same format as a hosts file
blockListUrls: 
  - https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
```

# Features

- [x] Self contained instance with no need for a storage solution (it uses an emptyDir volume).
- [x] Initialization container that makes sure we have the *hosts* file in place.
- [x] Custom container that runs a cronjob to update the *hosts* file every 24 hours.
- [x] Fast & scalable with no bloatware.
- [x] Easy to deploy via [Helm](https://helm.sh/).

# Default values

```yaml
replicaCount: 1

service:
  type: LoadBalancer

# Use this as a hosts file to set custom DNS records
customRecords: []

# The lists must be the same format as a hosts file
blockListUrls: 
  - https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts

emptyDir:
  size: 100M

resources:
  coredns:
    limits:
      memory: 65Mi
    requests:
      cpu: 100m
      memory: 65Mi
  blacklistRunner:
    limits:
      memory: 20Mi
    requests:
      cpu: 50m
      memory: 20Mi

autoscaling:
  minReplicas: 1
  maxReplicas: 3
  targetCPUUtilizationPercentage: 65
```

If you want to override this make a custom-values.yaml add pass it via **-f** to helm. Make note that you might want to use a **LoadBalancer** for this since the NodePort option does not allow to use port **53** since it is not in the default range for k8s.

# How to install

```bash
git pull https://github.com/loghinalexandru/CoreDNS-AdBlock
helm upgrade --install coredns-adblock ./CoreDNS-AdBlock
```