import { AttractionClass } from "../class/AttractionClass.js"
import { ParcClass } from "../class/ParcClass.js"

class SidebarDOM {

    // * HTML Elements

    /**
     * Liste des boutons d'actions du parc de la sidebar
     * @type {NodeListOf<Element>}
     */
    static listeBtnAction = document.querySelectorAll('aside button.sidebar-btn')

    /**
     * Formulaire de l'input nouveau Parc (sidebar)
     * @type {HTMLElement}
     */
    static formNewParc = document.getElementById("createNewParc")

    /**
     * Formulaire de l'input pour modifier le titre du parc (contenu infos du parc)
     * @type {HTMLElement}
     */
    static formTitleParcActif = document.getElementById("TitleParc")

    /**
     * Formulaire pour créer une attraction
     * @type {HTMLElement}
     */
    static formAddAttraction = document.getElementById("createNewAttraction")

    /**
     * Formulaire pour vendre des tickets
     * @type {HTMLElement}
     */
    static formVendreTickets = document.getElementById("buyTicketForm")

    /**
     * Section où afficher les message d'information pour l'utilisateur 
     * @type {Element}
     */
    static divMessageConsole = document.querySelector("section.content-info")

    /**
     * Section où afficher les messages de validations du formulaire creation d'un attraction
     * @type {Element}
     */
    static divValidationMessageAttractionForm = document.getElementById("validationFormAttractionMessage")

    /**
     * Section où afficher les messages de validations du formulaire creation d'un attraction
     * @type {Element}
     */
    static divValidationMessageTicketsForm = document.getElementById("validationFormTicketMessage")

    /**
     * Section où afficher les messages de validations du formulaire creation d'un attraction
     * @type {Element}
     */
    static divValidationMessageParcEditForm = document.getElementById("validationFormParcEditMessage")

    /**
     * Section où sont affiché les sections avec les différents contenu principaux
     * @type {Element}
     */
    static divSectionPrincipale = document.querySelector("section.content-main")

    /**
     * Section où est affiché le message général si aucun parc n'a encore été crée
     * @type {HTMLElement}
     */
    static divPasDeParcsCrees = document.getElementById("NoParcMessage")

    /**
     * Section où sont affiché les informations du parc
     * @type {HTMLElement}
     */
    static divSectionInfoParc = document.getElementById("InfoParc")

    /**
     * Section où sont affiché les informations supplémentaires du parc
     * @type {HTMLElement}
     */
    static divSectionInfosSuppParc = document.querySelector("div.park-info")

    /**
     * Section où est affiché le formulaire pour créer et ajouter une attraction
     * @type {HTMLElement}
     */
    static divSectionAjouterAttraction = document.getElementById("AddAttraction")

    /**
     * Section où est affiché le formualaire pour réaliser une vente de tickets
     * @type {HTMLElement}
     */
    static divSectionVendreTickets = document.getElementById("VendreTickets")

    /**
     * Section ou afficher les boutons des parcs crées
     * @type {Element}
     */
    static divParcsContainer = document.querySelector("div.parks-container")

    // * Props

    static #parcActif = {} // instance de ParcClass actif
    static #btnActionActif = 'Informations du parc' // bouton d'action de la sidebar d'actif
    static #listeParcs = [] // liste de toutes les instance de ParcClass de crées
    static #listeButtonsParc = [] // (boutons html) représentant les parcs crées
    static #listeParcsCards = [] // (divs html) représentant les cards parc dans la section info parc

    // ! Setter|getters

    static set parcActif(parcActif) {
        this.#parcActif = parcActif
    }

    /**
     * objet Parc actif 
     * @type {ParcClass}
     */
    static get parcActif() {
        return this.#parcActif
    }

    static set btnActionActif(btnActionActif) {
        this.#btnActionActif = btnActionActif
    }

    /**
     * nom du bouton d'action d'actif
     */
    static get btnActionActif() {
        return this.#btnActionActif
    }

    static set listeParcs(listeParcs) {
        this.#listeParcs = listeParcs
    }

    /**
     * liste de tous les objets Parc crées
     * @type {ParcClass[]}
     */
    static get listeParcs() {
        return this.#listeParcs
    }

    static set listeButtonsParc(listeButtonsParc) {
        this.#listeButtonsParc = listeButtonsParc
    }

