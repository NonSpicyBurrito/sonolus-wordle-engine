import { EngineConfigurationOption } from '@sonolus/core'

export const optionsDefinition = {
    swap: {
        name: 'Swap Enter and Backspace',
        scope: 'Wordle',
        type: 'toggle',
        def: 0,
    },
} satisfies Record<string, EngineConfigurationOption>
