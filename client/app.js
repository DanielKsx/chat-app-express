
const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = "";

function login(event) {
    event.preventDefault();
    const userNameValue = userNameInput.value.trim();
    if (!userNameValue) {
        alert("Empty!")
        return;
    }
    userName = userNameValue;
    loginForm.classList.remove("show")
    messagesSection.classList.add("show")
};

function sendMessage(event) {
    event.preventDefault();
    const userTextValue = messageContentInput.value.trim();
    if (!userTextValue) {
        alert("Message is empty")
        return;
    }
    addMessage(userName, userTextValue);
    messageContentInput.value = "";
};

function addMessage(author, content) {
    const message = document.createElement("li");
    const authorElement = document.createElement("h3");
    const contentElement = document.createElement("div");

    message.classList.add("message", "message--received");
    authorElement.classList.add("message__author");
    contentElement.classList.add("message__content");

    contentElement.textContent = content;

    if (author === userName) {
        message.classList.add("message--self")
        authorElement.textContent = "You"
    } else {
        authorElement.textContent = author
    }

    message.appendChild(authorElement);
    message.appendChild(contentElement);
    messagesList.appendChild(message);
}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);

