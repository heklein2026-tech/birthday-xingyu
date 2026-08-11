# 王星宇 · 23 岁生日祝福站

手机竖屏优先的交互祝福页：拆信封 → 昼夜海岸一日旅程 → 点星收集祝福 → 终章寄语与《才二十三》。

## 本地预览

用任意静态服务器打开本目录（勿直接用 `file://`，以免部分浏览器限制音频）：

```bash
# 在 birthday-xingyu 目录下
npx --yes serve .
```

iPhone 预览：同一 Wi‑Fi 下用电脑 IP 访问，或部署到任意 HTTPS 静态托管后发链接。

## 放入照片（6–8 张）

把她的照片放到 `assets/photos/`，命名为：

- `01.jpg` … `08.jpg`（竖图优先，建议约 1200px 宽）

未放入真实照片时，会自动使用同目录下的 `01.svg` … `08.svg` 占位图。若只有 6 张，可删掉 HTML 里第 7、8 站，或保留占位。

## 放入音乐

将《才二十三》音频文件命名为：

`assets/audio/才二十三.mp3`

音乐仅在她点击「音乐」或终章播放按钮后开始（符合 iOS Safari 自动播放规则）。

## 修改文案

- 途中短句：编辑 `index.html` 各 `.stop-line` / `figcaption`
- 点星祝福词：编辑 `app.js` 顶部的 `WISHES` 数组
- 终章完整祝福：编辑 `#finaleLetter` 内段落

## 目录结构

```
birthday-xingyu/
  index.html
  styles.css
  app.js
  README.md
  assets/
    photos/   # 01.jpg … 08.jpg
    audio/    # 才二十三.mp3
```
