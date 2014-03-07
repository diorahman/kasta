test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		test.js

.PHONY: test