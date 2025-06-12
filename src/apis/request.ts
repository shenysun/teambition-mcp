import { TWS } from 'tws-auth'
import { APP_ID, APP_SECRET, TB_BASE_URL } from '../constants/env'

export const tbServer = new TWS({
  appId: APP_ID,
  appSecrets: [APP_SECRET],
  host: TB_BASE_URL,
})
