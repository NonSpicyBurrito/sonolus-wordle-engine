import { game } from '../game.js'
import { letter } from '../letter.js'
import { skin } from '../skin.js'

export class Initialization extends Archetype {
    import = this.defineImport({
        a0: { name: 'a0', type: Number },
        a1: { name: 'a1', type: Number },
        a2: { name: 'a2', type: Number },
        a3: { name: 'a3', type: Number },
        a4: { name: 'a4', type: Number },
    })

    preprocess() {
        letter.size = Math.min(screen.w / 34, screen.h / 22)

        const transform = Mat.identity.rotate(Math.PI / 2).translate(screen.r, 0)
        skin.transform.set(transform)

        game.answer.set(0, this.import.a0)
        game.answer.set(1, this.import.a1)
        game.answer.set(2, this.import.a2)
        game.answer.set(3, this.import.a3)
        game.answer.set(4, this.import.a4)

        ui.menu.set({
            anchor: screen.rect.lt.add(new Vec(0.05, -0.05)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 90,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.progress.set({
            anchor: screen.rect.rb.add(new Vec(-0.05, 0.05)),
            pivot: { x: 0, y: 0 },
            size: { x: screen.rect.h - 0.1, y: 0.15 * ui.configuration.progress.scale },
            rotation: 90,
            alpha: ui.configuration.progress.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })
    }
}
