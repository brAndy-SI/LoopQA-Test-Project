DOCKER_IMAGE := loopqa-test-project
REPORTS_DIR := ./allure-results
CONTAINER_NAME := test-container
ENV_FILE ?= .env

BROWSERS ?= chromium,firefox # Specify browsers, without space

# Build docker image
build:
	docker build -t $(DOCKER_IMAGE) .

# test run
run:
ifdef CI
	docker run --rm \
		-e LOGIN=$(LOGIN) \
		-e PASSWORD=$(PASSWORD) \
		-e BROWSERS=$(BROWSERS) \
		-e HEADLESS=$(HEADLESS) \
		$(DOCKER_IMAGE)
else
	make clean-reports
	docker run --name $(CONTAINER_NAME) \
		--env-file $(ENV_FILE) \
		-e BROWSERS=$(BROWSERS) \
		-e HEADLESS=$(HEADLESS) \
		$(DOCKER_IMAGE)
	docker cp $(CONTAINER_NAME):/app/allure-results $(REPORTS_DIR)
	docker rm -f $(CONTAINER_NAME)
endif

debug:
	docker run --rm -it \
		--env-file $(ENV_FILE) \
		-e BROWSERS=$(BROWSERS) \
		-e HEADLESS=$(HEADLESS) \
		$(DOCKER_IMAGE) bash

report:
	@echo BROWSERS=$(BROWSERS) > $(REPORTS_DIR)/environment.properties
	allure generate $(REPORTS_DIR) -o ./allure-report --clean
	allure open ./allure-report

serve:
	allure open ./allure-report

clean-reports:
	@if exist $(REPORTS_DIR) powershell -Command "Remove-Item -Recurse -Force $(REPORTS_DIR)"
	@if exist allure-report powershell -Command "Remove-Item -Recurse -Force allure-report"

clean-containers:
	@for /f "tokens=*" %%i in ('docker ps -aq --filter "ancestor=$(DOCKER_IMAGE)"') do docker rm -f %%i

clean-images:
	@for /f "tokens=*" %%i in ('docker images -q $(DOCKER_IMAGE)') do docker rmi -f %%i

