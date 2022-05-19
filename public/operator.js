"use strict";

//Building smart agent
const chatButton = document.querySelector(".chatbot__button");
const chatContent = document.querySelector(".chatbot__support");
const icons = {
  isClicked: "<img src=\"{% static 'sdk/img/chatbox-icon.svg' %}\"/>",
  isNotClicked: "<img src=\"{% static 'sdk/img/chatbox-icon.svg' %}\"/>",
};
const chatbot = new InteractiveChatbot(chatButton, chatContent, icons);
chatbot.display();
chatbot.toggleIcon(false, chatButton);

//Global variable
let position_to_listen = { fexp: null, fzon: null, ftou: null, fposte: null };
//let error_position = { fexp: null, fzon: null, ftou: null, fposte: null }

//Mimic of smart for conversation
let mimic_exploitation = /^(fexp|fzon|ftou|fposte)(\s)+([0-9])+$/i;
let mimic_exploit_zone = /^(fexp)\s([0-9]){3}\s(fzon)\s([0-9]){3}$/i;
let mimic_exploit_zone_tou = /^(filt)\s([0-9])+(\s|.)([0-9])+(\s|.)([0-9])+$/i;
let dispall_all = /^(dsp)\s(all)$/i;
let done_stop = /^(done|start)$/i;
let messageContent = ""
//Language adopted of smart agent
let language = new Language();

//listening server


let operator__writing = `<div class="message__item message__item--typing">
<span class="message__dot"></span>
<span class="message__dot"></span>
<span class="message__dot"></span>
</div>"`;

//Click on icon sending
$(".chatbot__footer span").on("click", (e) => {
  operator();
});

//Press Enter Key
$(".chatbot__footer").keypress((e) => {
  //Enter key to correspond the number 13
  if (e.which === 13) {
    operator();
  }
});

function operator() {
  let message = $('input[name="message"]');
  messageContent = message.val().trim();
  //Verify if income message is not empty
  if (messageContent !== "") {
    //Delete message from input
    message.val("");

    //to lower case messsage
    messageContent = messageContent.toLowerCase();

    //Message from visitor
    let html = `<div class="message__item message__item--visitor">${messageContent}</div>`;
    $(html).hide().appendTo(".chatbot__messages div.support").slideDown(200);

    //ScrollToBottom
    setTimeout(() => {
      language.scrollToBottom();
    }, 205);

    //transform message in table
    let content = messageContent.split(" ");
    let commande = messageContent.split("/^(filt|fexp|fzon|ftou|fposte)/i")[2];

    //Check syntax is correct
    if (mimic_exploitation.test(messageContent)) {
      /**
       * Exploitation must be precised before to access
       * different area.
       */
      if (position_to_listen.fexp !== null) {
        //Change of exploitation completely
        if (
          content[0] === "fexp" &&
          position_to_listen.fexp !== content[content.length - 1]
        ) {
          position_to_listen["ftou"] = null;
          position_to_listen["fzon"] = null;
          position_to_listen["fposte"] = null;
          position_to_listen[content[0]] = content[content.length - 1];
        } else {
          /* if (position_to_listen.fzon === null && (position_to_listen.fposte !== null || position_to_listen.ftou !== null)) {
                        $(operator__writing).hide().appendTo(".chatbot__messages div.support").slideDown(400);
                        setTimeout(() => {
                            $("div.message__item--typing").remove();
                            let operator = `<div class="message__item message__item--operator">Veuillez d'abord préciser une zone.</div>`
                            $(operator).hide().appendTo('.chatbot__messages div.support').slideDown(400);
                        }, 2000)
                    } */

          //Don't conserve incorrect instruction
          if (language.geographic_area.fexp === null) {
            position_to_listen["fexp"] = null;
            position_to_listen["ftou"] = null;
            position_to_listen["fzon"] = null;
            position_to_listen["fposte"] = null;
          } else if (language.geographic_area.fzon === null) {
            position_to_listen["fzon"] = null;
            position_to_listen["ftou"] = null;
            position_to_listen["fposte"] = null;
          } else if (language.geographic_area.ftou) {
            position_to_listen["ftou"] = null;
            position_to_listen["fposte"] = null;
          }
          position_to_listen[content[0]] = content[content.length - 1];
        }
      } else {
        /* if (content[0] === "fexp") {
          position_to_listen[content[0]] = content[content.length - 1];
          position_to_listen["ftou"] = null;
          position_to_listen["fzon"] = null;
          position_to_listen["fposte"] = null;
        }  */
        position_to_listen = {
          fexp: null,
          fzon: null,
          ftou: null,
          fposte: null,
        };
        position_to_listen[content[0]] = content[content.length - 1];
      }
      //console.log(commande);
      //filter data
      language.regex_commande(commande);
    }
    //
    else if (mimic_exploit_zone_tou.test(messageContent)) {
      position_to_listen = { fexp: null, fzon: null, ftou: null, fposte: null };

      let content = messageContent.split(/(\s|\W)/i);
      console.log(content);
      content = content.filter(
        (code) =>
          code !== "" &&
          code !== "." &&
          code !== " " &&
          code !== "filt" &&
          code != "-"
      );

      if (content.length == 2) {
        //Format of data enter is by example : 0(.| )0
        /* position_to_listen['fexp'] = content[0]
          position_to_listen['fzon'] = content[1] */
        console.log(content);
      }
      //
      else {
        console.log(content);
        //Format of data enter is by example : 0(.| )0(.| )
        position_to_listen["fexp"] = content[0];
        position_to_listen["fzon"] = content[1];
        position_to_listen["fposte"] = content[2];
      }
      language.regex_commande(commande);
    }
    //
    else if (done_stop.test(messageContent)) {
      if (messageContent === "done") {
        language.toggleState();
        //language.display();
      }
      //
      else {
        language.toggleState();
        //Scroll
        setTimeout(() => {
          language.scrollToBottom();
        }, 405);
        
        //Check if listening is activate 
        if (!language.state_listen_alarme && language.checkArea()) {
          $(operator__writing)
            .hide()
            .appendTo(".chatbot__messages div.support")
            .slideDown(400);
          setTimeout(() => {
            $("div.message__item--typing").remove();
            let operator = `<div class="message__item message__item--operator">En écoute de precision d'une zone.</div>`;
            $(operator)
              .hide()
              .appendTo(".chatbot__messages div.support")
              .slideDown(400);
  
            //ScrollToBottom
            setTimeout(() => {
              language.scrollToBottom();
            }, 405);
          }, 2000);
        } 
        }
    }
    //
    else if (dispall_all.test(messageContent)) {
      position_to_listen["fexp"] = "0";
      position_to_listen["ftou"] = "0";
      position_to_listen["fzon"] = "0";
      position_to_listen["fposte"] = "0";
      commande = "0 0 0";
      language.regex_commande(commande);
    }
    //
    else {
      language.mimic(3);
    }
  }
}
