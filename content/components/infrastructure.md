---
title: 'Infrastructure'
order: 0
---

Internally, components communications goes through the internal docker network. For external communications (e.g. Render calls Reporter) internet is used instead (DNS). The different components must communicate with each other using Governify Commons. In the root of the Assets' public folder is located the **infrastructure.yaml** defining all these URLs.

In the [infrastructure.yaml](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure.yaml) file, are defined the internal and external URLs that are used by Governify's microservices to communicate. In the following table, four rows showing the internal and external URLs for 4 different components are displayed (taken from the [infrastructure.yaml](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure.yaml) file):

<center>

| Component                   | Internal                      | External                        |
|-----------------------------|-------------------------------|---------------------------------|
| Render                      | http://bluejay-render         | https://ui{{dns.bluejay}}       |
| Assets                      | http://bluejay-assets-manager | https://assets{{dns.bluejay}}   |
| Reporter                    | http://bluejay-reporter       | https://reporter{{dns.bluejay}} |
| Registry                    | http://bluejay-registry       | https://registry{{dns.bluejay}} |
| ...                         | ...                           | ...                             |

</center>

In the external URLs, `{{dns.bluejay}}` refers to the DNS domain records. As it is shown, internal calls are made through http as they don't leave the docker host and external ones goes through https. 

<info>For locally deployed systems, no DNS is used. All connections goes through the exposed ports. Check the container ports in the <a href="/development/local-deploy">Local Deploy guide</a>. Also, there is a different [local infrastructure file](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure-local.yaml) with its proper configuration for the system to work this way.</info>

The external URLs are configured in the reverse proxy (Nginx) and are automatically redirected to each service. To know where are the internal URLs defined we need to take a look at this extract of [Bluejay's docker-compose.yaml file](https://github.com/governify/bluejay-infrastructure/blob/main/docker-compose.yaml):
```yaml
...
services:
  bluejay-assets-manager:
      container_name: bluejay-assets-manager
      image: 'governify/assets-manager:develop'
      environment:
        - NODE_ENV=production
        - PORT=80
        - LOGIN_USER=${USER_ASSETS:?}
        - LOGIN_PASSWORD=${PASS_ASSETS:?}
        - PRIVATE_KEY=${KEY_ASSETS_MANAGER_PRIVATE:?}
        - SERVICES_PREFIX=${SERVICES_PREFIX:?}
        - DNS_SUFFIX=${DNS_SUFFIX:?}
      networks:
        - governify-bluejay
      volumes:
        - './assets:/home/project'
      mem_limit: 400m
      restart: 'unless-stopped'
  # ================================================
  bluejay-reporter:
      container_name: bluejay-reporter
      image: governify/reporter:develop
      environment:
          - DB_HOST=influxdb
          - NODE_ENV=production
          - PORT=80
          - GOV_INFRASTRUCTURE=${GOV_INFRASTRUCTURE:?}
      networks:
          - governify-bluejay
      volumes:
          - './logs/bluejay-reporter:/opt/app/logs'
      mem_limit: 400m
      restart: 'unless-stopped'
      depends_on:
          - bluejay-assets-manager
          - bluejay-mongo-registry
          - bluejay-influx-reporter
...
```

Although all the microservices share the same network (governify-bluejay), no aliases are defined. This is because the service name defined in the docker-compose also works as the alias inside the network. That's why these docker-compose service names are written in the internal infrastructure infrastructure of the infrastructure.yaml file (e.g. `bluejay-assets-manager` service name turns into `http://bluejay-assets-manager`).