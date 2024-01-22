## Deployment to Heroku
Setting up backend and frontend apps on Heroku:
```bash
$ heroku create -a backend-app
$ heroku create -a client-app

$ heroku buildpacks:add -a backend-app heroku-community/multi-procfile
$ heroku buildpacks:add -a client-app heroku-community/multi-procfile

$ heroku config:set -a backend-app PROCFILE=apps/client/Procfile
$ heroku config:set -a client-app PROCFILE=apps/backend/Procfile

$ heroku buildpacks:set -a backend-app https://github.com/unfold/heroku-buildpack-pnpm
$ heroku buildpacks:set -a client-app https://github.com/unfold/heroku-buildpack-pnpm

$ git push https://git.heroku.com/backend-app.git HEAD:main
$ git push https://git.heroku.com/client-app.git HEAD:main
```