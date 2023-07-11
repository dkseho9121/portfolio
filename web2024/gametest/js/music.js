const allMusic = [
    {
        name : "1. Ice & Fire",
        artist : "King Canyon",
        img : "music_view01",
        audio: "music_audio01"
    },{
        name : "2. Blue Dream",
        artist : "Cheel",
        img : "music_view02",
        audio: "music_audio02"
    },{
        name : "3. Lazy Walk",
        artist : "Cheel",
        img : "music_view03",
        audio: "music_audio03"
    },{
        name : "4. Soft Feeling",
        artist : "Cheel",
        img : "music_view04",
        audio: "music_audio04"
    },{
        name : "5. We Cruisin'",
        artist : "Otis McDonald",
        img : "music_view05",
        audio: "music_audio05"
    },{
        name : "6. Knowpe",
        artist : "Noir Et Blanc Vie",
        img : "music_view06",
        audio: "music_audio06"
    },{
        name : "7. Smokey Eye",
        artist : "Cheel",
        img : "music_view07",
        audio: "music_audio07"
    },{
        name : "8. Sunday Rain",
        artist : "Cheel",
        img : "music_view08",
        audio: "music_audio08"
    },{
        name : "9. Goestories",
        artist : "Noir Et Blanc Vie",
        img : "music_view09",
        audio: "music_audio09"
    },{
        name : "10. Papov",
        artist : "Yung Logos",
        img : "music_view10",
        audio: "music_audio10"
    },
];

const musicWrap = document.querySelector(".music__wrap");
const musicName = musicWrap.querySelector(".music__control .title h3");
const musicArtist = musicWrap.querySelector(".music__control .title p");
const musicView = musicWrap.querySelector(".music__contents .image img");
const musicAudio = musicWrap.querySelector("#main-audio");
const musicPlay = musicWrap.querySelector("#control-play");
const musicPrevBtn = musicWrap.querySelector("#control-prev");
const musicNextBtn = musicWrap.querySelector("#control-next");
const musicProgress = musicWrap.querySelector(".progress")
const musicProgressBar = musicWrap.querySelector(".progress .bar")
const musicProgressCurrent = musicWrap.querySelector(".timer .current");
const musicProgressDuration = musicWrap.querySelector(".timer .duration");
const musicRepeat = musicWrap.querySelector("#control-repeat");
const musicListBtn = musicWrap.querySelector("#control-list");
const musicList = musicWrap.querySelector(".music__list");
const musicListUl = musicWrap.querySelector(".music__list ul");
const musicListClose = musicWrap.querySelector(".music__list h3 .close");

let musicIndex = 1; // 현재 음악 인덱스

/**
 * 음악 정보 로딩(불러오는) 함수
 * @param {number} num 매개변수로 index 넣는 거임 ㅇㅇ 
 */
const loadMusic = (num) => {
    musicName.innerText = allMusic[num-1].name; // 노래 이름
    musicArtist.innerText = allMusic[num-1].artist; // 가수 이름
    musicView.src = `img/${allMusic[num-1].img}.gif`;   // 노래 이미지
    musicView.alt = allMusic[num-1].name;   // 노래 이미지 정보
    musicAudio.src = `audio/${allMusic[num-1].audio}.mp3`; // 노래 파일
};

// 재생
const playMusic = () =>{
    musicWrap.classList.add("paused");
    musicPlay.setAttribute("title", "정지");
    musicPlay.setAttribute("class", "stop");
    musicAudio.play();
};

// 장치를 정지합니다 뭐야 안 되잖아
const pauseMusic = () => {
    musicWrap.classList.remove("paused");
    musicPlay.setAttribute("title", "재생");
    musicPlay.setAttribute("class", "play");
    musicAudio.pause();
};

// 이전 곡 듣기
const prevMusic = () => {
    musicIndex == 1 ? musicIndex = allMusic.length : musicIndex--;
    loadMusic(musicIndex);
    playMusic();
    playListMusic();
};

// 다음 곡 듣기
const nextMusic = () => {
    musicIndex == allMusic.length ? musicIndex = 1 : musicIndex++;
    loadMusic(musicIndex);
    playMusic(); 
    playListMusic();
};

