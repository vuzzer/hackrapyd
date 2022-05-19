"use strict";
let adresse = "http://localhost:3015/";

const getGeneratedPageURL = ({ html, css, js }) => {
    const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
    }

    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    const source = `
        <html>
          <head>
          ${css && `<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
          `}

          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/chat.css"}>`}
          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/front.css"}>`}
          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/typing.css"}>`}
          </head>

          <body>
            ${html || ''}

            ${js && `<script src="https://cdn.socket.io/4.1.2/socket.io.min.js" integrity="sha384-toS6mmwu70G0fw54EGlWWeA4z3dyJ+dlXBtSURSKN4vyRFOcxd3Bzjj/AoOwY+Rg" crossorigin="anonymous"></script>`}

            ${js && `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" ></script>`}

            ${js && `<script src="${adresse+"js/operator/chat.js"}"></script>
            `}
            ${js && `<script src="${adresse+"js/operator/socket.js"}"></script>
            `}
            ${js && `<script src="${adresse+"js/operator/language.js"}"></script>
            `}

            ${js && `<script src="${adresse+"operator.js"}"></script>
            `}
          </body>
        </html>
      `
    return getBlobURL(source, 'text/html')
}


// instance de blob
const url = getGeneratedPageURL({
    html: `<div class="chatbot"><div class="chatbot__support"><div class="chatbot__header"><div class="chatbot__image--header"><img src="" alt="" srcset=""></div><div class="chatbot__content--header"><h3 class="chatbot__heading--header">Cateli</h3><p class="chatbot__description--header">Cateli, votre smart operator</p></div></div><div class="chatbot__messages"><div class="support"><div class="message__item message__item--operator">Hi ! I\'m Cateli smart agent, your agent of supervision.</div></div></div><div class="chatbot__footer"><input placeholder="send message" name="message" style="font-size: 1.5em;"/><span style="font-size:2.5em; color:blueviolet; padding: 0 10px;"><i class="fas fa-paper-plane" ></i></span></div></div><div class="chatbot__button"><button><img src="http://localhost:3015/img/chatbox-icon.svg"/></button></div></div>`,

    css: '.chatbox {}',


    js: 'console.log("hi")'
})


var iframe = document.createElement('iframe');
iframe.style = "border-style: none;width: 630px; height:900px;position:absolute; right:0px;bottom:0px;padding:0px; justify-content:center; z-index:10030;"

iframe.src = 'http://localhost:3015/smart_agent'
document.body.appendChild(iframe);