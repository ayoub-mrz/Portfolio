// Selectors
let navUl = document.querySelector('nav ul');
let num4 = document.querySelector('.background .num4');
let CC = document.querySelector('.circules-container');
let CP = document.querySelector('.project-container');
let skill_see = document.querySelector('.about .see');
let project_see = document.querySelector('.projects .see');
let toggleMode = $(".toggle-mode");
let lightMode = $('.toggle-mode img:first-of-type');
let darkMode = $('.toggle-mode img:last-of-type');
let submit = document.getElementById('submit');
let inputOne = document.getElementById('name');
let inputTwo = document.getElementById('email');
let inputThree = document.getElementById('description');
let form = document.getElementById('form');
let aboutSection = document.querySelector('.about')
let servicesSection = document.querySelector('.services')
let projectsSection = document.querySelector('.projects')
let servicesCards = document.querySelectorAll('.services .cards-container .card');

// Global Var
let skillsCount = 3;

// Get Theme From Localstorage
if(localStorage.getItem("theme")){
    let data = localStorage.getItem('theme');
    if (data === 'light') {
        $('head link#theme').remove();
        $('head').append(` <link rel="stylesheet" href="style/Light.css" id="theme">`);
    } else if (data === 'dark') {
        lightMode.toggle(); darkMode.toggle();
        $('head link#theme').remove();
        $('head').append(` <link rel="stylesheet" href="style/Dark.css" id="theme">`);
    }
}

// Add 2 Div After Reflect
$(('.reflect')).append('<div class="first"></div>');
$(('.reflect')).append('<div class="second"></div>');

// Run Animation Reflect 
setInterval(() => {
    $(('.reflect .first')).css('animation-play-state', 'running');
    $(('.reflect .second')).css('animation-play-state', 'running');
    setTimeout(() => {
        $(('.reflect .first')).css('animation-play-state', 'paused');
        $(('.reflect .second')).css('animation-play-state', 'paused');
    }, 1000);
}, 5000);

// Create Background N8
for(let i=0; i <= 699; i++) {
    let span = document.createElement('span');
    num4.appendChild(span);
}

// Clear Inputs On Submit
form.addEventListener('submit', () => {
    setTimeout(() => {
        inputOne.value = "";
        inputTwo.value = "";
        inputThree.value = "";
    }, 500);
})

// Set Not Available Buttons
$(".notAvailable").append('<div class="flow">Not Availble</div>')
$(".notAvailable").on('click', function (e) {
    e.preventDefault();
    let that = $(this).find("div:contains('Not Availble')");
    that.show();
    setInterval(() => {that.hide()}, 2500);
})

// Create Skills Circles
function getSkills() {
    fetch("js/skills.json")
    .then((response) => response.json())
    .then((data) => {
        CC.innerHTML = "";
        for(let i= 0; i < skillsCount; i++) {
            let cir_pro = document.createElement("div");
            cir_pro.className = "circule-progress";
            cir_pro.style.background = `conic-gradient(
                var(--mainColor) ${data[i].skills_value * 3.6}deg, 
                #ebebeb85 ${data[i].skills_value * 3.6}deg)`;
            cir_pro.setAttribute('data-pro', data[i].skills_value)

            let cir_hea = document.createElement('div');
            cir_hea.className = "circule-heading";
            cir_hea.appendChild(document.createTextNode(data[i].skills_title));

            let cir_val = document.createElement('div');
            cir_val.className = "circule-value";
            cir_val.appendChild(document.createTextNode(`${data[i].skills_value} %`));

            cir_pro.appendChild(cir_hea);
            cir_pro.appendChild(cir_val);
            CC.appendChild(cir_pro)
        }
    })
}
getSkills()

//
function getProjects() {
    fetch("js/projects.json")
    .then((response) => response.json())
    .then((data) => {
        CP.innerHTML = "";
        for (let i = 0; i < 4; i++) {
            let project = document.createElement('a');
            project.className = "project";
            project.href = data[i].href;
            project.target = "_blank"
        
            let title = document.createElement('div');
            title.className = "title";
            title.appendChild(document.createTextNode(data[i].title));
        
            let img = document.createElement('img');
            img.src = data[i].img;
            img.className = "loading";
        
            project.appendChild(title);
            project.appendChild(img);
            CP.appendChild(project);
        }
    })
}
getProjects();

// Show More Skills
skill_see.onclick = () => {
    if (skillsCount = 3){
        skillsCount += 3;
    }
    getSkills();
    skill_see.remove();
}

// Switch Toggle Mode
toggleMode.on('click', function () {
    lightMode.toggle();
    darkMode.toggle();
})

// Switch To Dark-Mode
lightMode.on('click', function () {
    $('head link#theme').remove();
    $('head').append(` <link rel="stylesheet" href="style/Dark.css" id="theme">`);
    localStorage.setItem('theme', 'dark');
})

// Switch To Light-Mode
darkMode.on('click', function () {
    $('head link#theme').remove();
    $('head').append(` <link rel="stylesheet" href="style/Light.css" id="theme">`);
    localStorage.setItem('theme', 'light');
})

// Set Up Nums
$(window).on("scroll", function () {
    let win = $(window).scrollTop();
    let abt = $('.about').offset().top - 200;
    let ser = $('.services').offset().top - 200;
    let prj = $('.projects').offset().top - 200;
    let tes = $('.testimonials').offset().top - 200;
    let ctc = $('.contact').offset().top - 200;
    if (win < abt) {
        $(".nums").css("transform","translateX(65px)");
        toggleActiveClass(01);
    }
    if (win > abt) {
        $(".nums").css("transform","translateX(0px)");
        toggleActiveClass(02);
    }
    if (win > ser) { toggleActiveClass(03) }
    if (win > prj) { toggleActiveClass(04) }
    if (win > tes) { toggleActiveClass(05) }
    if (win > ctc) { toggleActiveClass(06) }
})
function toggleActiveClass(e) {
    $('.nums ul').children().removeClass('active')
    $(`.nums ul li:contains(${e})`).addClass("active");
}

// function animated() {
//         // Scroll Animation About
//         $('.circules-container .circule-progress').each((e) => {
//             let progress_value = 0;
//             // let progress_end = e.data('pro');
//             e.css(
//                 {
//                     background: 'conic-gradient(red 50%, blue 0%)'
//                 })
//         })
//     }
    
//     if (window.scrollY = aboutSection.offsetTop) {
    //     // let aboutCircules = $('.circules-container .circule-progress');
    //     animated();
    //     }
    
window.onscroll = () => {
    // scroll animation projects
    let ProjectsCards = document.querySelectorAll('.projects .container .project-container .project');
    if (window.scrollY >= projectsSection.offsetTop - 200) {
        ProjectsCards.forEach((e) => {
            e.style.transform = "translateY(0px)";
            e.style.opacity = 1;
        })
    }
    if (window.scrollY < projectsSection.offsetTop - 200) {
        ProjectsCards.forEach((e) => {
            e.style.transform = "translateY(-60px)";
            e.style.opacity = 0;
        })
    }
    
    // scroll animation Serivces
    if (window.scrollY >= servicesSection.offsetTop - 200) {
        servicesCards.forEach((e) => {
            e.style.transform = "translateY(0px)";
            e.style.opacity = 1;
        })
    }
    if (window.scrollY < servicesSection.offsetTop - 200) {
        servicesCards.forEach((e) => {
            e.style.transform = "translateY(-60px)";
            e.style.opacity = 0;
        })
    }
}
