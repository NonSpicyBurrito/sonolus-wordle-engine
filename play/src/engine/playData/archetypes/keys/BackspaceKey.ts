import { board, cursor } from '../../game.js'
import { skin } from '../../skin.js'
import { Key } from './Key.js'

export class BackspaceKey extends Key {
    letterSpriteId = skin.sprites.backspace.id
    backgroundSpriteId = skin.sprites.key.id

    onTap() {
        if (cursor.x < 1) return

        cursor.x--

        board.letters.set(cursor.x + cursor.y * 5, -1)
    }
}
