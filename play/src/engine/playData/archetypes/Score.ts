import { GameState } from '../GameState.js'
import { cursor, game } from '../game.js'

export class Score extends Archetype {
    hasInput = true

    import = this.defineImport({
        index: { name: 'index', type: Number },
    })

    spawnOrder() {
        return 1000
    }

    shouldSpawn() {
        return !!game.state
    }

    initialize() {
        this.result.judgment =
            game.state === GameState.Won && this.import.index >= cursor.y - 1
                ? Judgment.Perfect
                : Judgment.Miss
        this.result.accuracy = (time.now - 2) / 1000

        this.despawn = true
    }
}
