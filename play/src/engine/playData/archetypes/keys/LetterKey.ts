import { State } from '../../State.js'
import { board, cursor, letterStates } from '../../game.js'
import { getLetterSpriteId } from '../../letter.js'
import { skin } from '../../skin.js'
import { Key } from './Key.js'

export class LetterKey extends Key {
    get letterSpriteId() {
        return getLetterSpriteId(this.spawnData.k)
    }

    get backgroundSpriteId() {
        switch (letterStates.get(this.spawnData.k)) {
            case State.Green:
                return skin.sprites.green.id
            case State.Yellow:
                return skin.sprites.yellow.id
            case State.Grey:
                return skin.sprites.grey.id
            default:
                return skin.sprites.key.id
        }
    }

    onTap() {
        if (cursor.x > 4) return

        board.letters.set(cursor.x + cursor.y * 5, this.spawnData.k)

        cursor.x++
    }
}
