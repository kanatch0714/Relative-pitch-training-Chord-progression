console.log("ver:0.0.6")
let isQuestionActive

const keys = [
  261.63,
  277.18,
  293.66,
  311.13,
  329.63,
  349.23,
  369.99,
  392.00,
  415.30,
  440.00,
  466.16,
  493.88
];

const intervals = {
    1: [0, 4, 7],   // I (maj)  : ド・ミ・ソ
    2: [2, 5, 9],   // II (min) : レ・ファ・ラ
    3: [4, 7, 11],  // III (min): ミ・ソ・シ
    4: [5, 9, 12],  // IV (maj) : ファ・ラ・ド
    5: [7, 11, 14], // V (maj)  : ソ・シ・レ
    6: [9, 12, 16], // VI (min) : ラ・ド・ミ
    7: [11, 14, 17] // VII (dim): シ・レ・ファ
};

const start = document.getElementById("start")
const hearI = document.getElementById("hearI")
const prog = document.getElementById("progress")

prog.disabled = true
hearI.disabled = true
let chordProg = []
let key;

//コードの中身は設定で変える。(ダイアトニックだけなのか、モードを変えたりするのかとか)
const chords = [
    {deg:1, type:"maj"}
    ,{deg:2, type:"min"}
    ,{deg:3, type:"min"}
    ,{deg:4, type:"maj"}
    ,{deg:5, type:"maj"}
    ,{deg:6, type:"min"}
    ,{deg:7, type:"dim"}
]

hearI.disabled = true


start.addEventListener('click',()=>{
    if (start.textContent === '答えを見る') {
        isQuestionActive = false
        hearI.disabled = true
        prog.disabled = true
        start.textContent = '次の問題へ'
    }
    else {//次の問題、スタートのときの処理
        isQuestionActive=true
        hearI.disabled = false
        prog.disabled = false
        console.log('start was pushed')
        let rmIdx = Math.floor(Math.random() * keys.length);
        key=keys[rmIdx]
        console.log(`key:${key}`)
        for (let i = 0;i<4;i++) {
            let rmIdx = Math.floor(Math.random() * chords.length);
            chordProg.push(chords[rmIdx])
        }
        console.log("chordProg:"+chordProg)
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