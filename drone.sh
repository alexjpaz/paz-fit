pushd src/node
npm install
./node_modules/.bin/bower install
./node_modules/.bin/grunt

popd
sed -i "s/{{GIT_COMMIT}}/${GIT_COMMIT:=none}/" src/app.yaml
sed -i "s/{{BUILD_ID}}/${BUILD_ID:=none}/" src/app.yaml
