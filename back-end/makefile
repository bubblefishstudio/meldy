.PHONY: deploy

requirements.txt: pdm.lock
	pdm export --without-hashes -o $@
	# pdm adds --index-url, but deta can't parse it correctly
	# so we need to remove it
	sed -i '' '/^--index-url/d' $@

deploy: requirements.txt
	deta deploy
