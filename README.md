# ebook

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

注意：epubjs0.3.8x版本对于on事件有兼容性问题，touch事件都事无效的，我们可以打开package.json文件将其版本修改为0.3.71，注意不要带^，然后在命令行中执行npm install和npm run serve就可以了