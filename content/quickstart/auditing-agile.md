---
title: 'Auditing agile development'
order: 2
---
## Auditing agile development «Bluejay» 
### Introduction
Governify platform can be use to model Team Practices in Agile development. We have develop components for collect information from multiple developing tools API such as GitHub, Pivotal Tracker, Heroku, and more.

We call this system **Bluejay**, an open source extensible platform that can connect to multiple tools to support software engineering teams continuous improvement processes.
Bluejay can audit one team, multiples teams or an entire company having diferent *Team Practices*.

You can deploy Bluejay in 10 minutes.

___
### Deploying Bluejay
#### Prerequisites
- Linux server with Docker installed in it.
- A domain with the ability to modify DNS records.
#### Infrastructure setup
1. Create the following DNS records
- ui.bluejay.*[YourDomain]*
- registry.bluejay.*[YourDomain]*
- reporter.bluejay.*[YourDomain]*
- dashboard.bluejay.*[YourDomain]*
- sm.bluejay.*[YourDomain]*
2. Clone or download Bluejay Infrastructure repository [Bluejay Infrastructure](https://github.com/governify/governify-project-bluejay-infrastructure)
3. Open a terminal in the repository folder and execute setup.sh with the following parameters:

 `./setup.sh <.YourDomain> <ServerIP> bluejay`

Governify ecosystem with bluejay services should have been deployed in the system. Now is time to configure it.

#### Configuration
Bluejay should be able to access team data. To achieve this,the API Keys for each system that will be tracked should be provided.
Executing the credentials script, and introducing the corresponding API Keys, the system will create all the config file with the credentials needed for the system.
 `./credentials.sh <.YourDomain> <ServerIP> bluejay`

#### Quick tour
The main interaface is accesible from ui.bluejay.*[YourDomain]*
In this interface you should be able to see a list of all the teams you have in your configuration.

{IMAGE}

To start auditing one team, click the "Create TPA" button on the left of the team. This will create a standard and simple agreement for that team, and will start to audit it.
![Create TPA Button](../images/auditing_agile/create_tpa.png)

Once the agreement is created, the project should appear in the Audited Projects column.
Agreement terms can be viewed clicking the TPA button.
![Create TPA Button](../images/auditing_agile/audited_buttons.png)
Clicking the Dashboard button a new tab will be opened. If you did not logged before, username and password will be asked.
Default username is governify-admin, and default password is governify-project.
Once logged, the dashboard for the project will be opened where all the audit data can be viewed.



#### Customization
Bluejay is customizable in every aspect. You can create new agreements, new dashboard and even new interfaces. Check the following sections:
- [Agreement Modeling customization](/customization/agreement_modeling)
- [User Interfaces customization](/customization/user_interfaces)
- [Dashboards customization](/customization/dashboards)