export function generateSong() {
    const random = {
        nextInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    };

    const sharpSymbol = "\u266F";
    const flatSymbol = "\u266D"

    const chordList = [`A`, `A${sharpSymbol}`, `B`, `C`, `C${sharpSymbol}`, `D`, `E${flatSymbol}`, `E`, `F`, `F${sharpSymbol}`, `G`, `A${flatSymbol}`];

    const majorChordMatrix = [
        [`A`, `B`, `C${sharpSymbol}`, `D`, `E`, `F${sharpSymbol}`, `G${sharpSymbol}`, `A`],
        [`A${sharpSymbol}`, "C", "D", `E${flatSymbol}`, "F", "G", "A", `A${sharpSymbol}`],
        ["B", `C${sharpSymbol}`, `E${flatSymbol}`, "E", `F${sharpSymbol}`, `G${sharpSymbol}`, `A${sharpSymbol}`, "B"],
        ["C", "D", "E", "F", "G", "A", "B", "C"],
        [`C${sharpSymbol}`, `E${flatSymbol}`, "F", `F${sharpSymbol}`, `G${sharpSymbol}`, `A${sharpSymbol}`, "C", `C${sharpSymbol}`],
        ["D", "E", `F${sharpSymbol}`, "G", "A", "B", `C${sharpSymbol}`, "D"],
        [`E${flatSymbol}`, "F", "G", `A${flatSymbol}`, `B${flatSymbol}`, "C", "D", `E${flatSymbol}`],
        ["E", `F${sharpSymbol}`, `G${sharpSymbol}`, "A", "B", `C${sharpSymbol}`, `D${sharpSymbol}`, "E"],
        ["F", "G", "A", `B${flatSymbol}`, "C", "D", "E", "F"],
        [`F${sharpSymbol}`, `G${sharpSymbol}`, `A${sharpSymbol}`, "B", `C${sharpSymbol}`, `D${sharpSymbol}`, "F", `F${sharpSymbol}`],
        ["G", "A", "B", "C", "D", "E", `F${sharpSymbol}`, "G"],
        [`A${flatSymbol}`, `B${flatSymbol}`, "C", `D${flatSymbol}`, `E${flatSymbol}`, "F", "G", `A${flatSymbol}`]
    ];

    const minorChordMatrix = [
        ["A", "B", "C", "D", "E", "F", "G", "A"],
        [`A${sharpSymbol}`, "C", `C#`, `E${flatSymbol}`, "F", `F${sharpSymbol}`, `G${sharpSymbol}`, `A${sharpSymbol}`],
        ["B", `C${sharpSymbol}`, "D", "E", `F${sharpSymbol}`, "G", "A", "B"],
        ["C", "D", `E${flatSymbol}`, "F", "G", `A${flatSymbol}`, `A${sharpSymbol}`, "C"],
        [`C${sharpSymbol}`, `E${flatSymbol}`, "E", `F${sharpSymbol}`, `G${sharpSymbol}`, "A", "B", `C${sharpSymbol}`],
        ["D", "E", "F", "G", "A", `A${sharpSymbol}`, "C", "D"],
        [`E${flatSymbol}`, "F", `F${sharpSymbol}`, `A${flatSymbol}`, `B${flatSymbol}`, "B", `C${sharpSymbol}`, `E${flatSymbol}`],
        ["E", `F${sharpSymbol}`, "G", "A", "B", "C", "D", "E"],
        ["F", "G", `A${flatSymbol}`, `B${flatSymbol}`, "C", `C${sharpSymbol}`, `D${sharpSymbol}`, "F"],
        [`F${sharpSymbol}`, `G${sharpSymbol}`, "A", "B", `C${sharpSymbol}`, "D", "E", `F${sharpSymbol}`],
        ["G", "A", `A${sharpSymbol}`, "C", "D", `E${flatSymbol}`, "F", "G"],
        [`A${flatSymbol}`, `B${flatSymbol}`, "B", `D${flatSymbol}`, `E${flatSymbol}`, "E", `F${sharpSymbol}`, `A${flatSymbol}`]
    ];

    function getRandomInt(min, max) {
        return random.nextInt(min, max);
    }

    function generateSection(minLength, maxLength, firstValue) {
        const length = getRandomInt(minLength, maxLength);
        const section = Array(length).fill(0);
        section[0] = firstValue;

        for (let i = 1; i < length; i++) {
            let next;
            do {
                next = getRandomInt(1, 7);
            } while (next === section[i - 1]);
            section[i] = next;
        }

        return section;
    }

    function formatChords(key, section, isMinorKey) {
        const minorChords = isMinorKey ? [1, 4, 5] : [2, 3, 6];
        const chordMatrix = isMinorKey ? minorChordMatrix : majorChordMatrix;

        return section
            .map(chord => minorChords.includes(chord) 
                ? `${chordMatrix[key - 1][chord - 1]}m`
                : chordMatrix[key - 1][chord - 1])
            .join(", ");
    }

    const bpm = getRandomInt(80, 125);
    const key = getRandomInt(1, 12);
    const isMinor = random.nextInt(0, 1) === 0;
    const verse = generateSection(2, 6, 1);
    const chorus = generateSection(2, 6, verse.length > 2 ? verse[1] : getRandomInt(1, 7));
    const bridge = random.nextInt(0, 1) === 0 ? null : generateSection(2, 6, getRandomInt(1, 7));

    const minorOrMajor = isMinor ? "Minor" : "";

    return {
        bpm,
        key: `${chordList[key - 1]} ${minorOrMajor}`,
        verse: formatChords(key, verse, isMinor),
        chorus: formatChords(key, chorus, isMinor),
        bridge: bridge ? formatChords(key, bridge, isMinor) : "None"
    };
}