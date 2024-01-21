import { Answer } from './Answer.js'
import { Cell } from './Cell.js'
import { Game } from './Game.js'
import { Initialization } from './Initialization.js'
import { Score } from './Score.js'
import { BackspaceKey } from './keys/BackspaceKey.js'
import { EnterKey } from './keys/EnterKey.js'
import { LetterKey } from './keys/LetterKey.js'

export const archetypes = defineArchetypes({
    Initialization,

    Game,
    Cell,
    Answer,

    LetterKey,
    EnterKey,
    BackspaceKey,

    Score,
})
