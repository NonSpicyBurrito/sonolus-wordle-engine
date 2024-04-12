import { getLetterSpriteId } from '../../letter.js'
import { Key } from './Key.js'

export class LetterKey extends Key {
    get letterSpriteId() {
        return getLetterSpriteId(this.spawnData.k)
    }
}
