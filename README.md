# CoronaInfo

## Introduction

App designed to supply information regarding the Corona Virus. Created by Will Hunter, Jakob Braunschweiger, Michael Ginn, and Giorgio Guttilla. Envisioned and Designed by Satvik Sethi.

#### Process

How the App works

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Project Status](#project-status)
  - [Recently added](#recently-added)
  - [To Do](#to-do)
  - [Bugs](#bugs)
- [Technologies](#technologies)
- [Walkthroughs](#Walkthroughs)
  - [Backend](#Backend)
  - [Mobile](#Mobile)
  - [Web Application](#web-application)
- [Contact](#Contact)

## Project Status

###### **Version 0.0.1**

No Progress has been made. Groundwork has been set and base files created.

### **Recently Added**

- [x] Created this README as a guide to the application.
- [x] Create base files for each part of the project.
- [x] Deploy prototype to Github pages.
- [x] Created backend functionality to retrieve data on spread of disease.
  - [x] Added a various functionality such as asking for a specific date or state.

### To Do:

- [ ] Figure out which technologies we want to use.
- [ ] Begin laying the framework for the mobile app based on the prototype.
  - [ ] Ensure scalability while completing the process as fast as possible.
- [ ] Figure out which data sources and other resources we want to use.
  - [ ] Obtain and parse the data from the sources.
    - [x] Look for Corona Virus tracker (preferably real-time).
    - [ ] Look for a list of places people with the virus can go.
    - [ ] Pull RSS news feed from sites that are related to Corona.
  - [ ] Visualize the data either by using python or a react package.
    - [ ] Use Google Maps API
- [ ] Work out basic backend capabilities

### Bugs:

- [ ] Security Vulnerability with Expo's dependencies, particularly mem, the issue is that it is a dependency of react-native, but it has a security flaw. This needs to be fixed fast.

## Technologies:

Project was created with:

- React
- React Native
  - Expo
- Express
- MongoDB
  - Mongoose
- Python Version: 3.7

## Walkthrough:

### Backend:

Started a very basic express backend, but we can use something else.

### Mobile

Using React Native, specifically Expo to develop both an IOS and Android versions at the same time.

### Web Application:

If we are using React Native it will be easy to convert it to a Web Application. Using React.

## Contact

Contact Will Hunter (wlhunter00@gmail.com) or Satvik Sethi (ssethi1@binghamton.edu) with any questions.
