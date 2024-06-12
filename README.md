# Regexgame

This game aims to improve a users understanding of regular expressions.

## Build and run with docker
To run your local version of the repository, the `docker-compose.yaml` file is used.
Use the following command in the directory of the file to start up the containers:
```bash
docker compose up --build
```
You can access the minigame directly via [`http://localhost/minigames/regexgame`](http://localhost/minigames/regexgame/).


## Run for development with hot reload
If you wish to run the minigame with hot reload in development mode, use the `docker-compose-dev.yaml` file.
While using VSCode, make sure you have the [`Live Server`](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension installed, and the live server is active.
You can start the live server by using the `Go Live` button in the bottom right corner of VSCode.

You can the use the following commands to start up the dependencies in docker and the game itself with npm:
```bash
docker compose -f docker-compose-dev.yaml up
```
and
```bash
npm run dev
```

The minigame is directly available via [`http://localhost/minigames/regexgame`](http://localhost/minigames/regexgame/).


## Local backend
If you wish to also have the backend running locally on your machine, follow the steps of 
[Run for development with hot reload](#run-for-development-with-hot-reload) 
but use the `docker-compose-dev-e2e.yaml` instead.\
You can then get the [`regexgame-backend`](https://github.com/Gamify-IT/regexgame-backend) and run it locally.

## More information
For more information about docker check the [manual for docker-compose](https://github.com/Gamify-IT/docs/blob/main/dev-manuals/languages/docker/docker-compose.md).\
For more information about the game see [usermanual for regexgame](https://gamifyit-docs.readthedocs.io/en/latest/user-manuals/minigames/regexgame.html).\
The general documentation can be found [here](https://gamifyit-docs.readthedocs.io/en/latest/index.html).