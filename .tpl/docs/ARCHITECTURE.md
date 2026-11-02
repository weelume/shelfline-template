# 架构

`src/app/[[...slug]]/page.tsx` 从 meta.tsx 的统一注册表解析语言与 slug；未知路径返回真实 404。组件接收 locale 与 basePath，所有站内导航通过 Next Link/useRouter 客户端切换。`host.tsx` 将通用模板与消费方适配隔离。

业务源码位于 `src/features/site-templates/catalog/shelfline/`：config/brand.ts 管理品牌和动效时间；content/catalog.ts 管理商品、分类、套餐、FAQ、评价和课程；content/editorial.ts 管理手记和政策。tokens.css 定义颜色、字体、布局与滚动条，theme.css 管理模板范围内样式。

components 分别负责 Shell、可访问弹窗、购物车、表单、立体包装、标题/图片揭示、开场、滚动场景及通用内容区块。pages 只组合对应业务页面，不承载多类路由的大型分支。模块级购物车通过 useSyncExternalStore 订阅，保持客户端切页后的数据，仅存在于内存。

没有后端、数据库、外部发送或真实支付。开场标记不是个人数据。开发 debug 日志包含路由、商品 ID、数量、标题动画状态及校验结果；不记录姓名、邮箱、留言。复制链接失败返回明确提示并记录错误。
