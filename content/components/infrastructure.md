---
title: 'Infrastructure'
order: 0
---

## Components

## Communication between components
Internally, components communications goes through the internal docker network. For external communications (f.e.: Render calls Reporter) internet is used instead (DNS). The different components must communicate with each other using Governify Commons. In the root of the Assets' public folder is located the infrastructure.yaml defining all these URLs.

<info>For locally deployed systems, check connections in the <a href="/development/local-deploy">Local Deploy guide</a>.</info>

[These](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure.yaml) are the URLs for the internal and external calls between microservices for Bluejay:

<center>

| Component                   | Internal                      | External                        |
|-----------------------------|-------------------------------|---------------------------------|
| Render                      | http://bluejay-render         | https://ui{{dns.bluejay}}       |
| Assets                      | http://bluejay-assets-manager | https://assets{{dns.bluejay}}   |
| Reporter                    | http://bluejay-reporter       | https://reporter{{dns.bluejay}} |
| Registry                    | http://bluejay-registry       | https://registry{{dns.bluejay}} |
| ...                         | ...                           | ...                             |

</center>

In the external URLs, `{{dns.bluejay}}` refers to the DNS domain records. As it is shown, internal calls are made through http as they don't leave the machine and external ones goes through https. Looking at this extract of [Bluejay's docker-compose.yaml file](https://github.com/governify/bluejay-infrastructure/blob/main/docker-compose.yaml):
```yaml
...
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

Although the network is configured for all microservices, no aliases are defined. This is because they have to communicate using the components service names. That's why these docker-compose service names are written in the internal infrastructure file.