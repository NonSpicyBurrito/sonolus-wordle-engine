import { GameState } from '../GameState.js'
import { State } from '../State.js'
import { board, cursor, game } from '../game.js'

export class Score extends Archetype {
    hasInput = true

    import = this.defineImport({
        index: { name: 'index', type: Number },
    })

    export = this.defineExport({
        l0: { name: 'l0', type: Number },
        l1: { name: 'l1', type: Number },
        l2: { name: 'l2', type: Number },
        l3: { name: 'l3', type: Number },
        l4: { name: 'l4', type: Number },
        s0: { name: 's0', type: DataType<State> },
        s1: { name: 's1', type: DataType<State> },
        s2: { name: 's2', type: DataType<State> },
        s3: { name: 's3', type: DataType<State> },
        s4: { name: 's4', type: DataType<State> },
        time: { name: 'time', type: Number },
    })

    spawnOrder() {
        return 1000
    }

    shouldSpawn() {
        return !!game.state
    }

    initialize() {
        this.export('l0', board.letters.get(0 + this.import.index * 5))
        this.export('l1', board.letters.get(1 + this.import.index * 5))
        this.export('l2', board.letters.get(2 + this.import.index * 5))
        this.export('l3', board.letters.get(3 + this.import.index * 5))
        this.export('l4', board.letters.get(4 + this.import.index * 5))
        this.export('s0', board.states.get(0 + this.import.index * 5))
        this.export('s1', board.states.get(1 + this.import.index * 5))
        this.export('s2', board.states.get(2 + this.import.index * 5))
        this.export('s3', board.states.get(3 + this.import.index * 5))
        this.export('s4', board.states.get(4 + this.import.index * 5))
        this.export('time', board.times.get(this.import.index))

        this.result.judgment =
            game.state === GameState.Won && this.import.index >= cursor.y - 1
                ? Judgment.Perfect
                : Judgment.Miss
        this.result.accuracy = (time.now - 2) / 1000

        this.despawn = true
    }
}