    /**
     * liste des element html button représentant chaque parcs
     */
    static get listeButtonsParc() {
        return this.#listeButtonsParc
    }

    static set listeParcsCards(listeParcsCards) {
        this.#listeParcsCards = listeParcsCards
    }

    /**
     * liste des element html divCards représentant chaques attractions du parc
     */
    static get listeParcsCards() {
        return this.#listeParcsCards
    }

    // ! Static methods

    /**
     * gère l'affichage des boutons de tous les parcs de la liste
     * @returns 
     */
    static initDisplayButtonsParc() {
        // vider le conteneur des boutons parcs
        while(SidebarDOM.divParcsContainer.children.length !== 0) {
            SidebarDOM.divParcsContainer.lastChild.remove()
        }

        // reset la liste des buttons parc
        SidebarDOM.listeButtonsParc = []

        // afficher un message au cas ou il n'y a pas de parcs
        if (SidebarDOM.listeParcs.length === 0) {
            let p = document.createElement("p")
            p.textContent = "Pas de parcs ..."
            p.style.textAlign = "center"
            SidebarDOM.divParcsContainer.appendChild(p)

        } else {
            for (let i=0; i<SidebarDOM.listeParcs.length; i++) {
                const parc = SidebarDOM.listeParcs[i]
                const btnParc = SidebarDOM.createHtmlButtonParc(parc.nom)

                // si l objet est vide
                if (!(SidebarDOM.parcActif instanceof ParcClass)) SidebarDOM.parcActif = SidebarDOM.listeParcs[0]
    
                // mettre le style actif sur le bouton si pas de parc sélectionné sur le premier élément de la liste
                if (i === 0 && SidebarDOM.parcActif === undefined) {
                    btnParc.classList.add("active-item-park")
                }

                // mettre le style actif sur le bouton du parc actif
                if (parc.nom === SidebarDOM.parcActif.nom) btnParc.classList.add("active-item-park")
    
                SidebarDOM.listeButtonsParc.push(btnParc)
                SidebarDOM.divParcsContainer.appendChild(btnParc)
            }

        }
        
        // ajouter les ecouteurs d'evenement sur les boutons
        SidebarDOM.clickOnBtnParc()

    }

    /**
     * Charge le bon contenu a afficher dans la section principale en fonction du bouton d'action d'actif
     * @returns 
     */
    static initDisplayPrincipalContent() {

        SidebarDOM.hideFormValidationMessage()

        // cacher les sections du contenu principal
        for (const child of SidebarDOM.divSectionPrincipale.children) {
            child.style.display = 'none'
        }

        // Si aucun parc n'a été crées
        if (SidebarDOM.listeParcs.length === 0) {
            SidebarDOM.divPasDeParcsCrees.style.display = 'flex'
            return
        }

        // affichage de la bonne section en fonction du bouton d'action d'actif
        switch (SidebarDOM.btnActionActif) {
          case "Informations du parc":
            SidebarDOM.showSectionInfoParc()
            break
          case "Créer une attraction":
            SidebarDOM.showSectionAjouterAttraction()
            break
          case "Vendre des tickets":
            SidebarDOM.showSectionVendreTickets()
            break
          default:
            throw new Error("Ce nom de bouton d'action n'existe pas !")
        }
    }

    /**
     * Génère un message avec un style particulier dans la section console pour l'utilisateur. 
     * @param {string} message 
     * @param {number} messageType (0 = message normal ; 1 = message de succes ; 2 = message d'alert)
     */
    static showMessageConsole(message, messageType) {
        let paragrapheMessage = SidebarDOM.divMessageConsole.querySelector("p")
        SidebarDOM.divMessageConsole.classList.remove("alert", "success")
        switch (messageType) {
          case 0:
            paragrapheMessage.textContent = message
            break;
          case 1:
            SidebarDOM.divMessageConsole.classList.add("success")
            paragrapheMessage.textContent = message
            break;
          case 2:
            SidebarDOM.divMessageConsole.classList.add("alert")
            paragrapheMessage.textContent = message
            break;

          default:
            throw new Error("Entrez un nombre entre 0 et 2 pour le type de message à afficher")
        }
    }

