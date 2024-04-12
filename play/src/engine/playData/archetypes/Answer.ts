import { GameState } from '../GameState.js'
import { game } from '../game.js'
import { getLetterSpriteId, letter } from '../letter.js'
import { skin } from '../skin.js'

export class Answer extends SpawnableArchetype({
    x: Number,
}) {
    layout = this.entityMemory(Rect)

    initialize() {
        const x = (this.spawnData.x - 2) * letter.size * 4
        const y = Math.lerp(screen.w, letter.size * 6, 0.5) - 4 * letter.size * 4

        Rect.one
            .mul(letter.size * 2 * 0.95)
            .translate(x, y)
            .copyTo(this.layout)
    }

    updateParallel() {
        if (game.state === GameState.Ongoing) return

        skin.sprites.draw(getLetterSpriteId(game.answer.get(this.spawnData.x)), this.layout, 1, 1)
        skin.sprites.green.draw(this.layout, 0, 1)
    }
}
