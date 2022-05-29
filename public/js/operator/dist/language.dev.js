"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Language =
/*#__PURE__*/
function () {
  function Language() {
    _classCallCheck(this, Language);

    this.chatSocket = new BotSocket();
    this.count_alarm = 0;
    this.state_listen_alarme = false; //listening is stopped

    this.data = null;
    this.commande = "0 0 0";
    this.geographic_area = {
      fexp: "0",
      fzon: "0",
      ftou: "0",
      fposte: "0"
    }; //==============================================
    // REGEX EXPLOITATION ZONE POSTE
    //==============================================

    this.zero_regex = /^(0|0{2}|0{3})$/i;
    this.global_regex = /^((0|0{2}|0{3})|((0)?43))$/i;
    this.exploitation_regex = /^((0)?43)$/i;
    this.zone_regex = /^(210)$/i;
    this.posteR21_regex = /^((0)?21)$/i;
    this.posteR30_regex = /^((0)?30)$/i;
    this.exploitation_zone_regex = /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))?(\s|\W)*(cellule(s)?|transfo(s)?|depart(s)?)?$/i;
    this.exploitation_zone_poste = /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(cellule(s)?|transfo(s)?|depart(s)?)?$/i;
    this.exploitation_zone_poste_cellule_regex = /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(cellule(s)?)$/i;
    this.exploitation_zone_poste_transfo_regex = /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(transfo(s)?)$/i;
    this.exploitation_zone_poste_depart_regex = /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(depart(s)?)$/i;
    this.all_exploitation_regex = /^(0|(0){3})(\s|\W)*(0|(0){3})?(\s|\W)*(0|(0){3})?$/i;
    this.all_exploitation_zone_regex = /^(0|(0){3})(\s|\W)*(210)(\s|\W)*(0|(0){3})?$/i;
    this.all_exploitation_zone_posteR21_regex = /^(0|(0){3})(\s|\W)*(0|(0){3})(\s|\W)*(P0021)$/i;
    this.all_exploitation_zone_posteR30_regex = /^(0|(0){3})(\s|\W)*(0|(0){3})(\s|\W)*(P0030)$/i; //========================================
    //Route
    //========================================
    //P0021.210.043.CELLULES
    //P0021.210.043.TRANSFOS
    //P0021.210.043.DEPARTS
    //P0030.210.043.CELLULES
    //P0030.210.043.TRANSFOS
    //P0030.210.043.DEPARTS

    this.routeCelluleR21 = "P0021.210.043.CELLULES";
    this.routeTransfoR21 = "P0021.210.043.TRANSFOS";
    this.routeDepartR21 = "P0021.210.043.DEPARTS";
    this.routeCelluleR30 = "P0030.210.043.CELLULES";
    this.routeTransfoR30 = "P0030.210.043.TRANSFOS";
    this.routeDepartR30 = "P0030.210.043.DEPARTS"; //========================================
    //Color CSS for frontend
    //========================================

    this.color_cellule = "#ff7f50";
    this.color_transfo = "#7bed9f";
    this.color_tableau = "#ffa502";
    this.n_poste30 = "30";
    this.n_poste21 = "21"; //========================================
    //Call socket function
    //========================================

    this.zero_filtrage();
  }

  _createClass(Language, [{
    key: "realtime",
    value: function realtime() {
      var _this = this;

      if (!chatbot.state) {
        chatbot.push();
      } //Listening notification after 10 seconds


      this.chatSocket.socket.on("P0021.210.043.CELLULES", function (dataAll) {
        _this.data = dataAll; //console.log(dataFromServer)
        //console.log(dataFromServer[0])
        //Checks table of alarm is not empty

        if (_this.data.length > 0) {
          _this.data.forEach(function (item) {
            if (item.libelle_alerte !== "") {
              //Smart agent simulate writing during 2 seconds
              console.log(item);
              var operator = "<div class=\"message__item message__item--operator\">\n                                        <strong>Source d'info:</strong>".concat(item.id_poste, "<br/>\n                                        <hr>\n                                        <br/>\n                                        <strong>Alarme: </strong>").concat(item.description_mesure, "<br/>\n                                        <strong>Libelle: </strong>").concat(item.libelle_alerte, "<br/>\n                                        <strong>Date: </strong>").concat(item.date_heure_mesure, "<br/>\n                                        <br/>\n                                        <strong>Proposition de causes</strong><br/>\n                                        <hr>\n                                        CM R21 300<br/>\n                                        CM R21 300<br/>\n                                        CM R21 300<br/>\n                                        <br/>\n                                        <strong>Proposition d'actions</strong><br/>\n                                        <hr>\n                                        ACT R21 300<br/>\n                                        ACT R21 300<br/>\n                                        ACT R21 300<br/>\n                                        </div>");
              $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

              setTimeout(function () {
                _this.scrollToBottom();
              }, 405);
            }
          });
        }
      });
    } //Functjon to display message.

  }, {
    key: "mimic",
    value: function mimic(code_mimic) {
      var _this2 = this;

      var operator__writing = "<div class=\"message__item message__item--typing\">\n        <span class=\"message__dot\"></span>\n        <span class=\"message__dot\"></span>\n        <span class=\"message__dot\"></span>\n        </div>\"";
      code_mimic = String(code_mimic); //positon_to_listen variable comes from mime.js

      console.log(position_to_listen);

      switch (code_mimic) {
        case "0":
          //Operator is writing
          //this.chatSocket.socket.send(JSON.stringify({ 'message': messageContent }));
          //User asks to listen alarm of specific zone
          this.filtrage();
          break;

        case "1":
          //Listen all alarms of all area
          this.chatSocket.socket.send(JSON.stringify(position_to_listen));
          this.filtrage();
          break;

        case "2":
          this.filtrage();
          break;

        case "3":
          $(operator__writing).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

          setTimeout(function () {
            _this2.scrollToBottom();
          }, 405);
          setTimeout(function () {
            //Delete typing
            $("div.message__item--typing").remove();
            var operator = "<div class=\"message__item message__item--operator\">I am in the learning phase, I want you to suggest the items in your baskets for purchase.</div>";
            $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

            setTimeout(function () {
              _this2.scrollToBottom();
            }, 405);
          }, 2000);
          break;
      }
    }
    /**
     * Sort out data following intructions of geographic restriction
     * ('fexp','fzon','ftou')
     * fexp : exploitation
     * fzon : zone
     * ftou : tournée
     */

  }, {
    key: "filtrage",
    value: function filtrage() {
      //console.log("success")
      //Display authorized zone
      this.authorized_area();
      this.zero_filtrage();
      this.quaranteTrois_filtraga();
    }
    /**
     * Display all alarm of exploitation 43
     */

  }, {
    key: "quaranteTrois_filtraga",
    value: function quaranteTrois_filtraga() {
      //43.0.0
      if (this.exploitation_regex.test(position_to_listen.fexp) && position_to_listen.fzon === null && position_to_listen.fposte === null) {
        //P0021.210.043.CELLULES
        this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

        this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

        this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21); //P0030.210.043.CELLULES

        this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

        this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

        this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
      } //43.210.0
      else if (this.exploitation_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.geographic_area.fposte === null) {
          //P0021.210.043.CELLULES
          this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

          this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

          this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21); //P0030.210.043.CELLULES

          this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

          this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

          this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
        } //43.210.21
        else if (this.exploitation_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.posteR21_regex.test(this.geographic_area.fposte)) {
            //P0021.210.043.CELLULES
            this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

            this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

            this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
          } //43.210.30
          else if (this.exploitation_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.posteR30_regex.test(this.geographic_area.fposte)) {
              //P0030.210.043.CELLULES
              this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

              this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

              this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
            }
    }
    /**
     * Display all alarm of exploitation 0
     */

  }, {
    key: "zero_filtrage",
    value: function zero_filtrage() {
      //000.000.000
      if (this.zero_regex.test(this.geographic_area.fexp) && this.zero_regex.test(this.geographic_area.fzon) && this.zero_regex.test(this.geographic_area.fposte)) {
        //P0021.210.043.CELLULES
        this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

        this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

        this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21); //P0030.210.043.CELLULES

        this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

        this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

        this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
      } //000.210.000
      else if (this.zero_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.zero_regex.test(this.geographic_area.fposte)) {
          //P0021.210.043.CELLULES
          this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

          this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

          this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21); //P0030.210.043.CELLULES

          this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

          this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

          this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
        } //000.000.21
        else if (this.zero_regex.test(this.geographic_area.fexp) && this.zero_regex.test(this.geographic_area.fzon) && this.posteR21_regex.test(this.geographic_area.fposte)) {
            //P0021.210.043.CELLULES
            this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

            this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

            this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
          } //000.000.30
          else if (this.zero_regex.test(this.geographic_area.fexp) && this.zero_regex.test(this.geographic_area.fzon) && this.posteR30_regex.test(this.geographic_area.fposte)) {
              //P0030.210.043.CELLULES
              this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

              this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

              this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
            } //000.210.21
            else if (this.zero_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.posteR21_regex.test(this.geographic_area.fposte)) {
                //P0021.210.043.CELLULES
                this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21); //P0021.210.043.TRANSFOS

                this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21); //P0021.210.043.DEPARTS

                this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
              } //000.210.30
              else if (this.zero_regex.test(this.geographic_area.fexp) && this.zone_regex.test(this.geographic_area.fzon) && this.posteR30_regex.test(this.geographic_area.fposte)) {
                  //P0030.210.043.CELLULES
                  this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30); //P0030.210.043.TRANSFOS

                  this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30); //P0030.210.043.DEPARTS

                  this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
                }
    }
    /**
     * display authorized zone
     */

  }, {
    key: "authorized_area",
    value: function authorized_area() {
      var _this3 = this;

      //Indicates the alarm listening zone
      if (position_to_listen.fexp !== "0" && position_to_listen.fzon !== "0" && position_to_listen.ftou !== "0" && position_to_listen.fposte !== "0") {
        //Indicate specific zone that uses as requested
        var operator = "<div class=\"message__item message__item--operator\">Bienvenue !<br/>\n    ".concat(position_to_listen.fexp !== null ? "Exploitation: ".concat(position_to_listen.fexp, "<br/>") : "", "\n    ").concat(position_to_listen.fzon !== null ? "Zone: ".concat(position_to_listen.fzon, "<br/>") : "", "\n    ").concat(position_to_listen.ftou !== null ? "Tourn\xE9e: ".concat(position_to_listen.ftou, "<br/>") : "", "\n    ").concat(position_to_listen.fposte !== null ? "Poste: ".concat(position_to_listen.fposte) : "", "\n    </div>");
        $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

        setTimeout(function () {
          _this3.scrollToBottom();
        }, 405);
      } //Listen to alarms from all zones
      else {
          var _operator = "<div class=\"message__item message__item--operator\">Vous recevez toutes les alarmes de toutes les zones!<br/>\n                        </div>";
          $(_operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

          setTimeout(function () {
            _this3.scrollToBottom();
          }, 405);
        }
    }
    /**
     * Display forbidden zone
     */

  }, {
    key: "forbidden_zone",
    value: function forbidden_zone() {
      var _this4 = this;

      var operator = "<div class=\"message__item message__item--operator\">\n        ".concat(position_to_listen.fexp !== null ? "Le perim\xE8tre pr\xE9ciser est incorrect.<br/>Exploitation: ".concat(position_to_listen.fexp, "<br/>") : "Aucune zone preciser ! Veuillez spécifier une zone.", "\n        ").concat(position_to_listen.fexp !== null && position_to_listen.fzon !== null ? "Zone: ".concat(position_to_listen.fzon, "<br/>") : "", "\n        ").concat(position_to_listen.fexp !== null && position_to_listen.ftou !== null && position_to_listen.fzon !== null ? "Tourn\xE9e: ".concat(position_to_listen.fzon, "<br/>") : "", "\n        ").concat(position_to_listen.fposte !== null && position_to_listen.fexp !== null && position_to_listen.ftou !== null && position_to_listen.fzon !== null ? "Poste: ".concat(position_to_listen.fposte, "<br/>") : "", "\n        \n        ").concat(position_to_listen.fexp === null && (position_to_listen.fposte !== null || position_to_listen.ftou !== null || position_to_listen.fzon !== null) ? "Exploitation manquant<br/>" : "", "\n        ").concat((position_to_listen.fexp !== null || position_to_listen.fexp === null) && position_to_listen.fzon === null && (position_to_listen.fposte !== null || position_to_listen.ftou !== null) ? "Zone manquant<br/>" : "", "\n        ").concat((position_to_listen.fexp !== null || position_to_listen.fexp === null) && (position_to_listen.fzon !== null || position_to_listen.fzon === null) && position_to_listen.ftou === null && position_to_listen.fposte !== null ? "Tourn\xE9e manquant<br/>" : "", "\n        </div>");
      $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(400); //ScrollToBottom

      setTimeout(function () {
        _this4.scrollToBottom();
      }, 405);
    }
    /**
     * Activate listening
     */

  }, {
    key: "toggleState",
    value: function toggleState() {
      //Control execution of command 'Done'
      console.log(this.checkArea());

      if (this.checkArea() && messageContent === "done") {
        this.state_listen_alarme = true;
      } //Control execution of command 'Start'
      else if (this.checkArea() && messageContent === "start") {
          this.state_listen_alarme = false;
        } else {
          this.forbidden_zone();
        }
    }
    /**
     * checkArea 
     */

  }, {
    key: "checkArea",
    value: function checkArea() {
      if (this.geographic_area.fexp === "" && this.geographic_area.fposte === "" && this.geographic_area.ftou === "" && this.geographic_area.fzon === "") {
        return false;
      } else {
        return true;
      }
    }
    /**
     * Checks command
     * @param {commande} commande
     */

  }, {
    key: "regex_commande",
    value: function regex_commande(commande) {
      //Check syntax of command
      if (this.global_regex.test(position_to_listen.fexp) && (this.zone_regex.test(position_to_listen.fzon) || position_to_listen.fzon === null || this.zero_regex.test(position_to_listen.fzon)) && (this.posteR21_regex.test(position_to_listen.fposte) || this.posteR30_regex.test(position_to_listen.fposte) || position_to_listen.fposte === null || this.zero_regex.test(position_to_listen.fposte))) {
        this.geographic_area = this.format_write(position_to_listen);
        this.commande = commande;
        this.filtrage();
      } else {
        this.forbidden_zone();
      }

      var messages = document.querySelector(".chatbot__messages");
      var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;

      if (!shouldScroll) {
        console.log(shouldScroll);
        messages.scrollTop = messages.scrollHeight;
      }
    }
    /**
     * Formating writing in input
     * 
     */

  }, {
    key: "format_write",
    value: function format_write(position_to_listen) {
      if (position_to_listen.fexp === "043" || position_to_listen.fexp === "000" || position_to_listen.fexp === "00") {
        if (position_to_listen.fexp === "043") {
          position_to_listen.fexp = "43";
        } else if (position_to_listen.fexp === "000" || position_to_listen.fexp === "00") {
          position_to_listen.fexp = "0";
        }
      } //fzon


      if (position_to_listen.fzon === "000" || position_to_listen.fzon === "00") {
        if (position_to_listen.fzon === "000" || position_to_listen.fzon === "00") {
          position_to_listen.fzon = "0";
        }
      } //fposte


      if (position_to_listen.fposte === "000" || position_to_listen.fposte === "00" || position_to_listen.fposte === "030" || position_to_listen.fposte === "021") {
        if (position_to_listen.fposte === "030") {
          position_to_listen.fposte = "30";
        } else if (position_to_listen.fposte === "021") {
          position_to_listen.fposte = "21";
        } else if (position_to_listen.fposte === "000" || position_to_listen.fposte === "00") {
          position_to_listen.fposte = "0";
        }
      }

      return position_to_listen;
    }
    /**
     * Display alarms
     */

  }, {
    key: "display",
    value: function display(route, color, poste) {
      var _this5 = this;

      //Check syntax of command
      this.chatSocket.socket.on(route, function (data) {
        var consumer = Array(data);
        var alarms = consumer[0];

        if (_this5.state_listen_alarme) {
          _this5.recursive_display(alarms, 0, color, poste);
        }
      });
    }
    /**
     * Dipslay alarms of departs
     * @param {*} consumer 
     */

  }, {
    key: "display_depart",
    value: function display_depart(route, color, poste) {
      var _this6 = this;

      this.chatSocket.socket.on(route, function (data) {
        var consumer = Array(data);
        var sensor_data = consumer[0];
        sensor_data = sensor_data["tab1"];

        if (_this6.state_listen_alarme) {
          //Depart 1
          if (sensor_data["dep1"] !== undefined) {
            _this6.recursive_display(sensor_data["dep1"], 0, color, poste);
          } //Depart 2
          else if (sensor_data["dep2"] !== undefined) {
              _this6.recursive_display(sensor_data["dep2"], 0, color, poste);
            } //Depart 3
            else if (sensor_data["dep3"] !== undefined) {
                _this6.recursive_display(sensor_data["dep3"], 0, color, poste);
              } //Depart 4
              else if (sensor_data["dep4"] !== undefined) {
                  _this6.recursive_display(sensor_data["dep4"], 0, color, poste);
                }
        }
      });
    }
    /**
     * Display sensor data from transfo
     */

  }, {
    key: "display_tranfo",
    value: function display_tranfo(route, color, poste) {
      var _this7 = this;

      this.chatSocket.socket.on(route, function (data) {
        var consumer = Array(data);
        var sensor_data = consumer[0];

        if (_this7.state_listen_alarme) {
          _this7.recursive_display(sensor_data[0], 0, color, poste); // Display sensor data from transfo 1


          _this7.recursive_display(sensor_data[1], 0, color, poste); // Display sensor data from transfo 2

        }
      });
    }
    /**
     * Recursively display sensor data
     * @param {*} consumer 
     * @param {*} index 
     */

  }, {
    key: "recursive_display",
    value: function recursive_display(consumer, index, color, poste) {
      if (index < consumer.length) {
        //Read non-zero values
        if (consumer[index].id_poste !== undefined) {
          console.log(this.geographic_area);

          if ((this.geographic_area.fposte === consumer[index].id_poste.split(".")[0].substr(3, 4) || this.geographic_area.fposte === "0") && (this.geographic_area.fzon === consumer[index].id_poste.split(".")[1] || this.geographic_area.fzon === "0") && (this.geographic_area.fexp === consumer[index].id_poste.split(".")[2].substr(1, 2) || this.geographic_area.fexp === "0")) {
            console.log("consumer : ".concat(consumer.length, " index : ").concat(index));
            var operator = "<div class=\"message__item message__item--operator\">\n                                              <strong style=\"color:".concat(color, ";\">Source d'info:").concat(consumer[index].id_poste, "</strong><br/>\n                                              <hr>\n                                              <br/>\n                                              <strong>Alarme: </strong>").concat(consumer[index].description_mesure, "<br/>\n                                              <strong>Libelle: </strong>").concat(consumer[index].libelle_alerte, "<br/>\n                                              <strong>Date: </strong>").concat(consumer[index].date_heure_mesure, "<br/>\n                                              <br/>\n                                              <strong style=\"color:red;\">Causes probables</strong><br/>\n                                              <hr>\n                                              CM R").concat(poste, " ").concat(this.getRandomInt(), "<br/>\n                                              CM R").concat(poste, "  ").concat(this.getRandomInt(), "<br/>\n                                              CM R").concat(poste, "  ").concat(this.getRandomInt(), "<br/>\n                                              <br/>\n                                              <strong style=\"color:blue;\">Proposition d'actions</strong><br/>\n                                              <hr>\n                                              ACT R").concat(poste, "  ").concat(this.getRandomInt(), "<br/>\n                                              ACT R").concat(poste, "  ").concat(this.getRandomInt(), "<br/>\n                                              ACT R").concat(poste, "  ").concat(this.getRandomInt(), "<br/>\n                                              </div>");
            $(operator).hide().appendTo(".chatbot__messages div.support").slideDown(0); //ScrollToBottom

            this.scrollToBottom();
          }

          index = index + 1;
          this.recursive_display(consumer, index, color, poste);
        }
      }
    }
  }, {
    key: "getRandomInt",
    value: function getRandomInt() {
      var min = Math.ceil(100);
      var max = Math.floor(500);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * ScrollToBottom
     */

  }, {
    key: "scrollToBottom",
    value: function scrollToBottom() {
      var messages = document.querySelector(".chatbot__messages");
      var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;

      if (!shouldScroll) {
        messages.scrollTop = messages.scrollHeight;
      }
    }
  }]);

  return Language;
}();