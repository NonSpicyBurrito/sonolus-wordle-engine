import { readonlyPointer } from 'sonolus.js-compiler/internal/lib/play/utils/pointer.js'
import { rom } from '../../../../shared/src/engine/rom/index.js'
import { GameState } from './GameState.js'
import { State } from './State.js'

export const game = levelMemory({
    state: DataType<GameState>,
    answer: Tuple(5, Number),
})

export const board = levelMemory({
    letters: Tuple(30, Number),
    states: Tuple(30, DataType<State>),
})

export const cursor = levelMemory({
    x: Number,
    y: Number,
})

export const letterStates = levelMemory(Tuple(26, DataType<State>))

export const animation = levelMemory({
    y: Number,
    time: Number,
})

const La = Tuple(rom.la.length, Number)
export const la = La.read([readonlyPointer(3000, 0, 0, 0)])

const Fa = Tuple(rom.fa.length, Number)
export const fa = Fa.read([readonlyPointer(3000, rom.la.length, 0, 0)])
