# Automated Testing Project

git clone https://github.com/brAndy-SI/LoopQA-Test-Project.git

This project contains automated tests for a web application.  
Tests can be executed either in a Docker container or directly on the host machine.  
Below are the instructions for both methods.  

Data managed in `src/data/testCases.json`

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Running Tests in Docker](#running-tests-in-docker)
3. [Running Tests Locally](#running-tests-locally)

---

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (if running locally): [Download Node.js](https://nodejs.org/)
- **Docker** (if running in containers): [Download Docker](https://www.docker.com/products/docker-desktop)
- **Make** (optional for Linux/macOS): Ensure `make` is installed for convenience.
- **Allure** (optional for opening reports)

---

## Running Tests in Docker

Follow these steps to execute the tests in Docker:

1. **Set environment variables:**
   Create .env file in root dir and put there
   ```bash
   LOGIN=yourLogin
   PASSWORD=yourPassword

2. **Build the Docker image:**
   Run the following command to build the Docker image:
   ```bash
   make build

3. **Run:**
   Run the following command to launch tests:
   ```bash
   make run - will run on chromium only, you can redefine it in Makefile
   make run BROWSERS=firefox
   make run BROWSERS=firefox,webkit
   make run BROWSERS=firefox,webkit,chromium

4. **See reports:**
   Run the following command to see results:
   ```bash
   make report

## Running Tests Locally
1. **Set environment variables:**
   Create .env file in root dir and put there
   ```bash
   LOGIN=yourLogin
   PASSWORD=yourPassword

2. **Install deps:**
   Run the following command to install necesarry deps:
   ```bash
   npm install

3. **Run script:**
   Run the following command to launch tests:
   ```bash
   npm test - run on chromium only and headless=true 
   Redefine default walues in playwright.config.ts or use it dynamic 
   npx cross-env BROWSERS=firefox,webkit HEADLESS=false npx playwright test

4. **See reports:**
   Run the following command to see results:
   ```bash
   make report or allure serve ./allure-results