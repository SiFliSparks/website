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
      name: "SiFli IoT Gateway",
      description: "基于SiFli芯片的高性能物联网网关，支持多种通信协议和设备连接",
      thumbnail: "iot-gateway.jpg",
      tags: ["IoT", "网关", "通信", "嵌入式"],
      github_url: "https://github.com/sifli-sparks/iot-gateway"
    },
    {
      name: "SiFli Audio Processor",
      description: "专业级音频处理器，提供低延迟、高保真的音频处理能力",
      thumbnail: "audio-processor.jpg",
      tags: ["音频", "处理器", "实时", "DSP"],
      github_url: "https://github.com/sifli-sparks/audio-processor"
    },
    {
      name: "SiFli Sensor Hub",
      description: "集成多种传感器的数据收集和处理中心，支持实时监控和数据分析",
      thumbnail: "sensor-hub.jpg",
      tags: ["传感器", "数据", "监控", "物联网"],
      github_url: "https://github.com/sifli-sparks/sensor-hub"
    },
    {
      name: "SiFli Display Driver",
      description: "高效的显示驱动程序，支持多种显示设备和界面框架",
      thumbnail: "display-driver.jpg",
      tags: ["显示", "驱动", "GUI", "嵌入式"],
      github_url: "https://github.com/sifli-sparks/display-driver"
    },
    {
      name: "SiFli Wireless Stack",
      description: "完整的无线通信协议栈，支持WiFi、蓝牙等多种无线技术",
      thumbnail: "wireless-stack.jpg",
      tags: ["无线", "WiFi", "蓝牙", "协议栈"],
      github_url: "https://github.com/sifli-sparks/wireless-stack"
    },
    {
      name: "SiFli Power Manager",
      description: "智能电源管理系统，优化设备功耗和电池生命周期",
      thumbnail: "power-manager.jpg",
      tags: ["电源", "功耗", "电池", "节能"],
      github_url: "https://github.com/sifli-sparks/power-manager"
    }
  ]
}