export type Platform = 'mac' | 'windows' | 'linux'
export type Arch = 'arm64' | 'x64'

export interface DownloadEntry {
  platform: Platform
  arch: Arch
  ext: string
  url: string
}

// Download source: the GitHub public release download root (https://github.com/<owner>/<repo>/releases/download).
// Final URL = `${BASE}/v${VERSION}/${filename}`; if switching to flat OSS/R2 storage, remove the `v${VERSION}/` segment from buildUrl.
const VERSION = process.env.NEXT_PUBLIC_GAME_VERSION ?? '0.0.0'
const BASE = (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ?? '').replace(
  /\/$/,
  '',
)

// Keep this consistent with the ASCII artifact names produced by the game's electron-builder.
const PRODUCT = 'SnoozeYouLose'

function fileName(platform: Platform, arch: Arch): string {
  switch (platform) {
    case 'mac':
      return `${PRODUCT}-Mac-${VERSION}-${arch}-Installer.dmg`
    case 'windows':
      return `${PRODUCT}-Windows-${VERSION}-Setup.exe`
    case 'linux': {
      // electron-builder names the x64 AppImage x86_64
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