    /**
     * Affiche les messages de la validation des formulaires
     * @param {Element} elementHtml
     * @param {string} message 
     * @param {number} messageType (1 = message de succes ; 2 = message d'alert)
     */
    static showValidationMessage(elementHtml, message, messageType) {
        elementHtml.style.display = 'block'
        elementHtml.classList.remove("successMessage", "errorMessage")
        switch (messageType) {
          case 1:
            elementHtml.classList.add("successMessage")
            elementHtml.textContent = message
            break
          case 2:
            elementHtml.classList.add("errorMessage")
            elementHtml.textContent = message
            break
          default:
            throw new Error(
              "Entrez un nombre entre 1 et 2 pour le type de message à afficher"
            );
        }
    }

    /**
     * Afficher l'alerte de victoire lorsque le parc atteint un pallier de bénéfice
     * @param {number} number 
     */
    static showVictoryAlert(number) {
        const overlay = document.querySelector(".overlay");
        const victoryAlert = document.querySelector(".victory-alert");
        const closeBtn = document.querySelector(".close-btn");
    
        function showVictoryAlert() {
            const p = victoryAlert.querySelector("p")
            p.textContent = `Votre parc (${SidebarDOM.parcActif.nom}) a atteint ${number}€ de bénéfices ! Continuez à faire rêver vos visiteurs !`
            overlay.style.display = "block";
            victoryAlert.style.display = "flex";
            document.body.style.overflow = "hidden"; // Empêche le scroll
        }
    
        function closeVictoryAlert() {
            overlay.style.display = "none";
            victoryAlert.style.display = "none";
            document.body.style.overflow = ""; // Réactive le scroll
        }
    
        showVictoryAlert()

        // fermer l'alert
        closeBtn.addEventListener("click", closeVictoryAlert);
    
    }

    /**
     * Réinitialiser les formulaires. Retirer également les messages d'alertes
     */
    static hideFormValidationMessage() {

        // nettoyer le formulaire "creation attraction"
        for (const input of SidebarDOM.formAddAttraction) {
            input.value = ''
        }
        // enlever les message d'alerte du form attraction
        SidebarDOM.divValidationMessageAttractionForm.style.display = 'none'

        // netoyer le formulaire "vendre des tickets"
        for (const input of SidebarDOM.formVendreTickets) {
            input.value = ''
        }
        // enlever les message d'alerte du form tickets
        SidebarDOM.divValidationMessageTicketsForm.style.display = 'none'

        // enlever les message d'alerte du form editParc
        SidebarDOM.divValidationMessageParcEditForm.style.display = 'none'
    }

