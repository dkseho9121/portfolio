
//선택자
const sliderWrap = document.querySelector("#wrap")
const sliderImg = sliderWrap.querySelector(".slider__img") //보여지는 영역
const sliderInner = sliderWrap.querySelector(".slider__inner")  //움직이는 영역
const slider = sliderWrap.querySelectorAll(".slider")     //개별 영역

let currentIndex = 0;   //현재보이는 이미지
let sliderCount = slider.length;  //이미지 갯수
let sliderInterval = 1000; //이미지 변경 시간


sliderInner.style.transition = "all 0.6s"

setInterval(() => {
    currentIndex = (currentIndex + 1) % sliderCount;

    sliderInner.style.transform = "translateX("+ -800 * currentIndex + "px)";
}, sliderInterval);