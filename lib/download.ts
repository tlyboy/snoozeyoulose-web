export type Platform = 'mac' | 'windows' | 'linux'
export type Arch = 'arm64' | 'x64'

export interface DownloadEntry {
  platform: Platform
  arch: Arch
  ext: string
  url: string
}

// 部署时按区域填写：国内 → 阿里云 OSS，国际 → Cloudflare R2。
const VERSION = process.env.NEXT_PUBLIC_GAME_VERSION ?? '0.0.0'
const BASE = (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ?? '').replace(
  /\/$/,
  '',
)

// 与游戏 electron-builder 的 ASCII 产物名保持一致。
const PRODUCT = 'SnoozeYouLose'

function fileName(platform: Platform, arch: Arch): string {
  switch (platform) {
    case 'mac':
      return `${PRODUCT}-Mac-${VERSION}-${arch}-Installer.dmg`
    case 'windows':
      return `${PRODUCT}-Windows-${VERSION}-Setup.exe`
    case 'linux':
      return `${PRODUCT}-Linux-${VERSION}-${arch}.AppImage`
  }
}

function buildUrl(platform: Platform, arch: Arch): string {
  return `${BASE}/${fileName(platform, arch)}`
}

export const downloads: DownloadEntry[] = [
  { platform: 'mac', arch: 'arm64', ext: 'dmg', url: buildUrl('mac', 'arm64') },
  { platform: 'mac', arch: 'x64', ext: 'dmg', url: buildUrl('mac', 'x64') },
  {
    platform: 'windows',
    arch: 'x64',
    ext: 'exe',
    url: buildUrl('windows', 'x64'),
  },
  {
    platform: 'linux',
    arch: 'x64',
    ext: 'AppImage',
    url: buildUrl('linux', 'x64'),
  },
]

export const gameVersion = VERSION
