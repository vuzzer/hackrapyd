"use strict";
class Language {
  constructor() {
    this.chatSocket = new BotSocket();
    this.count_alarm = 0;
    this.state_listen_alarme = false; //listening is stopped
    this.data = null;
    this.commande = "0 0 0";
    this.geographic_area = { fexp: "0", fzon: "0", ftou: "0", fposte: "0" };

    //==============================================
    // REGEX EXPLOITATION ZONE POSTE
    //==============================================
    this.zero_regex = /^(0|0{2}|0{3})$/i;
    this.global_regex = /^((0|0{2}|0{3})|((0)?43))$/i;

    this.exploitation_regex = /^((0)?43)$/i;
    this.zone_regex = /^(210)$/i;
    this.posteR21_regex = /^((0)?21)$/i;
    this.posteR30_regex = /^((0)?30)$/i;

    this.exploitation_zone_regex =
      /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))?(\s|\W)*(cellule(s)?|transfo(s)?|depart(s)?)?$/i;
    this.exploitation_zone_poste =
      /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(cellule(s)?|transfo(s)?|depart(s)?)?$/i;
    this.exploitation_zone_poste_cellule_regex =
      /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(cellule(s)?)$/i;
    this.exploitation_zone_poste_transfo_regex =
      /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(transfo(s)?)$/i;
    this.exploitation_zone_poste_depart_regex =
      /^(043)(\s|\W)*(210)(\s|\W)*(P00(21|30))(\s|\W)*(depart(s)?)$/i;

    this.all_exploitation_regex =
      /^(0|(0){3})(\s|\W)*(0|(0){3})?(\s|\W)*(0|(0){3})?$/i;
    this.all_exploitation_zone_regex =
      /^(0|(0){3})(\s|\W)*(210)(\s|\W)*(0|(0){3})?$/i;
    this.all_exploitation_zone_posteR21_regex =
      /^(0|(0){3})(\s|\W)*(0|(0){3})(\s|\W)*(P0021)$/i;
    this.all_exploitation_zone_posteR30_regex =
      /^(0|(0){3})(\s|\W)*(0|(0){3})(\s|\W)*(P0030)$/i;

    //========================================
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
    this.routeDepartR30 = "P0030.210.043.DEPARTS";

    //========================================
    //Color CSS for frontend
    //========================================
    this.color_cellule = "#ff7f50"
    this.color_transfo = "#7bed9f"
    this.color_tableau = "#ffa502"

    this.n_poste30 = "30"
    this.n_poste21 = "21"
      
    //========================================
    //Call socket function
    //========================================
    this.zero_filtrage()
  }

  realtime() {
    if (!chatbot.state) {
      chatbot.push();
    }
    //Listening notification after 10 seconds
    this.chatSocket.socket.on("P0021.210.043.CELLULES", (dataAll) => {
      this.data = dataAll;
      //console.log(dataFromServer)
      //console.log(dataFromServer[0])

      //Checks table of alarm is not empty
      if (this.data.length > 0) {
        this.data.forEach((item) => {
          if (item.libelle_alerte !== "") {
            //Smart agent simulate writing during 2 seconds
            console.log(item);
            let operator = `<div class="message__item message__item--operator">
                                        <strong>Source d'info:</strong>${item.id_poste}<br/>
                                        <hr>
                                        <br/>
                                        <strong>Alarme: </strong>${item.description_mesure}<br/>
                                        <strong>Libelle: </strong>${item.libelle_alerte}<br/>
                                        <strong>Date: </strong>${item.date_heure_mesure}<br/>
                                        <br/>
                                        <strong>Proposition de causes</strong><br/>
                                        <hr>
                                        CM R21 300<br/>
                                        CM R21 300<br/>
                                        CM R21 300<br/>
                                        <br/>
                                        <strong>Proposition d'actions</strong><br/>
                                        <hr>
                                        ACT R21 300<br/>
                                        ACT R21 300<br/>
                                        ACT R21 300<br/>
                                        </div>`;
            $(operator)
              .hide()
              .appendTo(".chatbot__messages div.support")
              .slideDown(400);
            //ScrollToBottom
            setTimeout(() => {
              this.scrollToBottom();
            }, 405);
          }
        });
      }
    });
  }

  //Functjon to display message.
  mimic(code_mimic) {
    let operator__writing = `<div class="message__item message__item--typing">
        <span class="message__dot"></span>
        <span class="message__dot"></span>
        <span class="message__dot"></span>
        </div>"`;

    code_mimic = String(code_mimic);
    //positon_to_listen variable comes from mime.js
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
        $(operator__writing)
          .hide()
          .appendTo(".chatbot__messages div.support")
          .slideDown(400);
        //ScrollToBottom
        setTimeout(() => {
          this.scrollToBottom();
        }, 405);

        setTimeout(() => {
          //Delete typing
          $("div.message__item--typing").remove();
          let operator = `<div class="message__item message__item--operator">commande n'est pas reconnu.</div>`;
          $(operator)
            .hide()
            .appendTo(".chatbot__messages div.support")
            .slideDown(400);
          
          //ScrollToBottom
          setTimeout(() => {
            this.scrollToBottom();
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
  filtrage() {
    //console.log("success")

    //Display authorized zone
    this.authorized_area();
    this.zero_filtrage();
    this.quaranteTrois_filtraga();
  }

  /**
   * Display all alarm of exploitation 43
   */
  quaranteTrois_filtraga() {
    //43.0.0
    if (
      this.exploitation_regex.test(position_to_listen.fexp) &&
      position_to_listen.fzon === null &&
      position_to_listen.fposte === null
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);

      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
    //43.210.0
    else if (
      this.exploitation_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.geographic_area.fposte === null
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);

      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
    //43.210.21
    else if (
      this.exploitation_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.posteR21_regex.test(this.geographic_area.fposte)
    ) {

      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
    }
    //43.210.30
    else if (
      this.exploitation_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.posteR30_regex.test(this.geographic_area.fposte)
    ) {
      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau,this.n_poste30);
    }
  }

  /**
   * Display all alarm of exploitation 0
   */
  zero_filtrage() {
    //000.000.000
    if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zero_regex.test(this.geographic_area.fzon) &&
      this.zero_regex.test(this.geographic_area.fposte)
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);

      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
    //000.210.000
    else if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.zero_regex.test(this.geographic_area.fposte)
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);

      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
    //000.000.21
    else if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zero_regex.test(this.geographic_area.fzon) &&
      this.posteR21_regex.test(this.geographic_area.fposte)
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
    }
    //000.000.30
    else if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zero_regex.test(this.geographic_area.fzon) &&
      this.posteR30_regex.test(this.geographic_area.fposte)
    ) {
      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
    //000.210.21
    else if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.posteR21_regex.test(this.geographic_area.fposte)
    ) {
      //P0021.210.043.CELLULES
      this.display(this.routeCelluleR21, this.color_cellule, this.n_poste21);
      //P0021.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR21, this.color_transfo, this.n_poste21);
      //P0021.210.043.DEPARTS
      this.display_depart(this.routeDepartR21, this.color_tableau, this.n_poste21);
    }
    //000.210.30
    else if (
      this.zero_regex.test(this.geographic_area.fexp) &&
      this.zone_regex.test(this.geographic_area.fzon) &&
      this.posteR30_regex.test(this.geographic_area.fposte)
    ) {
      //P0030.210.043.CELLULES
      this.display(this.routeCelluleR30, this.color_cellule, this.n_poste30);
      //P0030.210.043.TRANSFOS
      this.display_tranfo(this.routeTransfoR30, this.color_transfo, this.n_poste30);
      //P0030.210.043.DEPARTS
      this.display_depart(this.routeDepartR30, this.color_tableau, this.n_poste30);
    }
  }

  /**
   * display authorized zone
   */
  authorized_area() {
    //Indicates the alarm listening zone
    if (
      position_to_listen.fexp !== "0" &&
      position_to_listen.fzon !== "0" &&
      position_to_listen.ftou !== "0" &&
      position_to_listen.fposte !== "0"
    ) {
      //Indicate specific zone that uses as requested
      let operator = `<div class="message__item message__item--operator">Bienvenue !<br/>
    ${
      position_to_listen.fexp !== null
        ? `Exploitation: ${position_to_listen.fexp}<br/>`
        : ""
    }
    ${
      position_to_listen.fzon !== null
        ? `Zone: ${position_to_listen.fzon}<br/>`
        : ""
    }
    ${
      position_to_listen.ftou !== null
        ? `Tournée: ${position_to_listen.ftou}<br/>`
        : ""
    }
    ${
      position_to_listen.fposte !== null
        ? `Poste: ${position_to_listen.fposte}`
        : ""
    }
    </div>`;
      $(operator)
        .hide()
        .appendTo(".chatbot__messages div.support")
        .slideDown(400);
      //ScrollToBottom
      setTimeout(() => {
        this.scrollToBottom();
      }, 405);
    }
    //Listen to alarms from all zones
    else {
      let operator = `<div class="message__item message__item--operator">Vous recevez toutes les alarmes de toutes les zones!<br/>
                        </div>`;
      $(operator)
        .hide()
        .appendTo(".chatbot__messages div.support")
        .slideDown(400);
      //ScrollToBottom
      setTimeout(() => {
        this.scrollToBottom();
      }, 405);
    }
  }

  /**
   * Display forbidden zone
   */
  forbidden_zone() {
    let operator = `<div class="message__item message__item--operator">
        ${
          position_to_listen.fexp !== null 
            ? `Le perimètre préciser est incorrect.<br/>Exploitation: ${position_to_listen.fexp}<br/>`
            : "Aucune zone preciser ! Veuillez spécifier une zone."
        }
        ${
          position_to_listen.fexp !== null && position_to_listen.fzon !== null
            ? `Zone: ${position_to_listen.fzon}<br/>`
            : ""
        }
        ${
          position_to_listen.fexp !== null &&
          position_to_listen.ftou !== null &&
          position_to_listen.fzon !== null
            ? `Tournée: ${position_to_listen.fzon}<br/>`
            : ""
        }
        ${
          position_to_listen.fposte !== null &&
          position_to_listen.fexp !== null &&
          position_to_listen.ftou !== null &&
          position_to_listen.fzon !== null
            ? `Poste: ${position_to_listen.fposte}<br/>`
            : ""
        }
        
        ${
          position_to_listen.fexp === null &&
          (position_to_listen.fposte !== null ||
            position_to_listen.ftou !== null ||
            position_to_listen.fzon !== null)
            ? `Exploitation manquant<br/>`
            : ""
        }
        ${
          (position_to_listen.fexp !== null ||
            position_to_listen.fexp === null) &&
          position_to_listen.fzon === null &&
          (position_to_listen.fposte !== null ||
            position_to_listen.ftou !== null)
            ? `Zone manquant<br/>`
            : ""
        }
        ${
          (position_to_listen.fexp !== null ||
            position_to_listen.fexp === null) &&
          (position_to_listen.fzon !== null ||
            position_to_listen.fzon === null) &&
          position_to_listen.ftou === null &&
          position_to_listen.fposte !== null
            ? `Tournée manquant<br/>`
            : ""
        }
        </div>`;
    $(operator)
      .hide()
      .appendTo(".chatbot__messages div.support")
      .slideDown(400);

    //ScrollToBottom
    setTimeout(() => {
      this.scrollToBottom();
    }, 405);
  }

  /**
   * Activate listening
   */
  toggleState() {
    //Control execution of command 'Done'
    console.log(this.checkArea())
    if (this.checkArea() && messageContent === "done") {
      this.state_listen_alarme = true
    }
    //Control execution of command 'Start'
    else if (this.checkArea() && messageContent === "start") {
      this.state_listen_alarme = false
    }
    else {
      this.forbidden_zone()
    }
  }

  /**
   * checkArea 
   */
  checkArea() {
    if (this.geographic_area.fexp === "" && this.geographic_area.fposte === "" && this.geographic_area.ftou === "" && this.geographic_area.fzon === "") {
      return false;
    }
    else {
      return true;
    }
  }

  /**
   * Checks command
   * @param {commande} commande
   */
  regex_commande(commande) {
    //Check syntax of command
    if (
      this.global_regex.test(position_to_listen.fexp) &&
      (this.zone_regex.test(position_to_listen.fzon) ||
        position_to_listen.fzon === null ||
        this.zero_regex.test(position_to_listen.fzon)) &&
      (this.posteR21_regex.test(position_to_listen.fposte) ||
        this.posteR30_regex.test(position_to_listen.fposte) ||
        position_to_listen.fposte === null ||
        this.zero_regex.test(position_to_listen.fposte))
    ) {
      this.geographic_area = this.format_write(position_to_listen);
      this.commande = commande;
      this.filtrage();
    } else {
      this.forbidden_zone();
    }

    let messages = document.querySelector(".chatbot__messages");
    let shouldScroll =
      messages.scrollTop + messages.clientHeight === messages.scrollHeight;
    if (!shouldScroll) {
      console.log(shouldScroll);
      messages.scrollTop = messages.scrollHeight;
    }
  }

  /**
   * Formating writing in input
   * 
   */
  format_write(position_to_listen) {
    if (position_to_listen.fexp === "043" || position_to_listen.fexp === "000" || position_to_listen.fexp === "00") {
      if (position_to_listen.fexp === "043") {
        position_to_listen.fexp = "43"
      }
      else if (position_to_listen.fexp === "000" || position_to_listen.fexp === "00") {
        position_to_listen.fexp = "0"
      }
    }

    //fzon
    if (position_to_listen.fzon === "000" || position_to_listen.fzon === "00") {
      if (position_to_listen.fzon === "000" || position_to_listen.fzon === "00") {
        position_to_listen.fzon = "0"
      }
    }

    //fposte
    if (position_to_listen.fposte === "000" || position_to_listen.fposte === "00" || position_to_listen.fposte === "030" || position_to_listen.fposte === "021") {
      if (position_to_listen.fposte === "030") {
        position_to_listen.fposte = "30"
      }
      else if (position_to_listen.fposte === "021") {
        position_to_listen.fposte ="21"
      }
      else if (position_to_listen.fposte === "000" || position_to_listen.fposte === "00") {
        position_to_listen.fposte = "0"
      }
    }
    return position_to_listen;
  }

  /**
   * Display alarms
   */
  display(route, color, poste) {
    //Check syntax of command
    this.chatSocket.socket.on(route, (data) => {
      let consumer = Array(data);
      let alarms = consumer[0];
      if (this.state_listen_alarme) {
        this.recursive_display(alarms, 0, color, poste);
      }
    });
  }

  /**
   * Dipslay alarms of departs
   * @param {*} consumer 
   */
  display_depart(route, color, poste) {
    this.chatSocket.socket.on(route, (data) => {
      let consumer = Array(data)
      let sensor_data = consumer[0]
      sensor_data = sensor_data["tab1"]
      
      if (this.state_listen_alarme) {
        //Depart 1
        if (sensor_data["dep1"] !== undefined) {
          this.recursive_display(sensor_data["dep1"], 0, color, poste)
        }
        //Depart 2
        else if (sensor_data["dep2"] !== undefined) {
          this.recursive_display(sensor_data["dep2"], 0, color, poste)
        }
        //Depart 3
        else if (sensor_data["dep3"] !== undefined) {
          this.recursive_display(sensor_data["dep3"], 0, color, poste)
        }
        //Depart 4
        else if (sensor_data["dep4"] !== undefined) {
          this.recursive_display(sensor_data["dep4"], 0, color, poste)
        }
      }
    })
  }

  /**
   * Display sensor data from transfo
   */
  display_tranfo(route, color, poste) {
    this.chatSocket.socket.on(route, (data) => {
      let consumer = Array(data)
      let sensor_data = consumer[0]
      if (this.state_listen_alarme) {
        this.recursive_display(sensor_data[0], 0, color, poste) // Display sensor data from transfo 1
        this.recursive_display(sensor_data[1], 0, color, poste) // Display sensor data from transfo 2
      }
  })  
  }


  /**
   * Recursively display sensor data
   * @param {*} consumer 
   * @param {*} index 
   */
  recursive_display(consumer, index, color, poste) {
    if (index < consumer.length) {
      //Read non-zero values
      if (consumer[index].id_poste !== undefined) {
        console.log(this.geographic_area)
        if ((this.geographic_area.fposte === consumer[index].id_poste.split(".")[0].substr(3, 4) || this.geographic_area.fposte
        === "0") && (this.geographic_area.fzon === consumer[index].id_poste.split(".")[1] || this.geographic_area.fzon === "0") && (this.geographic_area.fexp === consumer[index].id_poste.split(".")[2].substr(1,2) || this.geographic_area.fexp === "0")) {
          console.log(`consumer : ${consumer.length} index : ${index}`);
          let operator = `<div class="message__item message__item--operator">
                                              <strong style="color:${color};">Source d'info:${consumer[index].id_poste}</strong><br/>
                                              <hr>
                                              <br/>
                                              <strong>Alarme: </strong>${consumer[index].description_mesure}<br/>
                                              <strong>Libelle: </strong>${consumer[index].libelle_alerte}<br/>
                                              <strong>Date: </strong>${consumer[index].date_heure_mesure}<br/>
                                              <br/>
                                              <strong style="color:red;">Causes probables</strong><br/>
                                              <hr>
                                              CM R${poste} ${this.getRandomInt()}<br/>
                                              CM R${poste}  ${this.getRandomInt()}<br/>
                                              CM R${poste}  ${this.getRandomInt()}<br/>
                                              <br/>
                                              <strong style="color:blue;">Proposition d'actions</strong><br/>
                                              <hr>
                                              ACT R${poste}  ${this.getRandomInt()}<br/>
                                              ACT R${poste}  ${this.getRandomInt()}<br/>
                                              ACT R${poste}  ${this.getRandomInt()}<br/>
                                              </div>`;
          $(operator)
            .hide()
            .appendTo(".chatbot__messages div.support")
            .slideDown(0);
          //ScrollToBottom
          this.scrollToBottom();
        }
        index = index + 1;
        this.recursive_display(consumer, index, color, poste); 
        }

     /* else if ((this.geographic_area.fposte === consumer[index].id_poste.split(".")[0].substr(2, 3) || this.geographic_area.fposte
       === "0") && (this.geographic_area.fzon === consumer[index].id_poste.split(".")[1] || this.geographic_area.fzon === "0") && (this.geographic_area.fexp === consumer[index].id_poste.split(".")[2] || this.geographic_area.fexp === "0") ) {
          if (consumer[index].id_poste !== undefined) {
            console.log(`consumer : ${consumer.length} index : ${index}`);
            let operator = `<div class="message__item message__item--operator">
                                                <strong style="color:${color};">Source d'info:${consumer[index].id_poste}</strong><br/>
                                                <hr>
                                                <br/>
                                                <strong>Alarme: </strong>${consumer[index].description_mesure}<br/>
                                                <strong>Libelle: </strong>${consumer[index].libelle_alerte}<br/>
                                                <strong>Date: </strong>${consumer[index].date_heure_mesure}<br/>
                                                <br/>
                                                <strong style="color:red;">Proposition de causes</strong><br/>
                                                <hr>
                                                CM R${poste} ${this.getRandomInt()}<br/>
                                                CM R${poste}  ${this.getRandomInt()}<br/>
                                                CM R${poste}  ${this.getRandomInt()}<br/>
                                                <br/>
                                                <strong style="color:blue;">Proposition d'actions</strong><br/>
                                                <hr>
                                                ACT R${poste}  ${this.getRandomInt()}<br/>
                                                ACT R${poste}  ${this.getRandomInt()}<br/>
                                                ACT R${poste}  ${this.getRandomInt()}<br/>
                                                </div>`;
            $(operator)
              .hide()
              .appendTo(".chatbot__messages div.support")
              .slideDown(0);
            //ScrollToBottom
            this.scrollToBottom();
          }

          index = index + 1;
          this.recursive_display(consumer, index, color, poste);
        
        }*/
    }
  }

  getRandomInt() {
    let min = Math.ceil(100);
    let max = Math.floor(500);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * ScrollToBottom
   */
  scrollToBottom() {
    let messages = document.querySelector(".chatbot__messages");
    let shouldScroll =
      messages.scrollTop + messages.clientHeight === messages.scrollHeight;
    if (!shouldScroll) {
      messages.scrollTop = messages.scrollHeight;
    }
  }
}
