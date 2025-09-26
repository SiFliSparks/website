// TOML 解析工具
// 在实际项目中，这里会处理编译时的 TOML 文件解析

export interface Project {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  github_url: string
}

export const parseToml = (_tomlContent: string): Project[] => {
  // 这里是占位函数，实际应该使用 @toml-tools/parser 来解析 TOML 内容
  // 在 Vite 构建过程中，可以通过插件来处理 TOML 文件
  return []
}

// 模拟从 TOML 文件加载项目数据
export const loadProjects = async (): Promise<Project[]> => {
  // 在实际项目中，这里会在构建时读取 projects.toml 文件
  // 并解析成 Project 对象数组
  return [
    {
      name: "React",
      description: "用于构建用户界面的 JavaScript 库，采用组件化开发模式",
      thumbnail: "react.jpg",
      tags: ["JavaScript", "前端", "组件", "React"],
      github_url: "https://github.com/facebook/react"
    },
    {
      name: "Vue.js",
      description: "渐进式 JavaScript 框架，易学易用，性能出色且功能丰富",
      thumbnail: "vue.jpg",
      tags: ["JavaScript", "前端", "框架", "Vue"],
      github_url: "https://github.com/vuejs/vue"
    },
    {
      name: "TypeScript",
      description: "JavaScript 的超集，添加了类型系统和最新的 ECMAScript 特性",
      thumbnail: "typescript.jpg",
      tags: ["TypeScript", "编程语言", "微软", "类型安全"],
      github_url: "https://github.com/microsoft/TypeScript"
    },
    {
      name: "Vite",
      description: "下一代前端构建工具，提供极快的开发体验和优化的生产构建",
      thumbnail: "vite.jpg",
      tags: ["构建工具", "开发工具", "前端", "Vue"],
      github_url: "https://github.com/vitejs/vite"
    },
    {
      name: "Node.js",
      description: "基于 Chrome V8 引擎的 JavaScript 运行时，用于构建快速的服务器端应用",
      thumbnail: "nodejs.jpg",
      tags: ["JavaScript", "服务端", "运行时", "开源"],
      github_url: "https://github.com/nodejs/node"
    },
    {
      name: "Tailwind CSS",
      description: "实用工具优先的 CSS 框架，用于快速构建自定义设计",
      thumbnail: "tailwind.jpg",
      tags: ["CSS", "框架", "设计", "前端"],
      github_url: "https://github.com/tailwindlabs/tailwindcss"
    }
  ]
}