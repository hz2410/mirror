window.addEventListener('load', function () {

    let socket = io();
    socket.on('connect', function () {
        console.log("Connected");
    });

    //RECEIVE a socket message from the server/
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string
        let receivedMsg = data.name + ": " + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    //SEND a socket message to the Server /
    let nameInput = document.getElementById('name-input')
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg };
 
        //Send the message object to the server
        socket.emit('msg', msgObj);
    });
});
