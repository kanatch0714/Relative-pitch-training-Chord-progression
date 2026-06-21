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

//コードの中身は設定で変える。(ダイアトニックだけなのか、モードを変えたりするのかとか)
const chords = {
    "1":{deg:1, type:"maj"}
    ,"2m":{deg:2, type:"min"}
    ,"3":{deg:3, type:"maj"}
    ,"4":{deg:4, type:"maj"}
    ,"5":{deg:5, type:"maj"}
    ,"6":{deg:6, type:"min"}
    ,"7":{deg:7, type:"dim"}
}

const start = document.getElementById("start")
start.addEventListener('click',()=>{
    let rmIdx = Math.floor(Math.random() * keys.length);
    let key=keys[rmIdx]
    let progress = []
    for (let i = 0;i<4;i++) {
        let rmIdx = Math.floor(Math.random() * chords.length);
        progress.push(chords[rmIdx])
    }
    console.log(progress)
})
