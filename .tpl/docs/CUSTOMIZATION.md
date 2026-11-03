# 修改指南

品牌与联系方式修改 config/brand.ts。消费方品牌使用 host.tsx 的 Provider，不把某一宿主配置写进通用页面。颜色、圆角、宽度、字号、间距、滚动条统一改 tokens.css；特殊布局改 theme.css，并分别检查 1440、834、390 和 320px。

滚动条配色、宽度与圆角使用 tokens.css 的 `--sl-scroll-*` 变量，规则在 scrollbars.css。整页采用深棕轨道，浅色弹窗使用木色滑块，深色横向货架继承深色组；悬停与拖动状态分别定义。桌面使用原生滚动槽稳定布局，触屏与强制高对比模式保留系统行为。不要通过隐藏溢出或移除滚动条处理布局问题，也不要把模板滚动条规则扩展到其他页面。

商品、类别、套餐和课程在 content/catalog.ts 编辑，商品 ID 必须唯一，套餐引用实际商品且价格小于商品合计。中英文字段一起修改。内容集合变化后检查卡片计数、筛选、课程目录与价格。手记和政策在 content/editorial.ts，路由新增同步 meta.tsx 与 .tpl/template.json。

运行图片与字体在 public/templates/shelfline，来源与摘要在 asset-sources.json。不得将不明授权素材标记为可商业分发。展示图在 .tpl/assets，应重新拍摄而非放大或复用旧图。修改场景分别查看 components/Scenes.tsx、IntroLoader.tsx、Motion.tsx、sections.tsx 与 products.tsx；保留减少动态设置、原生触控、键盘与焦点返回。

演示表单在 components/forms.tsx。接真实服务属于新增需求，需要明确应用接口、错误、数据与支付边界，不能让“校验通过”暗示发送成功。检查按 project.json 执行，不因阅读文档触发安装、发布或推送。
