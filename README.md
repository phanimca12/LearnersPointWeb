# AWD-NG

> AWD Angular workspace project

**awd-ng** is an Angular project workspace that is intended to be the container for all Angular development for AWD-Web, starting with AWD 21.1 release.

Previously, Angular projects for AWD have been implemented as independent projects, i.e. with no code sharing, etc.

Currently the workspace consists of only two projects:

- **awd-ng-lib**: library of modules to be shared across application projects
- **processor-app**: the new modernized implementation of the Processor workspace

However, eventually, the goal is to move the other existing Angular projects (Dynamic Forms, Design Studio) into this workspace, if possible.

## Installing / Getting Started

To set up project for local development:

```shell
npm install
```

(Note: this can sometimes take 5-10 min to complete)

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

### AWD Proxy Setup

To run any of the applications in this workspace locally, you must provide configuration to connect to an AWD environment, so that all API calls can be proxied to that environment.

- Open the _awd-proxy.json.tmpl_ file and enter the host, (AWD) username, and (AWD) user password information
- If you are working within the DST network, will also need to include your WSS Master credentials within the dstProxyUrl property
- If you are NOT working within DST network, will need to delete that line
- Do a File->Save-As to create a _awd-proxy.json_

### Running Locally

To do a build of the libraries and build/run the default application (which is currently Processor app, since its the only app), run the following

```shell
npm run start
```

If you do not need to re-build the libraries (which can take a few min), and just need to re-build/start the application, can run the following

```shell
npm run quick-start
```

During start-up, the script does a verication to check it can connect to the specified AWD environment/user provided in the _awd-proxy.json_

If it can connect, and the build is successful, it will automatically open a browser to run the application.

## Testing

Any and all coding updates should be accompanied by appropriate unit-testing.

### Running tests locally

There are script commands for executing the unit-tests for each of the individual libraries and applications locally. These scripts will start the karma server, execute the tests,
and remain running to watch for updates so that it can re-execute the tests.

```shell
npm run test:<project-name>
```

### Running tests within CI pipeline

There are separate script commands for executing the in a CI fashion. When running these, the unit-testing will do a single execution of all tests in a headless browwser, and then stop.

```shell
npm run ci-test:<project-name>
```

There is also a shortcut for executing tests across all projects

```shell
npm run ci-test:all
```
