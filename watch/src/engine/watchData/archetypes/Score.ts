import { board, game } from '../game.js'

export class Score extends Archetype {
    import = this.defineImport({
        index: { name: 'index', type: Number },
        l0: { name: 'l0', type: Number },
        l1: { name: 'l1', type: Number },
        l2: { name: 'l2', type: Number },
        l3: { name: 'l3', type: Number },
        l4: { name: 'l4', type: Number },
        s0: { name: 's0', type: Number },
        s1: { name: 's1', type: Number },
        s2: { name: 's2', type: Number },
        s3: { name: 's3', type: Number },
        s4: { name: 's4', type: Number },
        time: { name: 'time', type: Number },
    })

    preprocessOrder = 1
    preprocess() {
        game.endTime = Math.max(game.endTime, this.import.time)

        board.letters.set(0 + this.import.index * 5, this.import.l0)
        board.letters.set(1 + this.import.index * 5, this.import.l1)
        board.letters.set(2 + this.import.index * 5, this.import.l2)
        board.letters.set(3 + this.import.index * 5, this.import.l3)
        board.letters.set(4 + this.import.index * 5, this.import.l4)
        board.states.set(0 + this.import.index * 5, this.import.s0)
        board.states.set(1 + this.import.index * 5, this.import.s1)
        board.states.set(2 + this.import.index * 5, this.import.s2)
        board.states.set(3 + this.import.index * 5, this.import.s3)
        board.states.set(4 + this.import.index * 5, this.import.s4)
        board.times.set(this.import.index, this.import.time)
    }
}
