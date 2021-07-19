---
title: 'Dev tools'
order: 3
---
These are a series of tools for automating tasks that are commonly executed in the Governify ecosystem. Actually there are a set of .sh scripts to execute commands through multiple directories at the same time but it is intended to store all kind of useful scripts for developing Governify.

For example, governify commons can be easily updated for all the repositories of governify:

```bash
./git-clone-all.sh # Clones all the development repositories 
./git-checkout-all origin/develop # Checkes out all repositories to the development branch
./npm-update-commons.sh # Runs the npm update command in all directories. If the folder is not an npm project or commons is not installed nothing happens
./git-commit-all.sh "feat: updated governify commons" # Commits with the passed parameter and pushes to the origin branch

```

The file `run-command-all.sh` contains generic script that receives a command as first parameter and executes it inside all directories.