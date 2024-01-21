import { options } from '../../configuration/options.js'
import { archetypes } from './index.js'

export class Game extends Archetype {
    spawnOrder() {
        return 1
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    initialize() {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 6; y++) {
                archetypes.Cell.spawn({ x, y })
            }

            archetypes.Answer.spawn({ x })
        }

        this.spawnKeys('QWERTYUIOP', 2)
        this.spawnKeys('ASDFGHJKL', 1)
        this.spawnKeys('[ ZXCVBNM] ', 0)
    }

    spawnKeys(keys: string, y: number) {
        for (const [x, k] of [...keys].entries()) {
            switch (k) {
                case ' ':
                    continue
                case '[':
                    if (options.swap) {
                        archetypes.BackspaceKey.spawn({
                            k: 0,
                            x,
                            y,
                            s: 2,
                            l: keys.length,
                        })
                    } else {
                        archetypes.EnterKey.spawn({
                            k: 0,
                            x,
                            y,
                            s: 2,
                            l: keys.length,
                        })
                    }
                    break
                case ']':
                    if (options.swap) {
                        archetypes.EnterKey.spawn({
                            k: 0,
                            x,
                            y,
                            s: 2,
                            l: keys.length,
                        })
                    } else {
                        archetypes.BackspaceKey.spawn({
                            k: 0,
                            x,
                            y,
                            s: 2,
                            l: keys.length,
                        })
                    }
                    break
                default:
                    archetypes.LetterKey.spawn({
                        k: k.charCodeAt(0) - 'A'.charCodeAt(0),
                        x,
                        y,
                        s: 1,
                        l: keys.length,
                    })
                    break
            }
        }
    }
}
