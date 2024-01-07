
How to bundle JS npm libs for the web:

1. install webpack

	npm install webpack webpack-cli --save-dev

2. use a webpack.config.js file like the one in this folder
Note: You can edit the file names or just edit the outputed bundle name.

3. edit the entry.js file to import your library and set it's global

4. run webpack

	 npx webpack