// 뮤직 진행바
musicAudio.addEventListener("timeupdate", e => {
    const currentTime = e.target.currentTime;   // 재생시간
    const duration = e.target.duration; //전체 길이
    let propressWidth = (currentTime/duration) * 100;   //전체 길이에서 재생시간을 나누고 백분위로 나누면 몇 퍼센트 진행인지 알 수 있음 ㄷㄷ

    musicProgressBar.style.width = `${propressWidth}%`;

    // 전체 시간
    musicAudio.addEventListener("loadeddata", () => {
        let audioDuration = musicAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = (Math.floor(audioDuration % 60)).toString().padStart(2, '0');
        musicProgressDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // 진행 시간
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
    musicProgressCurrent.innerText = `${currentMin}:${currentSec}`;
});

// 진행 바 클릭
musicProgress.addEventListener("click", (e) => {
    let propressWidth = musicProgress.clientWidth;  //진행바 전체 길이
    let clickedOffsetX = e.offsetX; //진행바 기준 측정되는 X좌표 값
    let songDuration = musicAudio.duration; //오디오 전체 길이

    // 백분위로 나눈 숫자에 다시 전체 길이를 곱해서 현재 재생값으로 바꿈
    musicAudio.currentTime = (clickedOffsetX / propressWidth) * songDuration;
});

// 반복 버튼 클릭
musicRepeat.addEventListener("click", ()=>{
    // 경우의 수가 3가지(2가지 초과)라서 swtich 씀 ㄷㄷ
    let getArr = musicRepeat.getAttribute("class");

    switch(getArr){
        case "repeat" :
            musicRepeat.setAttribute("class", "repeat_one");
            musicRepeat.setAttribute("title", "한 곡 반복");
        break;
        case "repeat_one" :
            musicRepeat.setAttribute("class", "shuffle");
            musicRepeat.setAttribute("title", "랜덤 반복");
        break;
        case "shuffle" :
            musicRepeat.setAttribute("class", "repeat");
            musicRepeat.setAttribute("title", "전체 반복");
        break;
    }
});

// 노랜 끝이 났지만 이젠 울지 않으리 예~
musicAudio.addEventListener("ended", () => {
    let getArr = musicRepeat.getAttribute("class");

    switch(getArr){
        case "repeat" :
            nextMusic();
        break;
        case "repeat_one" :
            playMusic();
        break;
        case "shuffle" :
            let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성
            
            // do while은 조건이 안 맞으면 실행을 안 함 ㄷㄷ
            do {
                randomIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randomIndex)

            musicIndex = randomIndex;

            loadMusic(musicIndex);
            playMusic();
        break;
    }
    playListMusic();
});

// 플레이 버튼 클릭
musicPlay.addEventListener("click", () => {
    const isMusicPaused = musicWrap.classList.contains("paused"); // paused 있는지 확인함
    isMusicPaused ? pauseMusic() : playMusic();
});

// 이전 곡 버튼 클릭
musicPrevBtn.addEventListener("click", () => {
    let getArr = musicRepeat.getAttribute("class");
    if(getArr == "shuffle"){
        let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성
        do {
            randomIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex == randomIndex)
        musicIndex = randomIndex;
        prevMusic(musicIndex);
    } else {
        prevMusic();
    }
});

// 다음 곡 버튼 클릭
musicNextBtn.addEventListener("click", () => {
    let getArr = musicRepeat.getAttribute("class");
    if(getArr == "shuffle"){
        let randomIndex = Math.floor(Math.random() * allMusic.length + 1); // 랜덤 인덱스 생성
        do {
            randomIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex == randomIndex)
        musicIndex = randomIndex;
        nextMusic(musicIndex);
    } else {
        nextMusic();
    }
});

// 뮤직 리스트 버튼
musicListBtn.addEventListener("click", () => {
    musicList.classList.add("show");
});
musicListClose.addEventListener("click", () => {
    musicList.classList.remove("show");
});

// 뮤직 리스트 구현하기
for(let i = 0; i < allMusic.length; i++){
    let li = `
        <li data-index="${i+1}">
            <div class="list__img">
                <img src="img/${allMusic[i].img}.gif" alt="${allMusic[i].name}">
            </div>
            <div class="list__title">
                <strong>${allMusic[i].name}</strong>
                <em>${allMusic[i].artist}</em>
                <audio class="${allMusic[i].audio}" src="audio/${allMusic[i].audio}.mp3"></audio>
            </div>
            <span class="audio-duration" id="${allMusic[i].audio}"></span>
        </li>
    `;

    // musicListUl.innerHTML += li;
    musicListUl.insertAdjacentHTML("beforeend", li); // 앞의 인자에 따라 요소가 들어가는 위치가 달라짐 https://ko.javascript.info/modifying-document

    // 리스트에 음악 시간 불러오기
    let liAudioDuration = musicListUl.querySelector(`#${allMusic[i].audio}`);   // 리스트에서 시간을 표기할 선택자
    let liAudio = musicListUl.querySelector(`.${allMusic[i].audio}`);           // 리스트에서 오디오 파일 선택
    liAudio.addEventListener("loadeddata", () => {
        let audioDuration = liAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) totalSec = `0${totalSec}`;
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("data-duration", `${totalMin}:${totalSec}`);
    });
}

// 뮤직 리스트 클릭하면 재생
function playListMusic(){
    const musicListAll = musicListUl.querySelectorAll("li");    // 뮤직 리스트 목록
    for(let i = 0; i<musicListAll.length; i++){
        let audioTag = musicListAll[i].querySelector(".audio-duration");


        musicListAll[i].setAttribute("onclick", "clicked(this)");

        if(musicListAll[i].classList.contains("playing")){
            musicListAll[i].classList.remove("playing");
            let dataAudioDuration = audioTag.getAttribute("data-duration");
            audioTag.innerText = dataAudioDuration;
        };
        if(musicListAll[i].getAttribute("data-index") == musicIndex){
            musicListAll[i].classList.add("playing");
            audioTag.innerText = "재생중";
        };
        // 해당 리스트 위치로 가게 하기? ㄷㄷ

    };
    // musicListAll.forEach(li => {
    //     li.addEventListener("click", (e) => {
    //         console.log(e)
    //     })
    // })
};
playListMusic();

// 뮤직 리스트를 클릭하면
function clicked(el){
    let getIndex = el.getAttribute("data-index");
    musicIndex = getIndex;

    loadMusic(musicIndex);
    playMusic();
    playListMusic();
};

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playListMusic();
});