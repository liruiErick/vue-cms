## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	    |-- api                 	       // 调取接口文件
	    |-- assets                       // 静态资源
	    |       |-- images               // 图片文件
	    |       |-- styles               // 样式文件
	    |-- components                   // 组件
      |-- router                 	     // 路由配置文件
      |-- store                 	     // 状态管理文件
      |-- utils                 	     // 公共类方法
      |-- views                   	   // 主要页面
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 项目说明

## 安装步骤 ##

	git clone http:http://192.168.66.75/java-bj/david-client.git       // 把项目下载到本地
	cd david-client                                               // 进入目录
	npm install                                                   // 安装项目依赖，等待安装完成之后

## 本地开发 ##

 // 开启服务器，浏览器访问 http://localhost:8866
	npm run dev


## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 注意事项

