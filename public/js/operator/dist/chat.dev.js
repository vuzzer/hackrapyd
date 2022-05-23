"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InteractiveChatbot =
/*#__PURE__*/
function () {
  function InteractiveChatbot(chatButton, chatContent, icons) {
    _classCallCheck(this, InteractiveChatbot);

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


  _createClass(InteractiveChatbot, [{
    key: "display",
    value: function display() {
      var _this = this;

      var _this$args = this.args,
          button = _this$args.button,
          chatbot = _this$args.chatbot;
      button.addEventListener('click', function () {
        return _this.toggleState(chatbot);
      });
    }
  }, {
    key: "push",
    value: function push() {
      this.state = true;
      this.showOrHideChatbot(this.args.chatbot, this.args.button);
    }
  }, {
    key: "onOrOff",
    value: function onOrOff() {
      this.state = !this.state;
      this.showOrHideChatbot(this.args.chatbot, this.args.button);
    }
    /**
     * Handle launching of chatbot support. 
     */

  }, {
    key: "toggleState",
    value: function toggleState(chatbot) {
      this.state = !this.state;
      this.showOrHideChatbot(chatbot, this.args.button);
    }
  }, {
    key: "showOrHideChatbot",
    value: function showOrHideChatbot(chatbot, button) {
      if (this.state) {
        chatbot.classList.add('chatbot--active');
        this.toggleIcon(true, button);
      } else {
        chatbot.classList.remove('chatbot--active');
        this.toggleIcon(false, button);
      }
    }
    /**
     * change icon of button
     */

  }, {
    key: "toggleIcon",
    value: function toggleIcon(state, button) {
      var _this$icons = this.icons,
          isClicked = _this$icons.isClicked,
          isNotClicked = _this$icons.isNotClicked;

      if (state) {//button.children[0].innerHTML = isClicked;
      } else {//button.children[0].innerHTML = isNotClicked;
        }
    }
  }]);

  return InteractiveChatbot;
}();