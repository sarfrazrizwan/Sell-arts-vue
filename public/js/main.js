const toggleButtton = document.querySelectorAll(".navbarToggler")
for (let index = 0; index < toggleButtton.length; index++) {
  toggleButtton[index].addEventListener("click", function() {
    document.getElementById("navbarCollapse").classList.toggle("hclose")
  })
}

document.getElementById("notifications").addEventListener("click", function() {
  document.getElementById("notificationslist").classList.toggle("d-none")
})