    /**
     * Afficher la section information du parc.
     * Affiche un message si il n'y a pas de parcs crées
     * @returns 
     */
    static showSectionInfoParc() {
        // Charger le titre du parc dans l'input
        SidebarDOM.formTitleParcActif[0].value = SidebarDOM.parcActif.nom

        const attractionsContainer = SidebarDOM.divSectionInfoParc.querySelector("div.attractions-container")

        // effacer tout les enfants
        while (attractionsContainer.children.length !== 0) attractionsContainer.firstChild.remove()

        // Afficher les informations supplémentaires du parc
        let nomParc = SidebarDOM.divSectionInfosSuppParc.querySelector("span#park-name")
        nomParc.textContent = SidebarDOM.parcActif.nom
        let totalAttractions = SidebarDOM.divSectionInfosSuppParc.querySelector("span#attractions-total")
        totalAttractions.textContent = SidebarDOM.parcActif.listeAttractions.length
        let ticketsVendus = SidebarDOM.divSectionInfosSuppParc.querySelector("span#tickets-sold")
        ticketsVendus.textContent = `${SidebarDOM.parcActif.ticketsVendus} tickets vendus`
        let revenuTotal = SidebarDOM.divSectionInfosSuppParc.querySelector("span#total-revenue")
        revenuTotal.textContent = `${SidebarDOM.parcActif.revenuTotal} €`

        // Afficher les attractions du parc
        if (SidebarDOM.parcActif.listeAttractions.length === 0) {
            let noAttractionCard = document.createElement("div")
            noAttractionCard.classList.add("no-attractions")
            noAttractionCard.textContent = "Aucune attraction disponible"
            attractionsContainer.appendChild(noAttractionCard)
        } else {
            for (const attraction of SidebarDOM.parcActif.listeAttractions) {
                let alertCapacicteMax = false
                let attractionCard = document.createElement("div")
                attractionCard.classList.add("card")

                // Si la capacité de l'attraction est = a la capacité max (-3)
                if (attraction.nombreActuelVisiteurs >= attraction.capaciteMax-3) {
                    attractionCard.classList.add("overbooking")
                    alertCapacicteMax = true
                } 

                let content = `
                <div class="card-title">${attraction.nom}</div>
                <div class="card-info">Capacité maximale: <span>${attraction.capaciteMax}</span></div>
                <div class="card-info">Visiteurs actuels: <span class="${(alertCapacicteMax)? "alert-no-shadow" : ""}">${attraction.nombreActuelVisiteurs}</span></div>
                <div class="card-info">Popularité: <span>${attraction.popularite}</span></div>
                <div>
                    <button class="delete-btn">Supprimer</button>
                    <button class="empty-btn">Vider</button>
                </div>`
                attractionCard.innerHTML = content
                attractionsContainer.appendChild(attractionCard)

                const attractionASupprimer = SidebarDOM.parcActif.listeAttractions.find((attra) => attra.nom === attraction.nom)

                // ! ICI supprimer l'attraction !
                const btnDelete = attractionCard.querySelector("button.delete-btn")

                btnDelete.addEventListener("click", () => {

                    try {
                        SidebarDOM.parcActif.retirerAttraction(attractionASupprimer)
                        SidebarDOM.showMessageConsole(`L'attraction (${attractionASupprimer.nom}) à bien été suprimée.`, 1)
                        SidebarDOM.showSectionInfoParc()
                    } catch (error) {
                        console.log(error.message)
                    }
                    
                })

                // ! ICI vider les visiteurs de l'attraction !
                const btnEmpty = attractionCard.querySelector("button.empty-btn")

                btnEmpty.addEventListener("click", () => {
                    try {
                        attractionASupprimer.retirerVisiteurs(attractionASupprimer.nombreActuelVisiteurs)
                        SidebarDOM.showMessageConsole(`Vous pouvez maintenant ajouter des visteurs dans l'attraction (${attractionASupprimer.nom}).`, 1)
                        SidebarDOM.showSectionInfoParc()
                        console.log("liste des attractions : ", SidebarDOM.parcActif.listeAttractions)
                    } catch (error) {
                        SidebarDOM.showMessageConsole(error.message, 2)
                    }
                })

            }
        }

        // afficher la section info Parc
        SidebarDOM.divSectionInfoParc.style.display = 'flex'
    }

    /**
     * Afficher la section de la creation d'une attraction
     */
    static showSectionAjouterAttraction() {
        const title = SidebarDOM.divSectionAjouterAttraction.querySelector("h2")
        title.textContent = `Créer une Attraction pour le parc (${SidebarDOM.parcActif.nom})`
        // afficher la section ajouter attraction
        SidebarDOM.divSectionAjouterAttraction.style.display = 'flex'
    }

