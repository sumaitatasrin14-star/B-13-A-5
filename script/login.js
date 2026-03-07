document.getElementById("signin-btn").addEventListener("click",function(){
  const inputName=document.getElementById("name");
  const userName=inputName.value;
  console.log(userName);
    

  const inputPass=document.getElementById("input-pass");
  const pass=inputPass.value;
  console.log(pass);

  if(userName == "admin" && pass == "admin123"){
    alert("Sign-in successfull")

    window.location.assign("./home.html");

  }else{
    alert("Failed");
    return;
  }


})