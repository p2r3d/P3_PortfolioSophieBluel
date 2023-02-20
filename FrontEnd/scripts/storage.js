if (sessionStorage.getItem("access_token") != null) {
  loginLi.innerText = "logout";
  loginLi.addEventListener("click", function () {
    sessionStorage.clear();
    document.location.reload();
  })
}