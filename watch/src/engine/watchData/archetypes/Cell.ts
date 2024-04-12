import { State } from '../State.js'
import { board } from '../game.js'
import { getLetterSpriteId, letter } from '../letter.js'
import { skin } from '../skin.js'

export class Cell extends SpawnableArchetype({
    x: Number,
    y: Number,
}) {
    initialized = this.entityMemory(Boolean)

    layout = this.entityMemory(Rect)

    spawnTime() {
        return -999999
    }

    despawnTime() {
        return 999999
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        const x = (this.spawnData.x - 2) * letter.size * 4
        const y =
            Math.lerp(screen.w, letter.size * 6, 0.5) - (this.spawnData.y - 2.5) * letter.size * 4

        Rect.one
            .mul(letter.size * 2 * 0.95)
            .translate(x, y)
            .copyTo(this.layout)
    }

    updateParallel() {
        if (time.now < board.times.get(this.spawnData.y)) {
            skin.sprites.blank.draw(this.layout, 0, 1)
            return
        }

        const index = this.spawnData.x + this.spawnData.y * 5

        switch (board.states.get(index)) {
            case State.Default:
                skin.sprites.blank.draw(this.layout, 0, 1)
                break
            case State.Grey:
                skin.sprites.grey.draw(this.layout, 0, 1)
                break
            case State.Yellow:
                skin.sprites.yellow.draw(this.layout, 0, 1)
                break
            case State.Green:
                skin.sprites.green.draw(this.layout, 0, 1)
                break
        }

        const letter = board.letters.get(index)
        if (letter === -1) return

        skin.sprites.draw(getLetterSpriteId(letter), this.layout, 1, 1)
    }
}
