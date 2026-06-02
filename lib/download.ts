export type Platform = 'mac' | 'windows' | 'linux'
export type Arch = 'arm64' | 'x64'

export interface DownloadEntry {
  platform: Platform
  arch: Arch
  ext: string
  url: string
}

// 下载源：GitHub 公开 release 下载根（https://github.com/<owner>/<repo>/releases/download）。
// 最终 URL = `${BASE}/v${VERSION}/${filename}`；若改用 OSS/R2 扁平存储，去掉 buildUrl 里的 `v${VERSION}/` 段。
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
    case 'linux': {
      // electron-builder 的 AppImage 把 x64 命名为 x86_64
      const linuxArch = arch === 'x64' ? 'x86_64' : arch
      return `${PRODUCT}-Linux-${VERSION}-${linuxArch}.AppImage`
    }
  }
}

function buildUrl(platform: Platform, arch: Arch): string {
  return `${BASE}/v${VERSION}/${fileName(platform, arch)}`
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
