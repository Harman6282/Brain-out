export function random(len: number): string {
    let options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += options[Math.floor(Math.floor(Math.random() * options.length))];
    }
    return result;
}