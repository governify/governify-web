---
title: 'Assets Manager'
order: 2
---

# Introduction
The assets manager is the core component for serving all the files that need to be accessed via network. A file that has to be accessed by multiple components (e.g., infrastructure.yaml accessed by components using Governify Commons) can be placed in the assets.

It also features a Theia cloud IDE for easy modification and management of the files.

# Features

## File REST API server

The server is able to serve both public (/api/v1/public) and private (/api/v1/private) files. A token is required as a header to 
This API has four methods available

 - GET: Used to obtain any file.
 - POST: Used to create any file.
 - PUT: Used to modify any file.
 - PATCH: Used to modify a file appending information at the end. Check out [this](https://github.com/governify/commons/blob/main/httpClient.js#L13) file to see how to do it.

## Theia

[Theia](https://theia-ide.org/) is an open source clound and desktop IDE platform for modifiying files and coding. The assets integrates a simple image of it to add the ability to modify it's files directly from the web browser. By accessing to the assets root URL/IP it will redirect to the Theia IDE. Use the credentials on .env to log in and you will be able to see all the public and private files in the folder hierarchy.

Theia cannot modify files if the docker volume is mapped to a folder instead of a docker volume. You can download the files directly from theia, create a volume, restart the service and drag in all the files directly to the files hierarchy.
