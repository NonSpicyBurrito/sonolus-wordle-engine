import { game } from '../../game.js'
import { letter } from '../../letter.js'
import { skin } from '../../skin.js'

export abstract class Key extends SpawnableArchetype({
    k: Number,
    x: Number,
    y: Number,
    s: Number,
    l: Number,
}) {
    abstract letterSpriteId: SkinSpriteId

    initialized = this.entityMemory(Boolean)

    layouts = this.entityMemory({
        letter: Rect,
        key: Rect,
    })

    spawnTime() {
        return -999999
    }

    despawnTime() {
        return game.endTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        const w = screen.h / this.spawnData.l / 2
        const x = screen.b + w * (2 * this.spawnData.x + this.spawnData.s)
        const y = letter.size * (2 * this.spawnData.y + 1)

        Rect.one
            .scale(letter.size * 0.95, letter.size * 0.95)
            .translate(x, y)
            .copyTo(this.layouts.letter)
        Rect.one
            .scale(w * this.spawnData.s - letter.size * 0.05, letter.size * 0.95)
            .translate(x, y)
            .copyTo(this.layouts.key)
    }

    updateParallel() {
        skin.sprites.draw(this.letterSpriteId, this.layouts.letter, 1, 1)
        skin.sprites.key.draw(this.layouts.key, 0, 1)
    }
}
