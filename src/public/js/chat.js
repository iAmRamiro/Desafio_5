const socketClient = io();
let user;

const userName = document.getElementById("name");
const chatForm = document.getElementById("chatForm");
const chatText = document.getElementById("chat");
const inputMessage = document.getElementById("message");

Swal.fire({
  title: "Welcome",
  text: "What is your name",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Name is required";
    }
  },
  confirmButtonText: "Enter",
}).then((input) => {
  user = input.value;
  userName.innerHTML = user;
  socketClient.emit("newUser", user);
});

socketClient.on("userConnected", (user) => {
  Toastify({
    text: `${user} connected`,
    duration: 3600,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

chatForm.onsubmit = (e) => {
  e.preventDefault();
  const infoMessage = {
    name: user,
    message: inputMessage.value,
  };

  infoMessage.innerHTML = "";
  socketClient.emit("message", infoMessage);
};

socketClient.on("chat", (messages) => {
  const chat = messages
    .map((m) => {
      return `<p>${m.name}: ${m.message} </p>`;
    })
    .join(" ");

  chatText.innerHTML = chat;
});
