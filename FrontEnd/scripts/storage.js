const listeLi = document.querySelector("ul");
const loginLi = listeLi.querySelectorAll("li")[2];

if (sessionStorage.getItem("access_token") != null) {
  loginLi.innerText = "logout";
  loginLi.addEventListener("click", function () {
    sessionStorage.clear();
    document.location.reload();
  })
}