// Max is exclusive.
export function randomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function sample<T>(arr: ArrayLike<T>) {
    return arr[randomInt(arr.length)];
}
