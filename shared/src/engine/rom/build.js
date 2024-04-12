import { readFileSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const la = readFileSync(new URL('la.txt', import.meta.url), 'utf8').split('\n')
const ta = readFileSync(new URL('ta.txt', import.meta.url), 'utf8').split('\n')
const fa = [...la, ...ta].sort()

const meta = {
    la: {
        length: la.length,
    },
    fa: {
        length: fa.length,
    },
}

writeFileSync(new URL('meta.json', import.meta.url), JSON.stringify(meta, null, 4))

const encode = (word) =>
    (word.charCodeAt(0) - 'a'.charCodeAt(0)) * 26 ** 4 +
    (word.charCodeAt(1) - 'a'.charCodeAt(0)) * 26 ** 3 +
    (word.charCodeAt(2) - 'a'.charCodeAt(0)) * 26 ** 2 +
    (word.charCodeAt(3) - 'a'.charCodeAt(0)) * 26 ** 1 +
    (word.charCodeAt(4) - 'a'.charCodeAt(0)) * 26 ** 0

const rom = Buffer.alloc((la.length + fa.length) * 4)
for (const [index, word] of [...la, ...fa].entries()) {
    rom.writeFloatLE(encode(word), index * 4)
}

writeFileSync(new URL('EngineRom', import.meta.url), gzipSync(rom, { level: 9 }))
