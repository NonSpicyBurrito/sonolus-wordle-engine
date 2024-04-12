import { EngineConfigurationOption, Text } from '@sonolus/core'

export const optionsDefinition = {
    swap: {
        name: 'Swap Enter and Backspace',
        scope: 'Wordle',
        type: 'toggle',
        def: 0,
    },
    timeLimit: {
        name: 'Time Limit',
        standard: true,
        scope: 'Wordle',
        type: 'slider',
        min: 30,
        max: 300,
        step: 10,
        def: 120,
        unit: Text.SecondUnit,
    },
} satisfies Record<string, EngineConfigurationOption>
