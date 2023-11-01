console.log('index.js connected success!');

const bannerImages = ['banner_1.jpg','banner_2.jpg','banner_3.jpg','banner_4.jpg','banner_5.png'];

const bannerImage = document.querySelector('.home__banner img');

let i = 1

setInterval(() => {
    bannerImage.setAttribute('src',`/images/banner/${bannerImages[i]}`)
    i++
    i = i === 5 ? 0 : i
}, 2500);