    /**
     * Afficher la section de la création de vente de tickets
     */
    static showSectionVendreTickets() {

        const title = SidebarDOM.divSectionVendreTickets.querySelector("h2")
        title.textContent = `Vendre des Tickets pour le parc (${SidebarDOM.parcActif.nom})` 

        // ! création du contenu du formulaire
        let content = `
        <div class="form-group">
            <label for="selectAttraction">Choisir une attraction</label>
            <select id="selectAttraction">
                <option value="" disabled selected>Sélectionnez l' attraction</option>
                ${SidebarDOM.parcActif.listeAttractions.map((attr) => `<option value="${attr.nom}">${attr.nom}</option>`)}
            </select>
        </div>
        <div class="form-group">
            <label for="ticketQuantity">Nombre de personnes à ajouter</label>
            <input type="number" id="ticketQuantity" placeholder="Nombre de personnes">
        </div>
        <div class="form-group">
            <label for="ticketPrice">Prix du ticket</label>
            <input type="text" id="ticketPrice" step="0.01" placeholder="Prix par ticket">
        </div>
        <button type="submit" class="submit-btn">Vendre tickets</button>`

        SidebarDOM.formVendreTickets.innerHTML = content

        // Retirer les informations de l'attraction sélectionnée si elles sont déjà affichées
        const divCardInfoParcExisteDeja = SidebarDOM.divSectionVendreTickets.querySelector("div.card-info-attraction")
        if (divCardInfoParcExisteDeja) divCardInfoParcExisteDeja.remove()

        // afficher la section vendre tickets
        SidebarDOM.divSectionVendreTickets.style.display = 'flex'

        // ! Afficher les informations de l'attraction sélectionnée avant de vendre des tickets
        const select = SidebarDOM.divSectionVendreTickets.querySelector("select")
        select.addEventListener("change", (e) => {

            // masquer les alertes
            SidebarDOM.divValidationMessageTicketsForm.style.display = "none"

            let alertCapacicteMax = false
            const infoAttractionSelect = SidebarDOM.parcActif.listeAttractions.find((attr) => attr.nom === e.target.value)
            
            // Retirer les informations de l'attraction sélectionnée si elles sont déjà affichées
            const divCardInfoParcExisteDeja = SidebarDOM.divSectionVendreTickets.querySelector("div.card-info-attraction")
            if (divCardInfoParcExisteDeja) divCardInfoParcExisteDeja.remove()
                
            const divCardInfoAttraction = document.createElement("div")
            divCardInfoAttraction.className = "card-info-attraction"
            
            // Si la capacité de l'attraction est = a la capacité max (-3)
            if (infoAttractionSelect.nombreActuelVisiteurs >= infoAttractionSelect.capaciteMax-3) {
                divCardInfoAttraction.classList.add("overbooking")
                alertCapacicteMax = true
            } 

            let content = `
            <div class="card-title">${infoAttractionSelect.nom}</div>
            <div class="card-info">Capacité maximale: <span>${infoAttractionSelect.capaciteMax}</span></div>
            <div class="card-info">Visiteurs actuels: <span class="${(alertCapacicteMax)? "alert-no-shadow" : ""}">${infoAttractionSelect.nombreActuelVisiteurs}</span></div>
            <div class="card-info">Popularité: <span>${infoAttractionSelect.popularite}</span></div>`

            divCardInfoAttraction.innerHTML = content
            SidebarDOM.divSectionVendreTickets.appendChild(divCardInfoAttraction)
        })
    }

    /**
     * Crée un bouton html avec le titre d'un parc à afficher dans la sidebar
     * @param {string} nomParc 
     * @returns {HTMLDivElement}
     */
    static createHtmlButtonParc(nomParc) {
        let divButtonParc = document.createElement("div")
        divButtonParc.classList.add("park-item")
        let htmlContent = `
        <span>${nomParc}</span>
        <button class="micro-btn bg-red">-</button>`
        divButtonParc.innerHTML = htmlContent

        return divButtonParc
    }

    /**
     * Change le style du bouton d'action en "actif" et le stoque dans les prop de la classe SidebarDOM.btnActionActif
     * @param {Element} btn 
     */
    static changeBtnActionActif(btn) {
        // mettre a jour le bouton actif dans les props de la classe
        SidebarDOM.btnActionActif = btn.textContent

        // enlever le style de tous les boutons d'action
        for (let button of SidebarDOM.listeBtnAction) {
            button.classList.remove("sidebar-actif")
        }

        // appliquer le style sur le boutton actif
        btn.classList.add("sidebar-actif")
    }

    /**
     * Change l'état du bouton du parc en "actif" et stoque l'instance Parc dans les prop de la classe SidebarDOM.parcActif
     * @param {*} btn 
     * @param {*} parc 
     */
    static changeBtnParcActif(btn, parc) {
        // mettre à jour le parc actif dans les props de la classe
        SidebarDOM.parcActif = parc

        // enlever le style de tous les boutons parc
        for (let button of SidebarDOM.listeButtonsParc) {
            button.classList.remove("active-item-park")
        }

        // appliquer le style sur le boutton parc actif
        btn.classList.add("active-item-park")

        SidebarDOM.showMessageConsole(`Changement du parc actif (${SidebarDOM.parcActif.nom}) :`, 0)
    }

    // ! AddEvenListeneer

