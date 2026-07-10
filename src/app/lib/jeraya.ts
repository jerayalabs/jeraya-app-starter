import { createApp } from '@jeraya/sdk'
import type { JerayaApp, JerayaConfig } from '../types/jeraya'

import jerayaLocalConfig from '../../../.jeraya-config.json' with { type: 'json' }

const config = jerayaLocalConfig as JerayaConfig

const jeraya = createApp({
  appId: config.appId,
  ...(window as unknown as Record<string, unknown>)._jeraya_config as Record<string, unknown> | undefined,
}) as unknown as JerayaApp

export const db = jeraya.db
export const user = jeraya.user

export default jeraya
