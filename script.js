console.log("ver:0.0.7")
let isQuestionActive

const keys = [
  261.63, 277.18, 293.66, 311.13, 329.63, 349.23,
  369.99, 392.00, 415.30, 440.00, 466.16, 493.88
];

const intervals = {
    1: [0, 4, 7],   // I (maj)
    2: [2, 5, 9],   // II (min)
    3: [4, 7, 11],  // III (min)
    4: [5, 9, 12],  // IV (maj)
    5: [7, 11, 14], // V (maj)
    6: [9, 12, 16], // VI (min)
    7: [11, 14, 17] // VII (dim)
};

const start = document.getElementById("start")
const hearI = document.getElementById("hearI")
const prog = document.getElementById("progress")

const ansDiv = document.createElement("div");
ansDiv.style.fontSize = "24px";
ansDiv.style.fontWeight = "bold";
ansDiv.style.marginTop = "20px";
ansDiv.style.textAlign = "center";
start.parentNode.insertBefore(ansDiv, start.nextSibling); // ボタンのすぐ下に配置

prog.disabled = true
hearI.disabled = true
let chordProg = []
let key;

const chords = [
    {deg:1, type:"maj"}
    ,{deg:2, type:"min"}
    ,{deg:3, type:"min"}
    ,{deg:4, type:"maj"}
    ,{deg:5, type:"maj"}
    ,{deg:6, type:"min"}
    ,{deg:7, type:"dim"}
]

start.addEventListener('click',()=>{
    if (start.textContent === '答えを見る') {
        isQuestionActive = false
        hearI.disabled = true
        prog.disabled = true
        
        const ansText = chordProg.map(c => {
            let degRoman = ["", "I", "II", "III", "IV", "V", "VI", "VII"][c.deg];
            return `${degRoman}(${c.type})`;
        }).join("  -  ");
        
        ansDiv.textContent = `正解： ${ansText}`;
        console.log("正解:", ansText);
        
        start.textContent = '次の問題へ'
    }
    else {
        isQuestionActive=true
        hearI.disabled = false
        prog.disabled = false
        
        ansDiv.textContent = "";
        
        console.log('start was pushed')
        chordProg = []; // 配列をリセット
        
        let rmIdx = Math.floor(Math.random() * keys.length);
        key=keys[rmIdx]
        console.log(`key:${key}`)
        for (let i = 0;i<4;i++) {
            let rmIdx = Math.floor(Math.random() * chords.length);
            chordProg.push(chords[rmIdx])
        }
        start.textContent = '答えを見る'
    }
})

hearI.addEventListener('click',()=>{
    console.log('hearI was pushed')
    const ctx=new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain();
    osc.frequency.value = key;
    osc.type = 'triangle'
    gainNode.gain.value = 0.05;
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start()
    osc.stop(ctx.currentTime + 0.5)
})

function chordFreqs(key,deg) {
    const chordIntervals = intervals[deg];
    const freqs = chordIntervals.map(interval => {
        return key * Math.pow(2, interval / 12);
    });
    return freqs; 
}

prog.addEventListener('click', () => {
    if (!key) return;
    console.log('prog was pushed');
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const chordDuration = 1.0; 

    chordProg.forEach((chord, i) => {
        const startTime = ctx.currentTime + (i * chordDuration);
        const endTime = startTime + (chordDuration - 0.05);
        const freqs = chordFreqs(key, chord.deg);

        freqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'triangle';
            gainNode.gain.value = 0.03;
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            osc.start(startTime);
            osc.stop(endTime);
        });
    });
});