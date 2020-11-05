# t-full-page

造轮子之 TypeScript 编写 的 full-page 插件

使用 Rollup 构建

特性：

- 快速的构建全屏滚动页面
- 开箱即用，不依赖任何框架或库
- 适配 PC、移动端
- 文件体积极小，Gzip 压缩后仅 1kb 大小

![iShot2020-10-24 19.40.18.gif](http://ww1.sinaimg.cn/large/006iQgpIgy1gk0nrhx3hcg305c03gwfl.gif)

## 起步

### 安装依赖

```shell
npm i
```

### 开发

```shell
npm run serve
```

### 编译

```shell
npm run build
```

## 使用

```html
<div class="t-full-page">
  <div class="page">
    <div>内容 1</div>
  </div>
  <div class="page">
    <div>内容 2</div>
  </div>
  <div class="page">
    <div>内容 3</div>
  </div>
  <div class="page">
    <div>内容 4</div>
  </div>
</div>

<script src="../lib/bundle.umd.js"></script>
<script>
  new TFullPage()
</script>
```

## TODO

- [x] 第一个可用版本
- [x] 导航按钮
- [x] 移动端支持
- [ ] 支持多项配置

## License

MIT 一起来扣细节~
