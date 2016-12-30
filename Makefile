PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash

UNAME_S := $(shell uname -s)

NODE ?= $(shell which node)
YARN ?= $(shell which yarn)
PKG ?= $(if $(YARN),$(YARN),$(NODE) $(shell which npm))

.FORCE:

all: lint clean
	babel src -d dist --source-maps

clean: .FORCE
	rimraf npm-debug.log dist

dependencies: package.json
	$(PKG) install

test: lint-test all
	mocha

lint: .FORCE
	eslint src

lint-test: .FORCE
	eslint test
