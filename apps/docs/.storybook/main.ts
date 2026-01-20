import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          'theo-kit': resolve(__dirname, '../../../packages/ui/src'),
        },
      },
      server: {
        watch: {
          // 새 파일 추가 감지를 위해 polling 사용
          usePolling: true,
          interval: 1000,
        },
      },
    })
  },
}

export default config
