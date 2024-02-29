

export function safeSemiTone(semiTone: number): number {
    return semiTone <= 12 ? semiTone : semiTone - 12;
}