// Max is exclusive.
export function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
export function sample(arr) {
    return arr[randomInt(arr.length)];
}
