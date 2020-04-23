import { MixerProtocolPresets, MixerProtocolList } from './constants/MixerProtocolPresets'
import { MixerGenericConnection } from './utils/MixerConnection'
import { AutomationConnection } from './utils/AutomationConnection'
import { HuiMidiRemoteConnection } from './utils/HuiMidiRemoteConnection'

import { state } from './reducers/store'
const mixerProtocolPresets = MixerProtocolPresets
const mixerProtocolList = MixerProtocolList

const mixerGenericConnection = new MixerGenericConnection()
const automationConnection = new AutomationConnection()
let huiRemoteConnection: HuiMidiRemoteConnection | null = null
if (state.settings[0].enableRemoteFader) {
	huiRemoteConnection = new HuiMidiRemoteConnection()
}

export {
	mixerProtocolList,
	mixerProtocolPresets,
	mixerGenericConnection,
	automationConnection,
	huiRemoteConnection
}
