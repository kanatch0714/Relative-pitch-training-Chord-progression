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
let chordProg = []

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

const start = document.getElementById("start")
start.addEventListener('click',()=>{
    console.log('start was pushed')
    let rmIdx = Math.floor(Math.random() * keys.length);
    let key=keys[rmIdx]
    for (let i = 0;i<4;i++) {
        let rmIdx = Math.floor(Math.random() * chords.length);
        chordProg.push(chords[rmIdx])
    }
    console.log(chordProg)
})
