export type Platform = 'mac' | 'windows' | 'linux'
export type Arch = 'arm64' | 'x64'

export interface DownloadEntry {
  platform: Platform
  arch: Arch
  ext: string
  url: string
}

// Download source: the permanent latest/download URL root for GitHub public releases.
// Format: https://github.com/<owner>/<repo>/releases/latest/download
// Artifact names omit the version number → always point to the latest release, so the official site needs no changes or rebuilds when a new game version ships.
const BASE = (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL ?? '').replace(/\/$/, '')

// Keep these consistent with the game's electron-builder ASCII artifact names (which also omit the version number).
const PRODUCT = 'SnoozeYouLose'

// Latest release page (without the trailing /download), used as the link for the "Latest version" badge.
export const latestReleaseUrl = BASE.replace(/\/download$/, '')

function fileName(platform: Platform, arch: Arch): string {
  switch (platform) {
    case 'mac':
      return `${PRODUCT}-Mac-${arch}-Installer.dmg`
    case 'windows':
      return `${PRODUCT}-Windows-Setup.exe`
    case 'linux': {
      // electron-builder names the x64 AppImage x86_64
      const linuxArch = arch === 'x64' ? 'x86_64' : arch
      return `${PRODUCT}-Linux-${linuxArch}.AppImage`
    }
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
