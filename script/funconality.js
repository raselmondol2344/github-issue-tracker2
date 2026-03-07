
// login form funconality

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", function () {
    //1 get username 
    const userNameInput = document.getElementById("user-name")
    const name =userNameInput.value;
    console.log(name);

    // 2 get password
    const passwordInput = document.getElementById("user-password")
    const password =passwordInput.value;
    console.log(password);

   // 3 condition 
   if (name =="admin" && password == "admin123")
   {
    //3.1 true :: go to home page
    alert("login success")
    window.location.href = "./home_page.html";
    
   }
   else{ 
    // 3.2 false ::  alert () & return 
    alert("login failed");
    return;
   }

  

});


