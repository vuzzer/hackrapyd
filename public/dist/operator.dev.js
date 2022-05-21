"use strict"; //Building smart agent

var chatButton = document.querySelector(".chatbot__button");
var chatContent = document.querySelector(".chatbot__support");
var icons = {
  isClicked: "<img src=\"{% static 'sdk/img/chatbox-icon.svg' %}\"/>",
  isNotClicked: "<img src=\"{% static 'sdk/img/chatbox-icon.svg' %}\"/>"
};
var chatbot = new InteractiveChatbot(chatButton, chatContent, icons);
chatbot.display();
chatbot.toggleIcon(false, chatButton); //Global variable

var position_to_listen = {
  fexp: null,
  fzon: null,
  ftou: null,
  fposte: null
}; //Mimic of smart for conversation

var mimic_exploitation = /^(fexp|fzon|ftou|fposte)(\s)+([0-9])+$/i;
var mimic_exploit_zone = /^(fexp)\s([0-9]){3}\s(fzon)\s([0-9]){3}$/i;
var mimic_exploit_zone_tou = /^(filt)\s([0-9])+(\s|.)([0-9])+(\s|.)([0-9])+$/i;
var dispall_all = /^(dsp)\s(all)$/i;
var done_stop = /^(done|start)$/i;
var messageContent = ""; //Language adopted of smart agent

var language = new Language(); //listening server

var operator__writing = "<div class=\"message__item message__item--typing\">\n<span class=\"message__dot\"></span>\n<span class=\"message__dot\"></span>\n<span class=\"message__dot\"></span>\n</div>\""; //Click on icon sending

$(".chatbot__footer span").on("click", function (e) {
  operator();
}); //Press Enter Key

$(".chatbot__footer").keypress(function (e) {
  //Enter key to correspond the number 13
  if (e.which === 13) {
    operator();
  }
});

function operator() {
  var message = $('input[name="message"]');
  messageContent = message.val().trim(); //Verify if income message is not empty

  if (messageContent !== "") {
    //Delete message from input
    message.val(""); //to lower case messsage

    messageContent = messageContent.toLowerCase(); //Message from visitor

    var html = "<div class=\"message__item message__item--visitor\">".concat(messageContent, "</div>");
    $(html).hide().appendTo(".chatbot__messages div.support").slideDown(200); //ScrollToBottom

    setTimeout(function () {
      language.scrollToBottom();
    }, 205); //transform message in table

    var content = messageContent.split(" ");
    var commande = messageContent.split("/^(filt|fexp|fzon|ftou|fposte)/i")[2]; //Check syntax is correct

    if (mimic_exploitation.test(messageContent)) {
      /**
       * Exploitation must be precised before to access
       * different area.
       */
      if (position_to_listen.fexp !== null) {
        //Change of exploitation completely
        if (content[0] === "fexp" && position_to_listen.fexp !== content[content.length - 1]) {
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
          fposte: null
        };
        position_to_listen[content[0]] = content[content.length - 1];
      } //console.log(commande);
      //filter data


      language.regex_commande(commande);
    } //
    else if (mimic_exploit_zone_tou.test(messageContent)) {
        position_to_listen = {
          fexp: null,
          fzon: null,
          ftou: null,
          fposte: null
        };

        var _content = messageContent.split(/(\s|\W)/i);

        console.log(_content);
        _content = _content.filter(function (code) {
          return code !== "" && code !== "." && code !== " " && code !== "filt" && code != "-";
        });

        if (_content.length == 2) {
          //Format of data enter is by example : 0(.| )0

          /* position_to_listen['fexp'] = content[0]
            position_to_listen['fzon'] = content[1] */
          console.log(_content);
        } //
        else {
            console.log(_content); //Format of data enter is by example : 0(.| )0(.| )

            position_to_listen["fexp"] = _content[0];
            position_to_listen["fzon"] = _content[1];
            position_to_listen["fposte"] = _content[2];
          }

        language.regex_commande(commande);
      } //
      else if (done_stop.test(messageContent)) {
          if (messageContent === "done") {
            language.toggleState(); //language.display();
          } //
          else {
              language.toggleState(); //Scroll

              setTimeout(function () {
                language.scrollToBottom();
              }, 405); //Check if listening is activate 

              if (!language.state_listen_alarme && language.checkArea()) {
                $(operator__writing).hide().appendTo(".chatbot__messages div.support").slideDown(400);
                setTimeout(function () {
                  $("div.message__item--typing").remove();
                  var operator = "<div class=\"message__item message__item--operator\">En \xE9coute de precision d'une zone.</div>";
                  $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

                  setTimeout(function () {
                    language.scrollToBottom();
                  }, 405);
                }, 2000);
              }
            }
        } //
        else if (dispall_all.test(messageContent)) {
            position_to_listen["fexp"] = "0";
            position_to_listen["ftou"] = "0";
            position_to_listen["fzon"] = "0";
            position_to_listen["fposte"] = "0";
            commande = "0 0 0";
            language.regex_commande(commande);
          } //
          else {
              language.mimic(3);
            }
  }
}