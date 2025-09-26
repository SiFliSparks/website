#!/usr/bin/env node

/**
 * TOML 验证工具
 * 用于验证 projects.toml 文件的语法和结构
 */

import * as fs from 'fs'
import * as path from 'path'
import * as TOML from '@iarna/toml'

interface Project {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  github_url: string
}

interface TomlConfig {
  projects: Record<string, Project>
}

const validateToml = (filePath: string): boolean => {
  try {
    console.log(`🔍 验证 TOML 文件: ${filePath}`)
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      console.error(`❌ 文件不存在: ${filePath}`)
      return false
    }
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8')
    console.log(`📖 文件大小: ${content.length} 字节`)
    
    // 解析TOML
    const parsed = TOML.parse(content) as unknown as TomlConfig
    console.log(`✅ TOML 语法验证通过`)
    
    // 检查结构
    if (!parsed.projects) {
      console.error(`❌ 缺少 [projects] 部分`)
      return false
    }
    
    const projectIds = Object.keys(parsed.projects)
    console.log(`📦 找到 ${projectIds.length} 个项目:`)
    
    let isValid = true
    
    // 验证每个项目
    projectIds.forEach((id, index) => {
      const project = parsed.projects[id]
      console.log(`\n${index + 1}. 项目ID: ${id}`)
      
      // 验证必需字段
      const requiredFields = ['name', 'description', 'thumbnail', 'tags', 'github_url']
      const missingFields: string[] = []
      
      requiredFields.forEach(field => {
        if (!project[field as keyof Project]) {
          missingFields.push(field)
        }
      })
      
      if (missingFields.length > 0) {
        console.error(`   ❌ 缺少必需字段: ${missingFields.join(', ')}`)
        isValid = false
      } else {
        console.log(`   ✅ 所有必需字段都存在`)
      }
      
      // 验证字段类型
      if (project.name && typeof project.name !== 'string') {
        console.error(`   ❌ name 必须是字符串`)
        isValid = false
      }
      
      if (project.tags && !Array.isArray(project.tags)) {
        console.error(`   ❌ tags 必须是数组`)
        isValid = false
      }
      
      if (project.github_url && !project.github_url.includes('github.com')) {
        console.warn(`   ⚠️  github_url 可能不是有效的 GitHub URL: ${project.github_url}`)
      }
      
      // 显示项目信息
      if (project.name) console.log(`   📛 名称: ${project.name}`)
      if (project.tags) console.log(`   🏷️  标签: ${project.tags.join(', ')}`)
      if (project.github_url) console.log(`   🔗 GitHub: ${project.github_url}`)
    })
    
    if (isValid) {
      console.log(`\n🎉 验证通过！所有项目配置都正确。`)
    } else {
      console.log(`\n❌ 验证失败！请修复上述错误。`)
    }
    
    return isValid
    
  } catch (error) {
    console.error(`❌ TOML 解析错误:`, error)
    return false
  }
}

// 主程序
const main = () => {
  const tomlPath = path.join(process.cwd(), 'public', 'projects.toml')
  
  console.log(`🚀 SiFli Sparks TOML 验证工具\n`)
  
  const isValid = validateToml(tomlPath)
  process.exit(isValid ? 0 : 1)
}

// 直接运行
main()

export { validateToml }