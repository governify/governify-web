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

| Tool            | Events                                                                 |
|-----------------|------------------------------------------------------------------------|
| GitHub          | New branches, Open PRs, Merged PRs, Closed PRs, PR additions/deletions |
| Pivotal Tracker | Started stories, Finished stories, Delivered stories, Accepted stories |
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


**Non correlation metrics:**

| Metric Type | Tool            | Event                    | DSL Definition                                                                                                                     |
|-------------|-----------------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Number      | GitHub          | New Branches             | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_gh_newbranch)         |
| Number      | GitHub          | Open PR                  | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_gh_openpr)            |
| Number      | GitHub          | Merged PR                | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_gh_mergepr)           |
| Number      | Pivotal Tracker | Started Stories          | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_pt_startedstories)    |
| Number      | Pivotal Tracker | Finished Stories         | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_pt_finishedstories)   |
| Number      | Pivotal Tracker | Delivered Stories        | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_pt_acceptedstories)   |
| Number      | Pivotal Tracker | Accepted Stories         | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_pt_deliveredstories)  |
| Number      | Heroku          | Releases                 | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_he_releases)          |
| Number      | Travis          | Builds                   | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_tr_builds)            |
| Number      | Travis          | Failed Builds            | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_tr_failedbuilds)      |
| Number      | CodeClimate     | Coverage Reports         | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_cc_coverage)          |
| Number      | CodeClimate     | Coverage Reports over 80 | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#number_cc_coverage_over80)   |
| Value       | CodeClimate     | Coverage                 | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#value_cc_coverage)           |
| Value       | CodeClimate     | Coverage Offsetted       | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#value_cc_coverage_offset)    |
| STDev       | GitHub          | Daily Merged PR          | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#stdev_gh_mergepr_daily)      |


**Correlation metrics:**

| Metric Type | Tool 1         | Event 1                  | Tool 2          | Event 2           | Correlation Type | DSL Definition                                                                                                                                          |
|-------------|----------------|--------------------------|-----------------|-------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| Percentage  | GitHub         | New Branch               | Pivotal Tracker | Started Stories   | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_newbranch_pt_startedstories)        |
| Percentage  | GitHub         | New Branch               | Pivotal Tracker | Started Stories   | Bind             | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_newbranch_pt_startedstories_bind)   |
| Percentage  | GitHub         | Open PR                  | Pivotal Tracker | Finished Stories  | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_openpr_pt_finishedstories)          |
| Percentage  | GitHub         | Open PR                  | Pivotal Tracker | Finished Stories  | Bind             | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_openpr_pt_finishedstories_bind)     |
| Percentage  | GitHub         | Merge PR                 | Pivotal Tracker | Delivered Stories | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_mergepr_pt_deliveredstories)        |
| Percentage  | GitHub         | Merge PR                 | Pivotal Tracker | Delivered Stories | Bind             | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_gh_mergepr_pt_deliveredstories_bind)   |
| Percentage  | GitHub Wrapper | New Branch               | Pivotal Tracker | Started Stories   | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_ghwr_newbranch_pt_startedstories)      |
| Percentage  | Heroku         | Releases                 | Pivotal Tracker | Delivered Stories | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_he_releases_pt_deliveredstories)       |
| Percentage  | Heroku         | Releases                 | Pivotal Tracker | Delivered Stories | Bind             | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_he_releases_pt_deliveredstories_bind)  |
| Percentage  | Travis         | Successful Builds        | Travis          | Builds            | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_tr_successfulbuilds_tr_builds)         |
| Percentage  | CodeClimate    | Coverage reports over 80 | CodeClimate     | Coverage reports  | Time Window      | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#percentage_cc_coverageover80_cc_coverage)         |




### Pivotal Tracker Collector
The PT Collector connects with Pivotal Tracker and can produce more specific metrics using the different payloads. 

#### Examples
There is a [webpage](https://github.com/isa-group/governify-examples/blob/master/metrics/pt-collector) with available examples for public usage.

### GitHub Collector
Using GitHub API v4, it can access to the information from GitHub Projects Kanbans in order to keep track of the different cards and the changes. 

#### Examples
There is a [webpage](https://github.com/isa-group/governify-examples/blob/master/metrics/gh-collector) with available examples for public usage.
