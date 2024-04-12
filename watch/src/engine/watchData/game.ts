import { State } from './State.js'

export const game = levelData({
    answer: Tuple(5, Number),
    endTime: Number,
})

export const board = levelData({
    letters: Tuple(30, Number),
    states: Tuple(30, DataType<State>),
    times: Tuple(6, Number),
})
