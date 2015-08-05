Temperature Monitoring Application
=======================

## About this
This is a tutoril application to learn how to develop a server plugin of ServiceSync.
This plugin works on ServiceSync DMS (Device Management Server) and receives temperature from a gateway device.

## Scripts

This package contains the following scripts:

- `upload-temperature.js`: Receive temperature from the IoT/M2M gateway.
- `startstop-monitoring.js`: Publish a start or stop command to the IoT/M2M gateway to start or stop monitoring. 

*.test.js files under `test` directories are unit testing scripts.

## Models

Describe about the model defined in `package.json`.

## Commands
### Set up

    npm install

### Build & Unit Tests

    grunt

### Packaging

    grunt pack

### Cleaning

    grunt clean

## Version

* 1.0.1

## Change History

#### Changes in `1.0.1` (August 5, 2015)

* Migrate a seed project.

#### Changes in `1.0.0` (March 16, 2015)

* Initial Release
