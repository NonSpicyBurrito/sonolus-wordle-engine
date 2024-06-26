import { animation, board, game, la } from '../game.js'
import { letter } from '../letter.js'
import { skin } from '../skin.js'

export class Initialization extends Archetype {
    export = this.defineExport({
        a0: { name: 'a0', type: Number },
        a1: { name: 'a1', type: Number },
        a2: { name: 'a2', type: Number },
        a3: { name: 'a3', type: Number },
        a4: { name: 'a4', type: Number },
    })

    preprocess() {
        if (multiplayer.isMultiplayer) this.randomizeAnswer()

        for (let i = 0; i < board.letters.length; i++) {
            board.letters.set(i, -1)
        }

        animation.y = -1

        letter.size = Math.min(screen.w / 34, screen.h / 22)

        const transform = Mat.identity.rotate(Math.PI / 2).translate(screen.r, 0)
        skin.transform.set(transform)

        ui.menu.set({
            anchor: screen.rect.lt.add(new Vec(0.05, -0.05)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 90,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        if (!multiplayer.isMultiplayer) this.randomizeAnswer()

        this.despawn = true
    }

    randomizeAnswer() {
        let word = la.get(Math.floor(Math.random() * la.length))
        game.answer.set(0, Math.floor(word / 26 ** 4))
        this.export('a0', game.answer.get(0))
        word %= 26 ** 4
        game.answer.set(1, Math.floor(word / 26 ** 3))
        this.export('a1', game.answer.get(1))
        word %= 26 ** 3
        game.answer.set(2, Math.floor(word / 26 ** 2))
        this.export('a2', game.answer.get(2))
        word %= 26 ** 2
        game.answer.set(3, Math.floor(word / 26 ** 1))
        this.export('a3', game.answer.get(3))
        word %= 26 ** 1
        game.answer.set(4, Math.floor(word / 26 ** 0))
        this.export('a4', game.answer.get(4))
    }
}
