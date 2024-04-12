import { copyFileSync } from 'node:fs'

copyFileSync('./shared/src/engine/rom/EngineRom', './.dev/EngineRom')

/** @type {import('@sonolus/sonolus.js').SonolusCLIConfig} */
export default {
    type: 'play',

    devServer(sonolus) {
        const engine = sonolus.db.engines[0]
        engine.rom = { hash: '', url: '/EngineRom' }
    },
}
