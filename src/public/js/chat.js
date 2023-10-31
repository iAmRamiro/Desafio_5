const socketClient = io();

let user;
let email;

const signinForm = document.getElementById("signin");
const chatForm = document.getElementById("chatForm");
const currentUsers = document.getElementById("currentUsers");
const userList = document.getElementById("usernames");
const chatText = document.getElementById("chat");
const inputMessage = document.getElementById("message");
const nameTitle = document.getElementById("name");

signinForm.onsubmit = (e) => {
  e.preventDefault();

  user = document.getElementById("user").value;
  email = document.getElementById("email").value;

  if (user.trim() !== "" && email.trim() !== "") {
    signinForm.style.display = "none";
    chatForm.style.display = "block";
    currentUsers.style.display = "block";
    nameTitle.innerHTML = user;
  } else {
    alert("fill all fields");
  }

  socketClient.emit("userConnected", user);
};

chatForm.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    user,
    email,
    message: inputMessage.value,
  };

  console.log(infoMessage);
  socketClient.emit("message", infoMessage);
  inputMessage.value = "";
};

socketClient.on("chat", (messages) => {
  console.log(messages);
  const chat = messages
    .map((m) => {
      return `<p>${m.user}: ${m.message} </p>`;
    })
    .join(" ");

  chatText.innerHTML = chat;
});

socketClient.on("users", (users) => {
  const parrafo = document.createElement("p");

  for (let i = 0; i < users.length; i++) {
    parrafo.innerHTML += `<p>${users[i]} </p>`;
  }

  userList.append(parrafo);
});

function updateUsersList(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  for (const user of users) {
    const listItem = document.createElement("li");
    listItem.textContent = user;
    userList.appendChild(listItem);
  }
}

socketClient.on("userDisconnected", (disconnectedUser) => {
  const userIndex = users.indexOf(disconnectedUser);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    updateUsersList(users);
  }
});
