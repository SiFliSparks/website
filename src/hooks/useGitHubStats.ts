import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  openIssues: number
  language: string
  updatedAt: string
}

interface UseGitHubStatsResult {
  stats: GitHubStats | null
  loading: boolean
  error: string | null
}

export const useGitHubStats = (githubUrl: string): UseGitHubStatsResult => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)
        setError(null)

        // 从GitHub URL提取owner和repo
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
        if (!match) {
          throw new Error('Invalid GitHub URL format')
        }

        const [, owner, repo] = match
        const cleanRepo = repo.replace(/\.git$/, '') // 移除.git后缀

        // 调用GitHub API
        const apiUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Repository not found')
          } else if (response.status === 403) {
            throw new Error('API rate limit exceeded')
          } else {
            throw new Error(`API request failed: ${response.status}`)
          }
        }

        const data = await response.json()

        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
          openIssues: data.open_issues_count || 0,
          language: data.language || 'Unknown',
          updatedAt: data.updated_at || ''
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch GitHub stats'
        setError(errorMessage)
        console.warn(`Failed to fetch GitHub stats for ${githubUrl}:`, errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (githubUrl) {
      fetchGitHubStats()
    } else {
      setLoading(false)
      setError('No GitHub URL provided')
    }
  }, [githubUrl])

  return { stats, loading, error }
}

// 缓存机制 - 避免重复请求相同的仓库
const statsCache = new Map<string, { data: GitHubStats; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

export const useGitHubStatsWithCache = (githubUrl: string): UseGitHubStatsResult => {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWithCache = async () => {
      try {
        setLoading(true)
        setError(null)

        // 检查缓存
        const cached = statsCache.get(githubUrl)
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          setStats(cached.data)
          setLoading(false)
          return
        }

        // 从GitHub URL提取owner和repo
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
        if (!match) {
          throw new Error('Invalid GitHub URL format')
        }

        const [, owner, repo] = match
        const cleanRepo = repo.replace(/\.git$/, '')

        // 调用GitHub API
        const apiUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            // 如果有GitHub token，可以在这里添加
            // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          }
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Repository not found')
          } else if (response.status === 403) {
            throw new Error('API rate limit exceeded')
          } else {
            throw new Error(`API request failed: ${response.status}`)
          }
        }

        const data = await response.json()

        const newStats: GitHubStats = {
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
          openIssues: data.open_issues_count || 0,
          language: data.language || 'Unknown',
          updatedAt: data.updated_at || ''
        }

        // 更新缓存
        statsCache.set(githubUrl, {
          data: newStats,
          timestamp: Date.now()
        })

        setStats(newStats)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch GitHub stats'
        setError(errorMessage)
        console.warn(`Failed to fetch GitHub stats for ${githubUrl}:`, errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (githubUrl) {
      fetchWithCache()
    } else {
      setLoading(false)
      setError('No GitHub URL provided')
    }
  }, [githubUrl])

  return { stats, loading, error }
}