# vue-init

## 风格指南
参照 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide/advanced/style-guide.html#风格指南) 风格指南
- Component  
所有的Component文件都是以大写开头 (PascalCase)，这也是官方所推荐的。但除了 index.vue。
    - @/components/BackToTop/index.vue
    - @/components/Charts/Line.vue
    - @/views/example/components/Button.vue

- JS 文件  
所有的.js文件都遵循横线连接 (kebab-case)。
    - @/utils/open-window.js
    - @/views/svg-icons/require-icons.js
    - @/components/MarkdownEditor/default-options.js

- Views  
在views文件下，代表路由的.vue文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则。(页面的url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一)。
    - @/views/svg-icons/index.vue
    - @/views/svg-icons/require-icons.js

## 目录结构
vue-init  
├── public  
│   ├── index.html (html模板)  
│   └── static (静态文件)  
│       ├── images (图片)  
│       └── js (js文件)  
├── src  
│   ├── components 全局组件  
│   ├── directives 全局指令  
│   ├── filters 全局过滤器  
│   ├── mixins 混入  
│   ├── http 接口请求封装  
│   ├── layout    
│   ├── router 路由  
│   ├── store 状态管理  
│   ├── styles 样式  
│   │   ├── iconfont 字体样式    
│   │   ├── index.scss 全局样式  
│   │   ├── mixins.scss 混入  
│   │   ├── reset.scss 初始化样式  
│   │   └── theme.scss 主题  
│   ├── utils 工具函数  
│   ├── views 页面  
│   │   ├── home 模块1   
│   │   │   ├── about 子模块  
│   │   │   └── home.vue  
│   │   ├── login 模块2  
│   │   │   └── login.vue  
│   │   └── store 模块3  
│   │       ├── components 模块组件  
│   │       ├── goods-comment 子模块1  
│   │       ├── goods-detail 子模块2  
│   │       │   ├── components 子模块组件  
│   │       │   └── goods-detail.vue  
│   │       └── store.vue  
│   ├── App.vue  
│   └── main.js 入口js  
├── .env 环境变量    
├── package.json  
├── postcss.config.js 适配  
├── README.md  
└── vue.config.js 拓展webpack配置  
