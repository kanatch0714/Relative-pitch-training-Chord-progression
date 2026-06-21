console.log("ver:0.0.5")

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
const start = document.getElementById("start")
const hearI = document.getElementById("hearI")
const ans = document.getElementById("ans-btn")

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
    let isQuestionActive=true
    hearI.disabled = false
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
    start.id = "ans-btn";

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

ans.addEventListener('click',()=>{
    console.log('ans was pushed')
    isQuestionActive == false
    hearI.disable = true
})