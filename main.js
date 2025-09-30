const inputs = Array.from(document.querySelectorAll(".form-control"));
const boomarkform = document.querySelector(".boomarkform");
const removeAllBtn = document.querySelector(".removeAll");
const textDanger = document.querySelectorAll('.text-danger');
let sites = JSON.parse(localStorage.getItem("sites") || "[]");
let currentIndex = null;

const validateSiteName = () => {
    const regex = /[A-Z]/;
    if (!regex.test(inputs[0].value)) {
        inputs[0].classList.add('is-invalid');
        inputs[0].classList.remove('is-valid');
        textDanger[0].textContent = "Invaild input , Site Name must start with a capital letter."
        return false;
    } else {
        inputs[0].classList.remove('is-invalid');
        inputs[0].classList.add('is-valid');
        textDanger[0].textContent = ""
        return true;
    }
}
const validateUrl = () => {
    const regex = /[A-Za-z]/;

    if (!regex.test(inputs[1].value)) {
        inputs[1].classList.add('is-invalid');
        inputs[1].classList.remove('is-valid');
        textDanger[1].textContent = "Invaild input , Site Url must contain only letters."
        return false;
    } else {
        inputs[1].classList.remove('is-invalid');
        inputs[1].classList.add('is-valid');
        textDanger[1].textContent = ""
        return true;
    }
}


const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(inputs[2].value)) {
        inputs[2].classList.add('is-invalid');
        inputs[2].classList.remove('is-valid');
        textDanger[2].textContent = "Invaild input , Email must be in a valid format (name@example.com)."
        return false;
    } else {
        inputs[2].classList.remove('is-invalid');
        inputs[2].classList.add('is-valid');
        textDanger[2].textContent = ""
        return true;
    }
}

const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (!regex.test(inputs[3].value)) {
        inputs[3].classList.add('is-invalid');
        inputs[3].classList.remove('is-valid');
        textDanger[3].textContent = "Invaild input , Password must contain at least one letter and one number."
        return false;
    } else {
        inputs[3].classList.remove('is-invalid');
        inputs[3].classList.add('is-valid');
        textDanger[3].textContent = ""
        return true;
    }
}


inputs[0].addEventListener("blur", validateSiteName);
inputs[1].addEventListener("blur", validateUrl);
inputs[2].addEventListener("blur", validateEmail);
inputs[3].addEventListener("blur", validatePassword);



boomarkform.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateSiteName()) {
        isValid = false;
    }

    if (!validateEmail()) {
        isValid = false;
    }
    if (!validatePassword()) {
        isValid = false;
    }
    if (!validatePassword()) {
        isValid = false;
    }

    if (isValid == false) return;

    const site = {
        siteName: inputs[0].value,
        siteUrl: inputs[1].value,
        userName: inputs[2].value,
        userPass: inputs[3].value,
    }
    if (currentIndex === null) {
        sites.push(site);
    } else {
        sites[currentIndex] = site;
        currentIndex = null;
        boomarkform.querySelector(".add").textContent = "Add";
    }
    localStorage.setItem("sites", JSON.stringify(sites));
    boomarkform.reset();
    displaySites();
});

const displaySites = () => {
    const result = sites.map((site, index) => {
        return `<tr>
        <td>${index + 1}</td>
        <td>${site.siteName}</td>
        <td>${site.siteUrl}</td>
        <td>${site.userName}</td>
        <td>${site.userPass}</td>
        <td><button class='btn btn-outline-danger' onclick='removeBookMark(${index})'>Remove</button></td>
        <td><button class='btn btn-outline-info' onclick='editBookMark(${index})'>Edit</button></td>
        
    </tr>`
    }).join('');
    document.querySelector(".sites_data").innerHTML = result;
}
displaySites();

const removeBookMark = (index) => {
    sites.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sites));
    displaySites();
}

const editBookMark = (index) => {
    const site = sites[index];
    inputs[0].value = site.siteName;
    inputs[1].value = site.siteUrl;
    inputs[2].value = site.userName;
    inputs[3].value = site.userPass;
    boomarkform.querySelector(".add").textContent = "Update";
    currentIndex = index;
}

removeAllBtn.addEventListener('click', function () {
    localStorage.removeItem("sites");
    sites = [];
    displaySites();
});