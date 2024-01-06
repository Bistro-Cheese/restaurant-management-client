export default function abbrNum(number: number, decPlaces: number = 0): string {
    if (number < 1e3) return number.toString();

    decPlaces = Math.pow(10, decPlaces);

    const abbrev: string[] = ['k', 'm', 'b', 't'];

    let result: string = '';

    for (let i = abbrev.length - 1; i >= 0; i--) {
        const size = Math.pow(10, (i + 1) * 3);

        if (size <= number) {
            const roundedNumber =
                Math.round((number * decPlaces) / size) / decPlaces;

            result = roundedNumber + abbrev[i];

            break;
        }
    }

    return result.toString();
}
