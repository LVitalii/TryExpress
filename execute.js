var keySend = document.getElementById("user-send");
var keyGet = document.getElementById("user-get");

keySend.addEventListener("click", function () {
    var userName = document.getElementById("user-name").value;
    var userPass = document.getElementById("user-pass").value;
    var userEmail = document.getElementById("user-email").value;

    $.ajax({
        url: "http://localhost:3000",
        method: "POST",
        data: {name: userName, password: userPass, email: userEmail},
        dataType: "text"//,
        // success: function (data) {
        //     document.getElementById("send-status").innerHTML="Data are sent to server";
        // }
    }).done(function (msg) {
        document.getElementById("send-status").innerHTML=msg;
    });
}, false);

keyGet.addEventListener("click", function () {
   var userEmailSaved = document.getElementById("user-email-saved").value;

   $.ajax({
       url: "http://localhost:3000",
       method: "GET",
       data: {email: userEmailSaved},
       dataType: "json"//,
       // success: function (data) {
       //     alert ("it is completed" + data
   }).done(function (msg) {
      var names = [];
       var passwords = [];
       msg.forEach(function (element, index, array) {
           names.push(element.name);
           passwords.push(element.password);
       })
       document.getElementById("user-name-saved").innerHTML="For requested email there are names: " + names.toString() + " and their passwords: " + passwords.toString();
   })
},false);