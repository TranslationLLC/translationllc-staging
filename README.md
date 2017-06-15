To add a dev collaborator, simply go to Settings > Collaborators.
Collaborator should then clone the repo and install the application (npm i).
Run "gulp" from the project root to minify/gzip HTML, CSS, and JavaScript.
Running "node index" will start the application on localhost:3000.
These compiled files are stored in public/dist. CSS, JavaScript, and image assets will be served relative to the index.html file.
To upload the files to the WordPress server, SFTP them to translationllc/newsite. 
dist, fonts, and assets directories should share a root directory with index.html.
That's it!
