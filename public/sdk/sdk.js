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
          <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${css && `<link rel="stylesheet" href="css/fontawesome/css/all.css">`}
          ${css && `<link rel="stylesheet" type="text/css" href="https://sdksmartagent.herokuapp.com/stylesheets/chat.css" />`}
          ${css && `<link rel="stylesheet" type="text/css" href="css/front.css">`}
          ${css && `<link rel="stylesheet" type="text/css" href="css/typing.css">`}
          </head> 
          <body>
            ${html || ''}
            ${js && `<script src="https://sdksmartagent.herokuapp.com/javascripts/index.js"></script>`}
            ${js && `<script src="https://sdksmartagent.herokuapp.com/javascripts/app.js"></script>`}
          </body>
        </html>
      `
    return getBlobURL(source, 'text/html')
}


// instance de blob
const url = getGeneratedPageURL({
    html: ' <div class="chatbox"><div class="chatbox__support"><div class="chatbox__header">Chat support!</div><div class="chatbox__messages"><div><div class="messages__item messages__item--visitor">Hi!</div><div class="messages__item messages__item--operator">What is it?</div>.<div class="messages__item messages__item--typing"><span class="messages__dot"></span><span class="messages__dot"></span><span class="messages__dot"></span></div></div></div><div class="chatbox__footer"><input type="text" placeholder="Write a message"></div></div><div class="chatbox__button"><button>Branch-1</button></div></div>',

    css: '.chatbox {position: absolute;bottom: 30px;right: 30px;}.chatbox__support {display: flex;flex-direction: column;background: #eee;width: 1200px;height: 500px;z-index: -123456;opacity: 0;transition: all .5s ease-in-out;}.chatbox--active {transform: translateY(-40px);z-index: 123456;opacity: 1;}.chatbox__button {text-align: right;}.chatbox__header {position: sticky;top: 0;background: orange;}.chatbox__messages {margin-top: auto;display: flex;flex-direction: column;overflow-y:scroll;flex-direction: column-reverse;}.messages__item {background: orange;max-width: 60.6%;width: fit-content;}.messages__item--operator {margin-left: auto;}.messages__item--visitor {margin-right: auto;}.chatbox__footer {position: sticky;bottom: 0;}',


    js: 'console.log("hi")'
})


var iframe = document.createElement('iframe');
iframe.style = "border-style: none;width: 1300px; height:800px;position:absolute; right:30px;bottom:30px;padding:0px; justify-content:center;z-index:999;"
iframe.src = url
document.body.appendChild(iframe);