    /**
     * Event lorsque l'on clique sur un bouton d'action de la sidebar
     */
    static clickOnBtnAction() {
        for (const button of SidebarDOM.listeBtnAction) {
            button.addEventListener("click", () => {
                SidebarDOM.changeBtnActionActif(button)
                // console.log("Bouton d'action actif : ", SidebarDOM.btnActionActif) // * log info bouton sidebar actif

                if (SidebarDOM.listeParcs.length !== 0) {
                    switch (SidebarDOM.btnActionActif) {
                        case "Informations du parc":
                            SidebarDOM.showMessageConsole(`Informations du parc (${SidebarDOM.parcActif.nom}) :`, 0)
                            break
                        case "Créer une attraction":
                            SidebarDOM.showMessageConsole(`Créer une attraction pour le parc (${SidebarDOM.parcActif.nom}) :`, 0)
                            break
                        case "Vendre des tickets":
                            SidebarDOM.showMessageConsole(`Vendre des tickets pour le parc (${SidebarDOM.parcActif.nom}) :`, 0)
                            break
                        default:
                          throw new Error("Ce nom de bouton d'action n'existe pas !")
                    }
                } else {
                    SidebarDOM.showMessageConsole(`Commencez par créer un nouveau parc avant de choisir une action`, 0)
                }
                
                // charger le contenu principal correct
                SidebarDOM.initDisplayPrincipalContent()
            })
        }
    }

    /**
     * Event lorsque l'on clique sur un bouton parc de la sidebar. gère aussi le click sur le bouton delete si on veut plutot supprimer le parc
     */
    static clickOnBtnParc() {
        // si c'est le delete du bouton qui est cliqué
        SidebarDOM.clickOnBtnDeleteParc()

        for (const button of SidebarDOM.listeButtonsParc) {
            button.addEventListener("click", () => {
                // console.log("parc actif : ", SidebarDOM.parcActif) // * log info bouton parc actif

                let nomParc = button.querySelector("span").textContent
                const parc = SidebarDOM.listeParcs.find((parc) => parc.nom === nomParc)
                SidebarDOM.changeBtnParcActif(button, parc)

                // Charger le contenu principal en fonction du parc que l'on sélectionne
                SidebarDOM.initDisplayPrincipalContent()
            })
        }
    }

    /**
     * Event lorsque l'on clique sur le bouton delete du bouton du parc. Supprime le parc de toutes les listes
     */
    static clickOnBtnDeleteParc() {
        for (const button of SidebarDOM.listeButtonsParc) {
            const btnParc = button.querySelector("button")
            btnParc.addEventListener("click", (e) => {
                e.stopPropagation() // ! ne pas lancer l event du click sur le bouton

                let nomParc = btnParc.parentElement.querySelector("span").textContent

                // si c'est le parc actif qui est à supprimer :
                if (SidebarDOM.parcActif.nom === nomParc) {
                    SidebarDOM.parcActif = {}
                }

                // suppression de l instance parc de la liste
                let index = SidebarDOM.listeParcs.findIndex((parc) => parc.nom === nomParc)
                if (index !== -1) {
                    let parcToDelete = SidebarDOM.listeParcs.find((parc) => parc.nom === nomParc)
                    // retire le parc de la liste de la class Parc
                    parcToDelete.supprimerParc()
                    SidebarDOM.listeParcs.splice(index, 1)
                } 

                // console.log(`delete parc : (${nomParc})`) // * log info parc supprimé
                SidebarDOM.showMessageConsole(`Le parc (${nomParc}) à été supprimé.`, 1)

                SidebarDOM.initDisplayButtonsParc()
                SidebarDOM.initDisplayPrincipalContent()
            })
        }
    }

    /**
     * Event lors de la soumission du formulaire de la création d'un parc.
     * Crée et ajoute l'instance Parc dans la liste
     */
    static submitFormParc() {
        SidebarDOM.formNewParc.addEventListener("submit", (e) => {
            e.preventDefault()
            let nomParc = e.target[0].value.trim()

            // création d'une instance de Parc 
            try {
                const parc = new ParcClass(nomParc)
                SidebarDOM.listeParcs.push(parc)

                // ! ajout de 10 parcs temporaires
                // parc.ajouter10AttractionsAuParc()

            } catch (error) {
                // si erreurs de validation
                SidebarDOM.showMessageConsole(error.message,2)
                return
            }
            
            e.target[0].value = ''
            // console.log("Parcs crées : ", SidebarDOM.listeParcs) // * log info liste des parcs
            SidebarDOM.showMessageConsole(`Le parc (${nomParc}) à été créé`, 1)

            SidebarDOM.initDisplayButtonsParc()

            // Charger le contenu principal en fonction du bouton d'action d'actif
            SidebarDOM.initDisplayPrincipalContent()

        })
    }

