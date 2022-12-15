# SOP Organizer 1

This project aims to create an online tool that allows research laboratories to organize their lab protocols (commonly referred to as Standard Operation Procedures, or SOPs). SOPs are written protocols of how to perform a particular lab procedure (such as operating an instrument or conducting an experiment). SOPs are critical components of a research lab, but it is a common problem that many laboratories have SOPs scattered everywhere and often in non-standard formats, which makes it difficult to find and update SOPs or comply with the increasingly stricter requirement from the EHS. Therefore, this tool will provide a centralized location for organizing and accessing SOPs; it will be of great use to researchers.


## Quick Install Guide

**Install Python:**

For Linux: 

`sudo apt update`

`sudo apt install python3`

For Windows:

[Pytohn3](https://www.python.org/downloads/)


**Install Djanjo:**

You can find more info in https://docs.djangoproject.com/en/4.1/

`python -m pip install Django`

**Install Node.js:**

We recommend use the latest version 

https://nodejs.org/en/download/current/

For Linux:

`sudo apt update`

`sudo apt install nodejs`

**Install Vue-cli:**

`npm install -g @vue/cli`

`npm install -g @vue/cli-service`

**Install Djangor Rest Framework:**

`pip install djangorestframework`

**Install djoser:**

`pip install djoser`

**Install django-cors-headers:**

`pip install django-cors-headers`

**Install django-notifications-hq:**

`pip install django-notifications-hq`

**Install pathlib:**

`pip install pathlib`

**Install GitPython:**

`pip install GitPython`

**Install Element-plus:**

`npm install element-plus --save`

`cd frontend` and `npm install` to install all the frontend packages.

## How to run the project on localhost?
1. `cd frontend/node_modules/@syncfusion/ej2-filemanager-node-filesystem`
2. run `node filesystem-server.js -d yourpath/frontend/public/media/SOPs/Documents`

    For example:

    `node filesystem-server.js -d /home/anji/Desktop/402/SOP-Organizer-1/media/Documents`

    **if you close the port, you have to completely close your terminal and open a new one under the same directory, otherwise, it will not work.**

## How to run the PDF Viewer server and document editor server?
You must have docker install on your pc

1. `cd PDF` or `cd DOC` and edit the docker-compose.yml 

    For example:

    volumes:
    - /yourpath/SOP-Organizer-1/media/Documents:/app/Data

2. `docker compose up` 


## Local Develop

For start the backend server:

`python manage.py runserver`

For Start the vue:

`npm run serve`


## How to Deploy to Server

**Using apache**

Start Apache to serve the website

`sudo systemctl start httpd`

Configure the document root to be under /var/www/html, this will be under /etc/httpd/conf

Configue SELinux to give access to this folder


**Cloning the project to the server**

Clone the project to the server.

**Go to the directory where you have cloned the server and go to the frontend folder**

`cd frontend`

**Install the dependencies for npm**

`npm install`

**Create the production build of the frontend**

`npm run build`

**By default this will store the build in a folder called 'dist' in the frontend folder. Move the contents of this folder to /var/www/html**

`mv dist/* /var/www/html`


**Docker**

Pull the docker image that is provided at xuanji86/402dev

`docker pull xuanji86/402dev`

Run the docker container and expose the 8000 port, while also making it interactive using this commang

`docker run -it --name organizer-backend -p 8000:8000 xuanji86/402dev:latest bash`

This will put you into the docker container. From here you should go to the my_env directory

`cd /home/my_env`

At this point you should activate my_env by entering the command:

`source bin/activate`

Now you should pull the git repo again into this docker container.

After this is done go into the repository that you've pulled and run the command:

`python manage.py runserver`

Now you may exit this docker container using:

`exit()`


Now you need to run the document editor container. So we will run the commands to pull it and to run it:

`docker pull xuanji86/word-server`

`docker run -it --name word-server -p 6002:6002 xuanji86/word-server`

Finally we need to run  the pdfviewer-server. So run the commands to use this:

`docker pull syncfusion/pdfviewer-server`

`docker run -it --name pdf-viewer -p 8080:8080 syncfusion/pdfviewer-server`


With that your server should be working and completely deployed!

## Reference

**Document Editor**

https://ej2.syncfusion.com/vue/documentation/document-editor/getting-started/

**Document Editor Docker server project**

https://github.com/SyncfusionExamples/Word-Processor-Server-Docker

**PDF Viewer**

https://ej2.syncfusion.com/vue/documentation/pdfviewer/getting-started/


**file manager**

https://ej2.syncfusion.com/vue/documentation/file-manager/getting-started/

**File system provider**

https://ej2.syncfusion.com/vue/documentation/file-manager/file-system-provider/
