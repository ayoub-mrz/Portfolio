let containerBeta = document.querySelector(".container")

let add = document.querySelector(".add");

let form = document.querySelector(".form");

let Create = document.querySelector(".create");
let fullName = document.querySelector(".name");
let age = document.querySelector(".age");
let email = document.querySelector(".email");
let img = document.querySelector(".img");
let color = document.querySelector(".color");
let check = document.querySelector(".check_box");
let cont = document.querySelector(".valids");

let UA = [];

GIFLS();

if (localStorage.getItem("users")) {
    UA = JSON.parse(localStorage.getItem("users"));
}

Create.onclick = function () {
    if (fullName.value != "" && age.value != "" && email.value != "" && img.value != "") {
        AUIA(fullName.value, age.value, email.value, img.value, color.value, cont.classList[1]);
        fullName.value = "";
        age.value = "";
        email.value = "";
        img.value = "";
        color.value = "";
        form.style.display = "none";
    } else {
        console.log("No");
    }
}

containerBeta.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        DLTCR(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove();
    }
})

function AUIA(fullName, age, email, prof, color, cont) {
    const user = {
        id: Date.now(),
        name: fullName,
        ages: age,
        emails: email,
        img: prof,
        colors: color, 
        validation: cont,
    }
    UA.push(user);
    AATP(UA);
    AATLS(UA);
}

function AATP(UA) {
    containerBeta.innerHTML = "";
    UA.forEach((user) => {
        let div = document.createElement("div");
        div.className = "card";
        div.setAttribute("data-id", user.id);
        div.setAttribute("draggable", "true")
        div.style.backgroundColor = user.colors;
        let img = document.createElement("img");
        img.setAttribute("src", `IMG/${user.img.slice(12)}`)
        div.appendChild(img);
        let div2 = document.createElement("div");
        div2.className = "profile-inf";
        let name = document.createElement("h4");
        name.className = "name";
        name.appendChild(document.createTextNode(user.name))
        let age = document.createElement("span");
        age.className = "age";
        age.appendChild(document.createTextNode(user.ages))
        let Dlt = document.createElement("button");
        Dlt.className = "delete"
        Dlt.appendChild(document.createTextNode("x"));
        div.appendChild(Dlt);
        let valids = document.createElement("img");
        valids.setAttribute("src", "IMG/checkmark-outline.svg")

        if (user.validation == "true") {
            valids.style.display = "block";
        } else {
            valids.style.display = "none";
        }
        
        let buton = document.createElement("div");
        buton.className = "buton";

        div2.appendChild(name);
        buton.appendChild(age);
        buton.appendChild(valids);
        div2.appendChild(buton);
        div.appendChild(div2);

        let media = document.createElement("div");
        media.className = "media"
        div.appendChild(media)

        let a1 = document.createElement("a");
        a1.setAttribute("href", user.emails);
        let imgG = document.createElement("img");
        imgG.setAttribute("src", "IMG/logo-youtube.svg");
        a1.appendChild(imgG);

        let a2 = document.createElement("a");
        a2.setAttribute("href", user.emails);
        let imgF = document.createElement("img");
        imgF.setAttribute("src", "IMG/logo-facebook.svg");
        a2.appendChild(imgF);

        let a3 = document.createElement("a");
        a3.setAttribute("href", user.emails);
        let imgI = document.createElement("img");
        imgI.setAttribute("src", "IMG/logo-instagram.svg");
        a3.appendChild(imgI);

        media.appendChild(a1)
        media.appendChild(a2)
        media.appendChild(a3)
        containerBeta.appendChild(div);
    });
}

function AATLS(UA) {
    localStorage.setItem("users", JSON.stringify(UA));
}

function GIFLS() {
    let data = localStorage.getItem("users")
    if (data) {
        let users = JSON.parse(data);
        AATP(users);
    }
}

function DLTCR(userId) {
    UA = UA.filter((user) => userId != user.id)
    AATLS(UA);
}

check.onclick = function () {
    cont.classList.toggle("true")
    cont.classList.toggle("false")
}

add.onclick = function() {
form.style.display = "flex";
}


new Sortable(containerBeta, {
    animation: 300
});