# D3 词云插件 React 组件化 DEMO

##### [在线地址](http://furan.xyz/d3/)

## 大家这么忙还抽空看我的烂代码, 真是太感谢了.

#### 前端结构

使用 技术栈 `react` + `dva` + `umi` + `d3`

```js
d3Demo
|-- mock
|-- package.json
|-- src
|   |-- assets
|   |   `-- yay.jpg
|   |-- components                        //公用组件
|   |   |-- Example.js
|   |   `-- WordCloud.jsx                 //D3词云插件封装
|   |-- global.css                        //全局样式
|   |-- layouts                           //界面布局
|   |   |-- Header.js
|   |   `-- index.js
|   |-- models                            //全局store
|   |   `-- example.js
|   |-- pages                             //全部界面文件夹  下同 约定式路由 pages下每个文件夹为一个组件
|   |   |-- about                         //'About'组件主文件夹
|   |   |   |-- components                //'About'的子组件文件夹
|   |   |   |   `-- About.jsx
|   |   |   |-- index.js                  //About主文件
|   |   |   |-- models                    //About的Store
|   |   |   |   `-- about.js
|   |   |   `-- services                  //About的Api层
|   |   |       `-- about.js
|   |   |-- author
|   |   |   |-- components
|   |   |   |   `-- Author.jsx
|   |   |   |-- index.js
|   |   |   |-- models
|   |   |   |   `-- author.js
|   |   |   `-- services
|   |   |       `-- author.js
|   |   |-- index.css
|   |   |-- index.js
|   |   `-- job
|   |       |-- components
|   |       |   `-- Job.jsx
|   |       |-- index.js
|   |       |-- models
|   |       |   `-- job.js
|   |       `-- services
|   |           `-- job.js
|   |-- services                          //全局Api层
|   |   `-- example.js
|   `-- utils                             //全局工具
|       |-- getIn.js                      //参考immutable 的getIn, 用于安全的获取深层组件的值
|       |-- objIsNull.js                  //判断对象数组不会空
|       `-- request.js                    //fetch的封装
```
