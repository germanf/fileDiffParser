REPORTER = nyan

test:
	@NODE_TLS_REJECT_UNAUTHORIZED=0 ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--check-leaks \
		--recursive

.PHONY: test