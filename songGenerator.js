export function generateSong() {
    const random = {
        nextInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    };

    const chordList = ["A", "A#", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];

    const majorChordMatrix = [
        ["A", "B", "C#", "D", "E", "F#", "G#", "A"],
        ["A#", "C", "D", "Eb", "F", "G", "A", "A#"],
        ["B", "C#", "Eb", "E", "F#", "G#", "A#", "B"],
        ["C", "D", "E", "F", "G", "A", "B", "C"],
        ["C#", "Eb", "F", "F#", "G#", "A#", "C", "C#"],
        ["D", "E", "F#", "G", "A", "B", "C#", "D"],
        ["Eb", "F", "G", "Ab", "Bb", "C", "D", "Eb"],
        ["E", "F#", "G#", "A", "B", "C#", "D#", "E"],
        ["F", "G", "A", "Bb", "C", "D", "E", "F"],
        ["F#", "G#", "A#", "B", "C#", "D#", "F", "F#"],
        ["G", "A", "B", "C", "D", "E", "F#", "G"],
        ["Ab", "Bb", "C", "Db", "Eb", "F", "G", "Ab"]
    ];

    const minorChordMatrix = [
        ["A", "B", "C", "D", "E", "F", "G", "A"],
        ["A#", "C", "C#", "Eb", "F", "F#", "G#", "A#"],
        ["B", "C#", "D", "E", "F#", "G", "A", "B"],
        ["C", "D", "Eb", "F", "G", "Ab", "A#", "C"],
        ["C#", "Eb", "E", "F#", "G#", "A", "B", "C#"],
        ["D", "E", "F", "G", "A", "A#", "C", "D"],
        ["Eb", "F", "F#", "Ab", "Bb", "B", "C#", "Eb"],
        ["E", "F#", "G", "A", "B", "C", "D", "E"],
        ["F", "G", "Ab", "Bb", "C", "C#", "D#", "F"],
        ["F#", "G#", "A", "B", "C#", "D", "E", "F#"],
        ["G", "A", "A#", "C", "D", "Eb", "F", "G"],
        ["Ab", "Bb", "B", "Db", "Eb", "E", "F#", "Ab"]
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