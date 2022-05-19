"use strict";

let chatSocket = new BotSocket();

chatSocket.socket.onopen = (e) => {
    console.log('connection establish !')
}

//Listening notification after 10 seconds
chatSocket.socket.onmessage = (e)=>{
    let data = JSON.parse(e.data);
    console.log(data);
}


let operator__writing = `<div class="message__item message__item--typing">
<span class="message__dot"></span>
<span class="message__dot"></span>
<span class="message__dot"></span>
</div>"`

$(".chatbot__footer i").on("click", (e) => {
    let message = $('input[name="message"]');
    let messageContent = message.val().trim();
    if (messageContent !== '') {
        //Clear input
        message.val('');

        let html = `<div class="message__item message__item--visitor">${messageContent}</div>`
        $(html).hide().appendTo('.chatbot__messages div.support').slideDown(200);

        //Operator is writing
        let operator__writing = `<div class="message__item message__item--typing">
        <span class="message__dot"></span>
        <span class="message__dot"></span>
        <span class="message__dot"></span>
        </div>"`

        $(operator__writing).hide().appendTo(".chatbot__messages div.support").slideDown(400);
        //Delete after typing 5s
        setTimeout(() => {
            $("div.message__item--typing").remove();
        }, 5000)
        
        chatSocket.socket.onmessage = (e) => {
            let data = JSON.parse(e.data);
            //console.log(data)
            let operator = `<div class="message__item message__item--operator">${data.message}</br>efficacité : ${data.reward}</div>`
            $(operator).hide().appendTo('.chatbot__messages div.support').slideDown(400);
        }

        chatSocket.socket.send(JSON.stringify({ 'message': messageContent }));
    }
})

