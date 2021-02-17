---
title: "Metrics"
order: 1
---

## Introduction
The Agreement conformed from several Guarantees contain all the information needed to compute them. Each guarantee contains an objective, which can involve one or more metrics. The metric is the instrument used to fetch the required information and extract a value for the system to verify the fulfilment of the objective.

## Collectors
The collectors are the component which receiving a metric as input, are able to connect to the different data sources to extract the information needed for it, and compute the final result.

Actually, there are 3 different collectors available. The metrics are modeled as a JSON object following the iAgree specification. Each collector has his own syntax and they are similar in order to be consistent but there are some differences in order to extend the features.

### Event Collector 
The Event Collector is capable of using different data sources as input and join the information in order to correlate different payloads composing more complex metrics. Actually it can fetch information from Github, Pivotal Tracker, Travis CI, CodeClimate and Heroku.

#### Patterns
The metrics available to use in the Event Collector follow 4 different patterns:
1. [Number of **[Event]** in **[Tool]** every **[Period]** by **[TEAM|MEMBER]**](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md#pattern_1)
2. [**[MAX|MIN|AVG|STD|NEWEST|LATEST]** **[Property]** value of **[Event]** in **[Tool]** every **[Period]** by team.](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md#pattern_2)
3. [**[Frequency]** distribution of **[Event]** in **[Tool]** every **[Period]** by team.](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md#pattern_3)
4. [Percentage of **[Event1]** in **[Tool1]** correlated with **[Event2]** in **[Tool2]** within **[window]** every **[Period]** by team.](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md#pattern_4)

Right now these are the events available for each tool:

| Tool            | Event                                                                  |
|-----------------|------------------------------------------------------------------------|
| GitHub          | New branches, Open PRs, Merged PRs, Closed PRs, PR additions/deletions |
| Pivotal Tracker | Started/Finished/Delivered/Accepted stories                            |
| Heroku          | Releases, Builds                                                       |
| Travis          | Builds                                                                 |
| CodeClimate     | Coverage reports                                                       |

Here we are showing 4 different examples with their corresponding JSON format using the patterns above. Bear in mind that this is the DSL of the metric and the period is not displayed because it belongs to the guarantee:
1. Number of `STARTED_STORIES` in `PIVOTAL` every `DAY` by `MEMBER`
```json
NUMBER_PT_STARTEDSTORIES
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
2. `AVG COVERAGE` value of `COVERAGE_REPORT` in `CODECLIMATE` every `WEEK` by team.
```json
VALUE_CC_COVERAGE_AVG
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
3. `DAILY` distribution of `SUCCESSFUL_BUILDS` in `TRAVIS` every `WEEK` by team
```json
STDEV_TR_SUCCESSFULBUILDS_DAILY
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
4. Percentage of `NEW_BRANCH` in `GITHUB` correlated with `START_STORY` in `PIVOTAL_TRACKER` within `1_HOUR` every `WEEK` by team.
```json
PERCENTAGE_GH_NEWBRANCH_PT_STARTEDSTORIES
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
For a **full list of metric pattern examples**, please follow [this link](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md) where you can found the following examples:


**Non correlated metrics:**

| Metric Type | Tool            | Event                    |
|-------------|-----------------|--------------------------|
| Number      | GitHub          | New Branches             |
| Number      | GitHub          | Open PR                  |
| Number      | GitHub          | Merged PR                |
| Number      | GitHub          | Closed PR                |
| Number      | Pivotal Tracker | Started Stories          |
| Number      | Pivotal Tracker | Finished Stories         |
| Number      | Pivotal Tracker | Delivered Stories        |
| Number      | Pivotal Tracker | Accepted Stories         |
| Number      | Heroku          | Releases                 |
| Number      | Travis          | Builds                   |
| Number      | Travis          | Failed Builds            |
| Number      | CodeClimate     | Coverage Reports         |
| Number      | CodeClimate     | Coverage Reports over 80 |
| Value       | CodeClimate     | Coverage                 |
| Value       | CodeClimate     | Coverage Offsetted       |
| STDev       | GitHub          | Daily Merged PR          |


**Correlated metrics:**

| Metric Type | Tool 1         | Event 1                  | Tool 2          | Event 2           | Correlation Type |
|-------------|----------------|--------------------------|-----------------|-------------------|------------------|
| Percentage  | GitHub         | New Branch               | Pivotal Tracker | Started Stories   | Time Window      |
| Percentage  | GitHub         | New Branch               | Pivotal Tracker | Started Stories   | Bind             |
| Percentage  | GitHub         | Open PR                  | Pivotal Tracker | Finished Stories  | Time Window      |
| Percentage  | GitHub         | Open PR                  | Pivotal Tracker | Finished Stories  | Bind             |
| Percentage  | GitHub         | Merge PR                 | Pivotal Tracker | Delivered Stories | Time Window      |
| Percentage  | GitHub         | Merge PR                 | Pivotal Tracker | Delivered Stories | Bind             |
| Percentage  | GitHub Wrapper | New Branch               | Pivotal Tracker | Started Stories   | Time Window      |
| Percentage  | Heroku         | Releases                 | Pivotal Tracker | Delivered Stories | Time Window      |
| Percentage  | Heroku         | Releases                 | Pivotal Tracker | Delivered Stories | Bind             |
| Percentage  | Travis         | Successful Builds        | Travis          | Builds            | Time Window      |
| Percentage  | CodeClimate    | Coverage reports over 80 | CodeClimate     | Coverage reports  | Time Window      |


### Pivotal Tracker Collector
The PT Collector connects with Pivotal Tracker and can produce more specific metrics using the different payloads. 

#### Examples
There is a [webpage](https://github.com/isa-group/governify-examples/blob/master/metrics/pt-collector) with available examples for public usage.

### GitHub Collector
Using GitHub API v4, it can access to the information from GitHub Projects Kanbans in order to keep track of the different cards and the changes. 

#### Examples
There is a [webpage](https://github.com/isa-group/governify-examples/blob/master/metrics/gh-collector) with available examples for public usage.
