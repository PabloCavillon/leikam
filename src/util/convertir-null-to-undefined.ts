export function convertNullToUndefined(obj: any): any {
    const result: any = {};
    for (const key in obj) {
        if (obj[key] === null) {
            result[key] = undefined; // Convierte null en undefined
        } else {
            result[key] = obj[key]; // Mantiene los valores existentes
        }
    }
    return result;
}