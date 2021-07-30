---
title: 'Dev tools'
order: 4
---

These are a series of tools for automating tasks that are commonly executed in the Governify ecosystem. Actually there are a set of .sh scripts to execute commands through multiple directories at the same time but it is intended to store all kind of useful scripts for developing Governify.

In this moment, these are the available scripts:
 - git-checkout-all.sh - Executes a git checkout in all directories.
 - git-clone-all.sh - Clones all Governify's repositories in development.
 - git-clone-bluejay.sh - Clones specific Bluejay's components repositories.
 - git-commit-all.sh - Executes a git commit and a git pushh in all directories. Receives a message as first parametter.
 - git-fetch-pull-all.sh - Executes a git fetch and pull in all directories.
 - npm-update-commons.sh - Exectues `npm update governify-commons` in all directories. If it is not a npm project or commons isn't in its dependencies nothing happens.
 - run-command-all.sh - Receives a command as first parameter and executes it inside all directories.

For example, governify commons can be easily updated for all the repositories of governify using the following sequence:

```bash
./git-clone-all.sh # Clones all Governify's repositories.
./git-checkout-all origin/develop # Checkes out all repositories to the development branch
./npm-update-commons.sh # Updates governify-commons in all directories. 
./git-commit-all.sh "feat: updated governify commons" # Commits with the passed parameter as the commit message and pushes to the origin branch
```