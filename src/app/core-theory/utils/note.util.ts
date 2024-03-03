

export function safeSemiTone(semiTone: number): number {
    return semiTone <= 12 ? semiTone : semiTone - 12;
}

export function nextIndexWithRollOver(start: number, iteration: number, length: number) {
    let result = start;
    for (let i = 0; i < iteration; i++) {
        if (++result >= length)
            result = 0;
    }
    return result;
}