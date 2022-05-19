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

          ${css && `<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          `}

          ${css && `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">`}
          
          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/chat.css"}>`}

          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/front.css"}>`}
        
          ${css && `<link rel="stylesheet" type="text/css" href=${adresse+"css/typing.css"}>`}

          </head>
          <body>
            ${html || ''}
            ${js && `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" ></script>`}

            ${js && `<script src="https://cdn.socket.io/4.1.2/socket.io.min.js" integrity="sha384-toS6mmwu70G0fw54EGlWWeA4z3dyJ+dlXBtSURSKN4vyRFOcxd3Bzjj/AoOwY+Rg" crossorigin="anonymous"></script>`}

            ${js && `<script src="${adresse+"js/operator/chat.js"}"></script>
            `}

            ${js && `<script src="${adresse+"js/operator/socket.js"}"></script>
            `}

            ${js && `<script src="${adresse+"js/operator/language.js"}"></script>
            `}

            ${js && `<script src="${adresse+"operator.js"}"></script>
            `}

            ${js && `<script src="https://sandboxcheckouttoolkit.rapyd.net"></script>
            `}

            ${js && `<script src="${adresse+"js/rapyd.js"}"></script>
            `}
          </body>
        </html>
      `
    return getBlobURL(source, 'text/html')
}


// instance de blob
const url = getGeneratedPageURL({
  html: `<div class="chatbot"><div class="chatbot__support">
  <div class="chatbot__header"><div class="chatbot__image--header"><img src="" alt="" srcset=""></div><div class="chatbot__content--header"><h3 class="chatbot__heading--header">Cateli</h3><p class="chatbot__description--header">Cateli, votre smart operator</p></div></div>
  
  <div class="chatbot__messages">
  
    <div class="support"> 

        <div class="card card__item">
          <img src="${adresse+"img/bike-img.jpeg"}" alt="" class="card-img-top">
            <div class="card-body">
              <div class="card-title h2">bike</div>
              <a href="#" class="btn btn-warning">Buy 2$</a>
          </div>
        </div>

    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col text-center my-4" style="display: none" id="feedback">
        <div class="support">
            <img src="" id="image" alt="" height="120" class="mt-2">
            <h3 id="title" class="my-4"></h3>
            <p id="message"></p>
            <a role="button" class="btn btn-custom mt-2" href="" id="action"></a>
        </div>
    </div>
  </div>
  
  <div style="max-width: 500px; max-height: 600px;" id="rapyd-checkout">
    <img id="load" src="img/load.gif" alt="" style="display: none;">
  </div>

  <div class="chatbot__footer"><input placeholder="send message" name="message" style="font-size: 1.5em;"/><span style="font-size:2.5em; color:blueviolet; padding: 0 10px;"><i class="fas fa-paper-plane" ></i></span></div></div><div class="chatbot__button"><button><img src=${adresse + "img/chatbox-icon.svg"} /></button></div></div>`,

    css: '.chatbox {position: absolute;bottom: 30px;right: 30px;}.chatbox__support {display: flex;flex-direction: column;background: #eee;width: 1200px;height: 500px;z-index: -123456;opacity: 0;transition: all .5s ease-in-out;}.chatbox--active {transform: translateY(-40px);z-index: 123456;opacity: 1;}.chatbox__button {text-align: right;}.chatbox__header {position: sticky;top: 0;background: orange;}.chatbox__messages {margin-top: auto;display: flex;flex-direction: column;overflow-y:scroll;flex-direction: column-reverse;}.messages__item {background: orange;max-width: 60.6%;width: fit-content;}.messages__item--operator {margin-left: auto;}.messages__item--visitor {margin-right: auto;}.chatbox__footer {position: sticky;bottom: 0;}',


    js: 'console.log("hi")'
})


var iframe = document.createElement('iframe');
iframe.style = "border-style: none;width: 1300px; height:800px;position:absolute; right:30px;bottom:30px;padding:0px; justify-content:center;z-index:999;"
iframe.src =  "http://localhost:3026/chat";
document.body.appendChild(iframe);
