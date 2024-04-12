import { skin } from './skin.js'

export const letter = levelData({
    size: Number,
})

export const getLetterSpriteId = (k: number) => (skin.sprites.letterA.id + k) as SkinSpriteId
