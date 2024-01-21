import { getAlpha } from '../../animation.js'
import { effect } from '../../effect.js'
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
    abstract backgroundSpriteId: SkinSpriteId

    hitTime = this.entityMemory(Number)

    hitbox = this.entityMemory(Rect)

    layouts = this.entityMemory({
        letter: Rect,
        key: Rect,
    })

    initialize() {
        this.hitTime = -9999

        const w = screen.h / this.spawnData.l / 2
        const x = screen.b + w * (2 * this.spawnData.x + this.spawnData.s)
        const y = letter.size * (2 * this.spawnData.y + 1)

        Rect.one
            .scale(w * this.spawnData.s, -letter.size)
            .translate(x, y)
            .transform(skin.transform)
            .copyTo(this.hitbox)

        Rect.one
            .scale(letter.size * 0.95, letter.size * 0.95)
            .translate(x, y)
            .copyTo(this.layouts.letter)
        Rect.one
            .scale(w * this.spawnData.s - letter.size * 0.05, letter.size * 0.95)
            .translate(x, y)
            .copyTo(this.layouts.key)
    }

    touch() {
        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.hitbox.contains(touch.position)) continue

            this.hitTime = time.now
            effect.clips.key.play(0.02)
            this.onTap()
        }
    }

    updateParallel() {
        if (game.state) {
            this.despawn = true
            return
        }

        skin.sprites.draw(this.letterSpriteId, this.layouts.letter, 1, 1)
        skin.sprites.draw(this.backgroundSpriteId, this.layouts.key, 0, getAlpha(this.hitTime))
    }

    abstract onTap(): void
}
