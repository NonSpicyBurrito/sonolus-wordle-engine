import { GameState } from '../../GameState.js'
import { State } from '../../State.js'
import { effect } from '../../effect.js'
import { animation, board, cursor, fa, game, letterStates } from '../../game.js'
import { skin } from '../../skin.js'
import { Key } from './Key.js'

export class EnterKey extends Key {
    letterSpriteId = skin.sprites.enter.id
    backgroundSpriteId = skin.sprites.key.id

    answer = this.entityMemory(Tuple(5, Number))

    onTap() {
        if (cursor.x < 5) return

        animation.y = cursor.y
        animation.time = time.now

        if (!this.checkValidWord()) return

        this.updateBoardStates()
        this.updateLetterStates()
        this.updateGameState()

        cursor.x = 0
        cursor.y++
    }

    checkValidWord() {
        const target =
            board.letters.get(0 + cursor.y * 5) * 26 ** 4 +
            board.letters.get(1 + cursor.y * 5) * 26 ** 3 +
            board.letters.get(2 + cursor.y * 5) * 26 ** 2 +
            board.letters.get(3 + cursor.y * 5) * 26 ** 1 +
            board.letters.get(4 + cursor.y * 5) * 26 ** 0

        let lo = 0
        let hi = fa.length

        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2)
            if (fa.get(mid) <= target) {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        lo--

        return lo >= 0 && fa.get(lo) === target
    }

    updateBoardStates() {
        game.answer.copyTo(this.answer)

        for (let x = 0; x < 5; x++) {
            if (board.letters.get(x + cursor.y * 5) !== this.answer.get(x)) continue

            board.states.set(x + cursor.y * 5, State.Green)
            this.answer.set(x, -1)
        }

        for (let x = 0; x < 5; x++) {
            if (board.states.get(x + cursor.y * 5) !== State.Default) continue

            const letter = board.letters.get(x + cursor.y * 5)
            for (let i = 0; i < 5; i++) {
                if (letter !== this.answer.get(i)) continue

                board.states.set(x + cursor.y * 5, State.Yellow)
                this.answer.set(i, -1)
                break
            }
        }

        for (let x = 0; x < 5; x++) {
            if (board.states.get(x + cursor.y * 5) !== State.Default) continue

            board.states.set(x + cursor.y * 5, State.Grey)
        }
    }

    updateLetterStates() {
        for (let x = 0; x < 5; x++) {
            const letter = board.letters.get(x + cursor.y * 5)
            const state = board.states.get(x + cursor.y * 5)

            letterStates.set(letter, Math.max(letterStates.get(letter), state))
        }
    }

    updateGameState() {
        if (
            board.states.get(0 + cursor.y * 5) === State.Green &&
            board.states.get(1 + cursor.y * 5) === State.Green &&
            board.states.get(2 + cursor.y * 5) === State.Green &&
            board.states.get(3 + cursor.y * 5) === State.Green &&
            board.states.get(4 + cursor.y * 5) === State.Green
        ) {
            game.state = GameState.Won

            effect.clips.victory.play(0)
        } else if (cursor.y === 5) {
            game.state = GameState.Loss
        }
    }
}
