---
title: "Dashboards"
order: 2
---
## Dashboard creation

In Governify ecosystem, all the data calculated from agreement can be viewed from Dashboards component.
Dashboards are the way to represent the adherence to the agreement visually.
To create a new dashboard you only have to create one new item in the dashboards section of the agreement (agreement.context.definitions.dashboards)

There are two ways of creating dashboards in Governify.

### 1st. Custom Grafana dashboard
The custom dashboard are composed by three files. This three file are specified in the dashboard section:
```json
    "dashboards": {
        "class-dashboard": {
            "overlay": "/general-class/overlay.js",
            "base": "/general-class/base.json",
            "modifier": "/general-class/modifier.js",
            "modifierPipe":{
                "1":"/general-class/modifier2.js",
                "2":"/general-class/modifier3.js"
            }
        }
    }
```
- **Base.json:** Is the JSON Dashboard file that represent a Grafana Dashboard. You can create a Dashboard from Grafana interface, and with the Dashboard extract the JSON file the following way:
![Step 1. Extract JSON from Grafana Dashboard](../images/dashboards/grafana_config.png)

    ![Step 2. Extract JSON from Grafana Dashboard](../images/dashboards/grafana_config2.png)

    And finally copy the code and save it in a JSON file.

- **Modifier.js:** This file must contain a function called modifyJSON, that will be called before sending the JSON dashboard to Grafana to represent it. If you want to modify the base Dashboard with any information from the agreement, you can do it here.
The function modifyJSON receives 3 parameters:
    - JsonDashboard
    - Agreement
    - DashboardName

Example function:
```js
function modifyJSON(jsonDashboard, agreement, dashboardName){\
  let modifiedDashboard = {...jsonDashboard};
  return modifiedDashboard;
}
  ```

- **ModifierPipe:** (_optional_) In addition to the modifier option,  modifierPipe allow the integration of a secuencial list of modifier to personalize the base.json in a more readable way. The modifier structure is the same as previously seen and the order of execution is defined with the numerical key in the object.

- **Overlay.js:** This javascript file runs in the client browser when the dashboard is loaded. Can be used to modify Grafana UI or information.

### 2nd. Dashboard by blocks
With this way you only have to define the type of graphs you want for every guarantee you want to represent.
First set the overlay as in the example.
After this, define one block in the config section for every guarantee you want to represent, with the following parameters:
- type: Type of graph.
- guarantee: Guarantee to represent in this block
- config: Depends on each type.

Dashboard block example:
```json
  "dashboards": {
                "class-dashboard":{ //ID of your dashboard
                    "overlay": "/blocks/overlay.js",
                    "config": {
                        "configDashboard":true, //activate the blocks option
                        "blocks": { //list of block declared
                            "1": { // order for the later display
                                "type": "time-graph",
                                "guarantee": "Guarantee_1",
                                "config": {
                                    "time-graph-title": "Graph title"
                                }
                            },
                            "2": {
                                "type": "gauge-time",
                                "guarantee":"Guarantee_2"
                            }
                        }
                    }
                }
```
#### **Blocks Types** :
Every type of block have the option _"time-graph-title"_ to define its title as seen in the example.
- **time-graph**: 
- **time-graph2**: 
- **time-graph2-member**: 
- **correlated**: 
- **gauge**:
- **gauge-not-zero**:
- **gauge-time**:
- **time-gauge**:  
- **gauge-time-correlation-notZero**: 
- **divider-changer**: 
- **divider-changer-github**: 


