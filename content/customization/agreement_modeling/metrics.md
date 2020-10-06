---
title: "Metrics"
order: 1
---
Work in progress.

## Introduction
The TPA conformed from several TPs contain all the information needed to compute them. Each guarantee contains an objective, which can involve one or more metrics. The metric is the instrument used to fetch the required information and extract a value for the system to verify the fulfilment of the objective.



## Metric and Guarantees
??

## What is a metric?
??

## Collectors
The collectors are the component which receiving a metric as input, are able to connect to the different data sources to extract the information needed for it, and compute the final result.

Actually, there are 3 different collectors available. The metrics are modeled as a JSON object following the iAgree specification. Each collector has his own syntax and they are similar in order to be consistent but there are some differences in order to extend the features.

### Event Collector 
The Event Collector is capable of using different data sources as input and join the information in order to correlate different payloads composing more complex metrics. Actually it can fetch information from Github, Pivotal Tracker, Travis CI, CodeClimate and Heroku.

#### Patterns
The metrics available to use in the Event Collector follow 4 different patterns:
1. Number of [Event] in [Tool] every [Period] by [TEAM|MEMBER]
2. [MAX|MIN|AVG|STD|NEWEST|LATEST] [Property] value of [Event] in [Tool] every [Period] by team.
3. [Frequency] distribution of [Event] in [Tool] every [Period] by team.
4. Percentage of [Event1] in [Tool1] correlated with [Event2] in [Tool2] within [window] every [Period] by team.

Here are 4 different examples with their corresponding JSON format using the patterns above. Note that this is the DSL of the metric and the period is not displayed because it belongs to the guarantee:
1. Number of STARTED_STORIES in PIVOTAL every DAY by MEMBER
```json
{
    "metric": {
      "computing": "actual",
      "element": "number",
      "event": {
        "pivotal": {
          "activity": {
            "highlight": "finished"
          }
        }
      },
      "scope": {
        "$ref": "#/context/definitions/scopes/development"
      }
    }
}
```
2. AVG COVERAGE value of COVERAGE_REPORT in CODECLIMATE every WEEK by team.
```json
{
    "metric": {
      "computing": "actual",
      "element": {
        "value": {
          "parameter": "attributes.covered_percent",
          "return": "avg",
          "traceback": true
        }
      },
      "event": {
        "codeclimate": {
          "coverage": {}
        }
      },
      "scope": {
        "$ref": "#/context/definitions/scopes/development"
      }
    }
```
3. DAILY distribution of SUCCESSFUL_BUILDS in TRAVIS every WEEK by team
```json
{
    "metric": {
      "computing": "string",
      "element": {
        "stdev": {
          "period": "daily"
        }
      },
      "event": {
        "travis": {
          "builds_public": {
            "@type": "build",
            "state": "passed"          
          }
        }
      },
      "scope": {
        "$ref": "#/context/definitions/scopes/development"
      }
    }
```
4. Percentage of NEW_BRANCH in GITHUB correlated with START_STORY in PIVOTAL_TRACKER within 1_HOUR every WEEK by team.
```json
{
    "metric": {
      "computing": "actual",
      "element": {
        "percentage": {
          "related": {
            "github": {
              "events": {
                "type": "CreateEvent",
                "payload": {
                  "ref_type": "branch"
                }
              }
            },
            "window": 3600
          }
        }
      },
      "event": {
        "pivotal": {
          "activity": {
            "highlight": "started"
          }
        }
      },
      "scope": {
        "$ref": "#/context/definitions/scopes/development"
      }
    }
```




#### Examples
Here are all the already created examples for the event collector:
- ¿¿ENLACE O COPIA??

### Pivotal Tracker Collector
The PT Collector connects with Pivotal Tracker and can produce more specific metrics using the different payloads. 

#### Patterns
#### Examples

### GitHub Collector
Using GitHub API v4, it can access to the information from GitHub Projects Kanbans in order to keep track of the different cards and the changes. 
#### Patterns
#### Examples



# EXTRA (por si fuera util para lo superior)
When modelling metrics for the Event Collector, there exists a lot
of possibilities to choose, so we are presenting here these examples
to show possible alternatives that can be created with it.
The first example is one of the simplest metrics. What it will
do is to return the number of releases of a team on Heroku. When
using any metric in a guarantee, the periodicity can be defined. For
example, for a TP "Each team must do one or more Heroku releases
each week", using this metric the objective of the guarantee would
be "NUMBER_HEROKU_RELEASES >= 0" and its window period
should be set to weekly.

Looking at Figure 3, we can see three parts of the described in
the last section:
• computing: "actual" specifies that the metric does not have
to be aggregated.
• element: When the collector receives "number" as element
it will return the number of events for the given period
matching the request.
• event: This object will act as definition for the request and
the filter at the same time. "heroku" tells us the API where
the collector will ask for the data. The second level, "releases",
specifies the endpoint it will use to fetch the information.
This is mapped in a configuration file as explained here8.
What is left is the part that acts as a matching filter when receiving
the payload from the corresponding API for retaining
desired events.
For the event part in Figure 3, the collector will ask for all the
information to Heroku at the endpoint containing the information
about the releases. Looking at the following simplified payload
response coming from Heroku releases endpoint9:


As status equals to succeeded, same value as the specified on the
metric, it would pass the filter. Looking at Figure 3, it has a second
field "description: %CONTAINS%Deploy". The "%CONTAINS%" is a
tool built in on the collector that will check that the field description
contains what comes next, which is "Deploy". All possible filtering
variations can be seen here10. As the event contains "Deploy" inside
its description and there are no more filtering fields to check, this
event will be counted for the final result. If for example we wanted
to check if version equals to 3 as well, we would have included,
along the status and description, another field version with 3 as
value.
The next metric (Figure 5) returns the percentage of started
stories (Pivotal Tracker) that are timely correlated with a branch
creation (GitHub).


The computing field is actual, as the first example. The event
this time is pivotal, being the main event. It will use the activity
endpoint and filter events by retaining the ones with highlight
equal to started, obtaining all started stories events. But this time,
the element is a percentage, as seen in line 5. Looking at the next
level, the related means it will try to correlate both events using
the following fields:
• The first field, on line 7, is the secondary event. This whole
object will be treated the same way the primary event is
treated. In this case, it will obtain the information from
GitHub, from the events endpoint12 and using the filters
to retain events of the type "CreateEvent" and the reference
with branch type.
• The second one is the time correlation window. It is specified
in seconds, so for this metric both events must have occurred
within 86400, which is 1 day.
It will first get the information from the event field, then the
information from the related field. Lastly will match both events
coexisting within the window and return the percentage of events
correlated, using GitHub (secondary event) as numerator and Pivotal
(main event) as denominator.