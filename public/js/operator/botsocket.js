'use strict';

class BotSocket{
    constructor(){
        this.socket = null;
        try{
            this.socket = io('http://10.10.0.200:9000', {
                reconnection: false
            } )
        }
        catch(exception) {
            console.error(exception)
        }
     this.socket.on("connect", ()=>{
         console.log(this.socket.id)
     })
    //Client disconnect
    this.socket.on("disconnect", ()=>{
    console.log(`client ${this.socket.id} disconnect`)
    })
    }
}







/* var chatSocket = null;
try{
    chatSocket = new WebSocket(`ws://${window.location.host}/ws/chat`);
}
catch(exception) {
    console.error(exception)
}

chatSocket.onerror = (e)=>{
    console.error(e);
}

chatSocket.onopen = (e)=>{
    console.log('connection etablie');

    this.onclose = (e)=>{
        console.log('connexion fermé')
    }

}
#cge.ci.info@gmail.com
chatSocket.onmessage = (e)=>{
    let data = JSON.parse(e.data);
    console.log(data);
} */



