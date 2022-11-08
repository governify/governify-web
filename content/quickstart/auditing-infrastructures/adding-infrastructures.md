---
title: 'Adding infrastructures for monitorization'
order: 2
---

## Adding infrastructures for monitorization
Falcon allows you to configure a new infrastructure for monitoring without having to restart the system or any of its services. You need to take some files into account to configure monitoring:
- assets/prometheus/targets: Prometheus targeted infrastructures. This file contains the endpoints which prometheus will request for metrics and labels that are used for querying data.
- assets/renders/tpa/agreements/{agreement}.json: The agreement itself, explained later in the [Creating a new SLA for the infrastructure](#creating-a-new-sla-for-the-infrastructure) section. The information inside this file is stored inside the registry database and used to populate `assets/private/monitoring/infrastructures.json` file, which keep track of the infrastructures that are being monitored at the moment.
- config/prometheus/config.yml: This file establishes some configuration options for the prometheus container, sucha s the scrape interval and the location of the targets file. There is no need to modify this options unless you have previous knowledge about Prometheus configuration. Note that modifying this file implies restarting the prometheus container in order for new configuration to be applied.


### Configure prometheus for scraping
In order to configure prometheus for scraping metrics from an exporter inside the infrastructure you want to audit, you need to modify the `assets/prometheus/targets.json` file. The file is basically an array of the different infrastructures that we want to audit, consisting each one in an object containing the exporters that prometheus need to scrape and some metadata that is useful for making PromQL queries.

The basic usage of this file follows this format:
```json
[
    {
        "targets": [ "<exporter-host>" ],
        "labels": {
            "__metrics_path__": "<exporter-metrics-path>",
            "<label-key>": "<label-value>"
        }
    }
]
```

For example, if we wanted to audit Bluejay, which implements [nginx-logs-exporter](https://www.martin-helmich.de/en/blog/monitoring-nginx.html) at exporter.bluejay.[domain]/metrics:

```json
[
    {
        "targets": ["exporter.bluejay.[domain]"],
        "labels": {
            "__metrics_path__": "/metrics",
            "monitoring": "bluejay"
        }
    }
]
```

Note that the `monitoring` label is used as an example, but is useful for making PromQL queries as we will se in the next section. For more information about the targets.json file, check [Prometheus docs](https://prometheus.io/docs/guides/file-sd/).

### Creating a new SLA for the infrastructure
Sercive Level Agreements are the main feature of the Governify ecosystems. Governify SLAs follow [iAgree specification](http://iagree.specs.governify.io/Specification/) and thus, they all have the same structure. In case of Falcon, the following template can be used to start monitoring some infrastructure's metrics:

```json
{   
    "name": "INFRASTRUCTURE DISPLAY NAME",
    "id": "infrastructure_sla_id",
    "version": "1.0.0",
    "type": "agreement",
    "context": {
        "validity": { // SLA Validity, set the initial and timezone as you wish
            "initial": "2022-01-01",
            "timeZone": "Europe/Madrid"
        },
        "definitions": {
            "dashboards": { // No need to modify
                "group-by-service": {
                    "default": true,
                    "base": "$_[infrastructure.internal.assets.default]/api/v1/public/dashboards/group-by-service/base.json",
                    "modifier": "$_[infrastructure.internal.assets.default]/api/v1/public/dashboards/group-by-service/modifier.js",
                    "config": {}
                }
            },
            "services": { // Services inside the monitored infrastructure
                "Service Display Name": "service-real-name"
            },
            "scopes": {
                "infrastructure_name": { // Set your infrastructure name here
                    "service": { // No need to modify
                        "name": "Service",
                        "description": "A service from the infrastructure",
                        "type": "string",
                        "default": "1010101010"
                    }
                }      
            },
            "collectors": { // No need to modify
                "dynamic": {
                    "infrastructurePath": "internal.collector.dynamic",
                    "endpoint": "/api/v2/computations",
                    "type": "POST-GET-V1",
                    "apiVersion": "2",
                    "config": {
                        "url": "$_[infrastructure.internal.prometheus.default]/api/v1"
                    }
                }
            }
        }
    },
    "terms": {
        "metrics": {
            "METRIC_NAME" : { // Metric name
                "collector" : {
                    "$ref" : "#/context/definitions/collectors/dynamic"
                },
                "measure" : {
                    "computing" : "actual",
                    "element" : "number",
                    "scope": { "$ref": "#/context/definitions/scopes/infrastructure_name" }, // ref to scope
                    "params" : {
                        "steps" : {
                            "step1" : {
                                "type": "script",
                                "script": "$_[infrastructure.internal.assets.default]/api/v1/public/collector/steps/request.js",
                                "inputs" : {
                                    "request" : { // Request to Prometheus API
                                        "endpoint": "/query_range",
                                        "method": "GET",
                                        "params": {
                                            "query": "", // PROMQL Query
                                            "start": ">>>period.from<<<",
                                            "end": ">>>period.to<<<",
                                            "step": "5m" // Temporal window
                                        }
                                    },
                                    "result": {
                                        "valueAddress": "data.result",
                                        "scopeKey": "app"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "guarantees": [
            {
                "id": "GUARANTEE_ID", // Guarantee id
                "notes": "",          // Some notes
                "description": "",    // Some description
                "scope": {
                    "$ref": "#/context/definitions/scopes/infrastructure_name"
                },
                "of": [
                    {   
                        "scope": {
                            "service": "*" // Services included in the computation (* means all services are included)
                        },
                        "objective": "METRIC_NAME < 100", // Guarantee objective
                        "with": {
                            "METRIC_NAME": {}   // Set the involved metrics here
                        },
                        "window": { // Guarantee temporal window
                            "type": "static",
                            "period": "hourly",
                            "initial": "2022-01-01"
                        }
                    }
                ]
            }
        ]
    }
}
```

> Note that Falcon uses the Prometheus API to get the data for SLA computation, check the [documentation](https://prometheus.io/docs/prometheus/latest/querying/api/) for more information about Prometheus API endpoints and parameters.