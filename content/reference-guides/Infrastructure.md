---
title: "Infrastructure"
order: 1
---

## Introduction 

In addition to the microservices represented in the [Set up development environment](/development/local-deploy), Governify has others belonging to the Galibo system. In this section we will group all of them and we will see their local configuration.

___
## Infrastructure

First let's see a table with the Docker configuration of the microservices:

<center>

| Component          | Local Port  | Docker Image                         | GitHub Repo                                              | Servicio |
|--------------------|-------------|--------------------------------------|----------------------------------------------------------|----------|
| Render             | 5100        | governify/render:develop             | [GitHub](https://github.com/governify/render)            | Galibo & Bluejay |
| Assets             | 5200        | governify/assets-manager:develop     | [GitHub](https://github.com/governify/assets-manager)    | Galibo & Bluejay |
| Reporter           | 5300        | governify/reporter:develop           | [GitHub](https://github.com/governify/reporter)          | Galibo & Bluejay |
| Registry           | 5400        | governify/registry:develop           | [GitHub](https://github.com/governify/registry)          | Galibo & Bluejay |
| Dashboard          | 5600        | governify/dashboard:develop          | [GitHub](https://github.com/governify/dashboard)         | Galibo & Bluejay |
| Scopes             | 5700        | governify/scope-manager:develop      | [GitHub](https://github.com/governify/scope-manager)     | Galibo & Bluejay |
| Logs               | 6001        | governify/galibo-logs:develop        | [GitHub 🔐](https://github.com/governify/galibo-logs)    | Galibo & Bluejay |
| Director           | 5800        | governify/director:develop           | [GitHub](https://github.com/governify/director)          | Galibo & Bluejay |
| Join               | ----        | governify/join-bluejay:develop       | [GitHub](https://github.com/governify/join-bluejay)      | Galibo & Bluejay |
| Collector-events   | 5500        | governify/collector-events:develop   | [GitHub](https://github.com/governify/collector-events)  |  Bluejay |
| Collector-dynamic  | 5501        | governify/collector-dynamic:develop  | [GitHub](https://github.com/governify/collector-dynamic) | Galibo  |
| Collector-ppinot   | 5502        | isagroup/governify-computer-ppinot   | [GitHub](https://github.com/governify/render)            | Galibo  |
| DB-Mongo-Registry  | 5001        | mongo                                | ❌                                                       | Galibo & Bluejay |
| DB-Influx-Reporter | 5002        | influxdb:1.8.4-alpine                | ❌                                                       | Galibo & Bluejay |
| DB-Collector-Redis | 5003        | redis                                | ❌                                                       | Bluejay |
| DB-Mongo-logs      | 5011        | mongo                                | ❌                                                       | Galibo  |

</center>

___
### Infrastructure-local.yaml
For more details of the local deployment we can see the infrastructure-local files of both services, leaving the similarities between them and marking the differences:
```
internal:
  render:
    default: 'angular'
    angular: 'http://host.docker.internal:5100'
  assets:
    default: 'theia'
    theia: 'http://host.docker.internal:5200'
  reporter:
    default: 'grafana'
    grafana: 'http://host.docker.internal:5300'
  registry:
    default: 'standard'
    standard: 'http://host.docker.internal:5400'
  collector:
    # Galibo
    default: 'dynamic'
    dynamic: 'http://host.docker.internal:5501'
    ppinot: 'http://host.docker.internal:5502'
    # Bluejay
    default: 'events'
    events: 'http://host.docker.internal:5500'
  dashboard:
    default: 'grafana'
    grafana: 'http://host.docker.internal:5600'
  director:
    default: 'standard'
    standard: 'http://host.docker.internal:5800'
  scopes:
    default: 'bluejay'
    bluejay: 'http://host.docker.internal:5700'
  logs:
    default: 'naos'
    naos: 'http://host.docker.internal:6001'
  database:
    default: 'mongo-registry'
    mongo-registry: 'mongodb://host.docker.internal:5001'
    influx-reporter: 'http://host.docker.internal:5002'
    # Galibo
    logs: 'mongodb://host.docker.internal:5011'
    # Bluejay
    redis-ec: 'redis://host.docker.internal:5003'
external:
  render:
    default: 'angular'
    angular: 'http://localhost:5100'
  assets:
    default: 'theia'
    theia: 'http://localhost:5200'
  reporter:
    default: 'grafana'
    grafana: 'http://localhost:5300'
  registry:
    default: 'standard'
    standard: 'http://localhost:5400'
  dashboard:
    default: 'grafana'
    grafana: 'http://localhost:5600'
  director:
    default: 'standard'
    standard: 'http://localhost:5800'
  scopes:
    default: 'bluejay'
    bluejay: 'http://localhost:5700'
  logs:
    default: 'naos'
    naos: 'http://localhost:6001'
```
This preview may be outdated, to see the latest versions go here for [Galibo](https://github.com/governify/assets-galibo/blob/main/public/infrastructure-local.yaml) or [Bluejay](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure-local.yaml)

### Infrastructure.yaml
Also for general deployment we can also see the joint file:  
(The variable serviceName means that it is present in both services and in each case it is the name of the respective service)
```
internal:
  render:
    default: 'angular'
    angular: 'http://{{serviceName}}-render'
  assets:
    default: 'theia'
    theia: 'http://{{serviceName}}-assets-manager'
  reporter:
    default: 'grafana'
    grafana: 'http://{{serviceName}}-reporter'
  registry:
    default: 'standard'
    standard: 'http://{{serviceName}}-registry'
  collector:
    # Galibo
    default: 'dynamic'
    dynamic: 'http://galibo-collector-dynamic'
    ppinot: 'http://galibo-computer:8080'
    # Bluejay
    default: 'events'
    events: 'http://bluejay-collector-events'
  dashboard:
    default: 'grafana'
    grafana: 'http://{{serviceName}}-dashboard:3000'
  director:
    default: 'standard'
    standard: 'http://{{serviceName}}-director'
  scopes:
    default: 'bluejay'
    bluejay: 'http://bluejay-scope-manager'
  logs:
    default: 'naos'
    naos: 'http://galibo-logs'
  database:
    default: 'mongo-registry'
    mongo-registry: 'mongodb://{{serviceName}}-mongo-registry:27017'
    influx-reporter: 'http://{{serviceName}}-influx-reporter:8086'
    # Galibo
    logs: 'mongodb://galibo-mongo-logs'
    # Bluejay
    redis-ec: 'redis://bluejay-redis-ec:6379'
external:
  render:
    default: 'angular'
    angular: 'https://ui{{dns.serviceName}}'
  assets:
    default: 'theia'
    theia: 'https://assets{{dns.serviceName}}'
  reporter:
    default: 'grafana'
    grafana: 'https://reporter{{dns.serviceName}}'
  registry:
    default: 'standard'
    standard: 'https://registry{{dns.serviceName}}'
  dashboard:
    default: 'grafana'
    grafana: 'https://dashboard{{dns.serviceName}}'
  director:
    default: 'standard'
    standard: 'https://director{{dns.serviceName}}'
  scopes:
    default: 'bluejay'
    bluejay: 'https://scopes{{dns.bluejay}}'
  logs:
    default: 'naos'
    naos: 'https://naos-logs{{dns.galibo}}'
dns:
  bluejay: '.bluejay.governify.io'
  galibo: '.galibo.governify.io'
```
This preview may be outdated, to see the latest versions go here for [Galibo](https://github.com/governify/assets-galibo/blob/main/public/infrastructure.yaml) or [Bluejay](https://github.com/governify/bluejay-infrastructure/blob/main/assets/public/infrastructure.yaml)