// TOML 解析工具
import * as TOML from '@iarna/toml'

export interface Project {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  github_url: string
}

interface TomlProject {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  github_url: string
}

interface TomlConfig {
  projects: Record<string, TomlProject>
}

export const parseToml = (tomlContent: string): Project[] => {
  try {
    const parsed = TOML.parse(tomlContent) as unknown as TomlConfig
    
    if (!parsed.projects) {
      console.warn('No projects section found in TOML file')
      return []
    }

    const projects: Project[] = Object.values(parsed.projects).map((project: TomlProject) => ({
      name: project.name || '',
      description: project.description || '',
      thumbnail: project.thumbnail || '',
      tags: Array.isArray(project.tags) ? project.tags : [],
      github_url: project.github_url || ''
    }))

    return projects
  } catch (error) {
    console.error('Failed to parse TOML:', error)
    return []
  }
}

// 从公共目录加载 TOML 文件
export const loadProjects = async (): Promise<Project[]> => {
  // 在生产环境中，从public目录获取TOML文件
  const response = await fetch('/projects.toml')
  
  if (!response.ok) {
    throw new Error(`Failed to fetch projects.toml: ${response.status} ${response.statusText}`)
  }
  
  const tomlContent = await response.text()
  const projects = parseToml(tomlContent)
  
  if (projects.length === 0) {
    throw new Error('No valid projects found in TOML file')
  }
  
  console.log(`Loaded ${projects.length} projects from TOML file`)
  return projects
}