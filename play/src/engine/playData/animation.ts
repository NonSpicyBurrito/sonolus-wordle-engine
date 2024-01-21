export const getAlpha = (startTime: number) =>
    Math.ease('Out', 'Cubic', Math.unlerpClamped(startTime, startTime + 0.2, time.now))
