/* ===========================================
   EY LIVE
   Register System
=========================================== */

const form = document.getElementById("registerForm");

form.addEventListener("submit", registerUser);

function registerUser(e){

    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();

    const username = document.getElementById("username").value.trim();

    const gender = document.getElementById("gender").value;

    const birthDate = document.getElementById("birthDate").value;

    const password = document.getElementById("password").value;

    const password2 = document.getElementById("password2").value;

    const avatarFile = document.getElementById("avatar").files[0];

    if(phone.length != 10){

        alert("Telefon numarası 10 haneli olmalıdır.");

        return;

    }

    if(username.length < 3){

        alert("Kullanıcı adı en az 3 karakter olmalıdır.");

        return;

    }

    if(password.length < 6){

        alert("Şifre en az 6 karakter olmalıdır.");

        return;

    }

    if(password != password2){

        alert("Şifreler eşleşmiyor.");

        return;

    }

    let users = JSON.parse(localStorage.getItem("eylive_users")) || [];

    const phoneExists = users.find(u => u.phone == phone);

    if(phoneExists){

        alert("Bu telefon numarası zaten kayıtlı.");

        return;

    }

    const usernameExists = users.find(u => u.username.toLowerCase() == username.toLowerCase());

    if(usernameExists){

        alert("Bu kullanıcı adı kullanılmaktadır.");

        return;

    }

    const userId = createUserId(users.length + 1);

    const reader = new FileReader();

    reader.onload = function(){

        const user = {

            id: userId,

            phone: phone,

            username: username,

            gender: gender,

            birthDate: birthDate,

            avatar: reader.result,

            password: password,

            coin: 1000,

            diamond: 0,

            level: 1,

            vip: 0,

            role: "user",

            agency: "",

            publisher: false,

            createdAt: new Date().toISOString()

        };

        users.push(user);

        localStorage.setItem(

            "eylive_users",

            JSON.stringify(users)

        );

        localStorage.setItem(

            "eylive_user",

            JSON.stringify(user)

        );

        alert("Kayıt başarılı.");

        location.href = "home.html";

    }

    if(avatarFile){

        reader.readAsDataURL(avatarFile);

    }else{

        reader.onload();

    }

}

function createUserId(number){

    return "EY" + String(100000000 + number);

}