    /**
     * Event lors de la soumission du formulaire pour modifier le nom du parc
     * Modifie l'instance 
     */
    static submitFormParcEdit() {
        SidebarDOM.formTitleParcActif.addEventListener("submit", (e) => {
            e.preventDefault()

            const nomParc = e.target[0].value.trim()
            if (SidebarDOM.parcActif.nom === nomParc) return
            
            try {
                SidebarDOM.parcActif.nom = nomParc
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageParcEditForm, "Le nom du parc à bien été modifié", 1)
                SidebarDOM.showMessageConsole(`Informations du parc (${SidebarDOM.parcActif.nom}) :`, 0)
                SidebarDOM.initDisplayButtonsParc()
                SidebarDOM.showSectionInfoParc()
            } catch (error) {
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageParcEditForm, error.message, 2)
            }
        })
    }

    /**
     * Event lors de la soumission du formulaire de la création d'une attraction.
     * Crée et ajoute l'instance Attraction dans la liste des attraction du parc sélectionné
     */
    static submitFormAttraction() {
        SidebarDOM.formAddAttraction.addEventListener("submit", (e) =>  {
            e.preventDefault()
            
            if (!(SidebarDOM.parcActif instanceof ParcClass)) {
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageAttractionForm, "Aucun parc sélectionné !", 2)
                return
            } 
                
            try {
                const nomAttraction = e.target[0].value
                const capaciteMax = e.target[1].value
                const popularite = e.target[2].value
                
                const attraction = new AttractionClass(nomAttraction, capaciteMax, popularite)
                SidebarDOM.parcActif.ajouterAttraction(attraction)
                
                e.target[0].value = ''
                e.target[1].value = ''
                e.target[2].value = ''
                SidebarDOM.divValidationMessageAttractionForm.style.display = 'none'

                // console.log("Parc mis à jour : ", SidebarDOM.parcActif) // * log info du parc actif 
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageAttractionForm, "L'attraction à bien été ajouté au parc", 1)
                SidebarDOM.showMessageConsole(`L'attraction (${attraction.nom}) à bien été ajoutée au parc (${SidebarDOM.parcActif.nom})`, 1)

            } catch (error) {
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageAttractionForm, error.message, 2)
            }

        })
    }

    /**
     * Event lors de la soumission du formulaire de la vente de tickets du parc.
     * Ajoute les visiteurs, et fais le calcul sur le revenu du parc
     */
    static submitFormVendreTickets() {
        SidebarDOM.formVendreTickets.addEventListener("submit", (e) => {
            e.preventDefault()
            const nomAttraction = e.target[0].value
            const ajouterNombrePersonne = Number(e.target[1].value)
            const prixTicket = Number(e.target[2].value)

            try {
                SidebarDOM.parcActif.vendreTicket(nomAttraction, ajouterNombrePersonne, prixTicket)
                SidebarDOM.showMessageConsole(`(${ajouterNombrePersonne}) tickets vendus. Le revenu du parc est maintenant de : (${SidebarDOM.parcActif.revenuTotal} €)`, 0)
                e.target[0].value = ''
                e.target[1].value = ''
                e.target[2].value = ''
                
                // Retirer les informations de l'attraction sélectionnée si elles sont déjà affichées
                const divCardInfoParcExisteDeja = SidebarDOM.divSectionVendreTickets.querySelector("div.card-info-attraction")
                if (divCardInfoParcExisteDeja) divCardInfoParcExisteDeja.remove()
                    
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageTicketsForm, `Visiteurs ajoutés à l'attraction : (${nomAttraction}).`, 1)

                // ! afficher une alerte de victoire si le parc à un revenu total important !
                let benefice = SidebarDOM.parcActif.beneficesAtteint()
                if (benefice) SidebarDOM.showVictoryAlert(SidebarDOM.parcActif.revenuTotal)
                

            } catch (error) {
                SidebarDOM.showValidationMessage(SidebarDOM.divValidationMessageTicketsForm, error.message, 2)
            }
        })
    }


    /**
     * Groupement de tous les écouteurs d'évènements de la classe SidebarDOM
     */
    static initAllEventsSidebarDOM() {

        SidebarDOM.initDisplayButtonsParc()

        SidebarDOM.initDisplayPrincipalContent()
        
        SidebarDOM.clickOnBtnAction()
        
        SidebarDOM.submitFormParc()
        SidebarDOM.submitFormParcEdit()
        SidebarDOM.submitFormAttraction()
        SidebarDOM.submitFormVendreTickets()
    }

}

export { SidebarDOM }