---
title: 'Set up development environment'
order: 0
---

## Introduction
This guide for locally deploying the development environment works for any system (Bluejay, Galibo...).

In order to develop any feature or adding a new component to Governify's ecosystem, the best way to do it is by deploying all the components locally.

The easiest aproach is to deploy using docker the entire infrastructure and, in case a microservice is needed to be modified, stop the container and start it with node locally so the container has not to be builded and deployed with each change.
