# usage

build

```sh
docker build -t note .
```

windows: powershell

```ps1
$env:docroot="X:\path-to-docroot" ; ./startup.ps1
```

linux: shell

```sh
export docroot="/path-to-docroot" ; ./startup.sh
```

# other

window

```js
npm install && npm ./app.js;
//要开放80端口
```

linux

```sh
npm install && npm ./app.js;
//80端口
```

>在使用前要在public/目录下创建doc 文件夹，存放md文档