const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
  }
});


function errorMSG(elementId,message,status){
  if(status === false){
      document.querySelector("#"+elementId).classList.add("active");
      document.querySelector("#"+elementId).innerHTML = message;
  } else if(status === true){
      document.querySelector("#"+elementId).classList.remove("active");
      document.querySelector("#"+elementId).innerHTML = "";
  }
}


function emailValidation(){
  let input = document.querySelector("#email").value;
  let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(input.trim() == ""){
      errorMSG("emailErr","Email Address is Required!!!",false);
      return false;
  } else if(!input.match(emailRegex)){
      errorMSG("emailErr","Enter Valid Email Address!!!",false);
      return false;
  } else {
      errorMSG("emailErr","",true);
      return true;
  }
}

function pwdValidation(){
  let input = document.querySelector("#pwd").value;
  if(input.trim() == ""){
      errorMSG("pwdErr","Create Password is Required!!!",false);
      return false;
  } else if(input.length < 8){
      errorMSG("pwdErr","Enter Create Password at least 8 Characters!!!",false);
      return false;
  } else {
      errorMSG("pwdErr","",true);
      return true;
  }
}


function validation() {
  let emailErr = false, pwdErr = false;
  emailErr = emailValidation();
  pwdErr = pwdValidation();

  if(emailErr == true && pwdErr == true){
      
      if (localStorage.getItem("Auth")) {
          let getAuth = JSON.parse(localStorage.getItem("Auth"));
          let emailExists = false;
      
          for (let i = 0; i < getAuth.length; i++) {
              if (getAuth[i].email === document.querySelector("#email").value.trim()) {
                  // Email already exists
                  Toast.fire({
                      icon: "error",
                      title: "Your account already exists!"
                  });
                  emailExists = true;
                  break;
              }
          }
      
          if (emailExists) {
              Toast.fire({
                  icon: "success",
                  title: "Login successfully!"
              });
              clearFields();
          }
      } else {
        Toast.fire({
          icon: "error",
          title: "Your Account is not Exist!!!"
      });
      }
      
  } else {
      Toast.fire({
          icon: "error",
          title: "All fields are required!!!"
      });
  }
}

function clearFields(){
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#pwd").value = "";
  document.querySelector("#cpwd").value = "";
} 