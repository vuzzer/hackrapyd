class InteractiveChatbot {
    constructor(chatButton, chatContent, icons){
        this.args = {
            button: chatButton,
            chatbot: chatContent
        };
        this.icons = icons;
        this.state = false; //By default the chatbot is closed
    }

    /**
     * Function display chatbot according button is pressed
     */
    display(){
        const {button, chatbot} = this.args;
        button.addEventListener('click', ()=> this.toggleState(chatbot))
    }

    push(){
        this.state = true;
        this.showOrHideChatbot(this.args.chatbot, this.args.button)
    }

    /**
     * Handle launching of chatbot support. 
     */
    toggleState(chatbot){
        this.state = !this.state;
        this.showOrHideChatbot(chatbot, this.args.button);
    }

    showOrHideChatbot(chatbot, button){
        if(this.state){
            chatbot.classList.add('chatbot--active');
            this.toggleIcon(true, button);
        }else{
            chatbot.classList.remove('chatbot--active');
            this.toggleIcon(false, button);
        }
    }

    /**
     * change icon of button
     */
    toggleIcon(state, button){
        const {isClicked, isNotClicked}= this.icons;
        if(state){
            //button.children[0].innerHTML = isClicked;
        }
        else{
            //button.children[0].innerHTML = isNotClicked;
        }
    }
}


