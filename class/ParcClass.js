import { AttractionClass } from "./AttractionClass.js"

class ParcClass {

    #nom
    #listeAttractions
    #revenuTotal
    #ticketsVendus
    
    static #listeParcs = []

    constructor(nom) {

        if (nom.length < 3 || nom.length > 30) throw new Error("Le nom du parc doit contenir entre 3 et 30 caractères")

        const nomDejaPris = ParcClass.listeParcs.find((parc) => parc.nom === nom)
        if (nomDejaPris) throw new Error("Ce nom de parc existe déjà")

        this.#nom = nom
        this.#listeAttractions = []
        this.#revenuTotal = 0
        this.#ticketsVendus = 0

        ParcClass.listeParcs.push(this)
    }

    // ! setters|getters

    set nom(nom) {
        const nomDejaPris = ParcClass.listeParcs.find((parc) => parc.nom === nom && parc !== this)
        if (nomDejaPris) throw new Error("Ce nom de parc est déjà pris")
            
        this.#nom = nom
    }

    get nom() {
        return this.#nom
    }

    set listeAttractions(listeAttractions) {
        this.#listeAttractions = listeAttractions
    }

    /**
     * @type {AttractionClass[]}
     */
    get listeAttractions() {
        return this.#listeAttractions
    }

    set revenuTotal(revenuTotal) {
        this.#revenuTotal = revenuTotal
    }

    get revenuTotal() {
        return this.#revenuTotal
    }

    set ticketsVendus(ticketsVendus) {
        this.#ticketsVendus = ticketsVendus
    }

    get ticketsVendus() {
        return this.#ticketsVendus
    }

    static set listeParcs(listeParcs) {
        this.#listeParcs = listeParcs
    }

    static get listeParcs() {
        return this.#listeParcs
    }



    // ! methods

    /**
     * Supprime le parc de la liste des parcs
     */
    supprimerParc() {
        const index = ParcClass.listeParcs.findIndex((parc) => parc === this)

        if (index === -1) throw new Error("Ce parc n'existe pas dans la liste")

        ParcClass.listeParcs.splice(index, 1)
    }

    /**
     * ajoute l'attraction à la liste des attractions du parc (! le nom de l'attraction doit être unique)
     * @param {AttractionClass} attraction 
     * @returns {void}
     */
    ajouterAttraction(attraction) {
        if (!(attraction instanceof AttractionClass)) throw new Error("Seule une instance de AttractionClass est accepté")

        const attractionExisteDeja = this.listeAttractions.find((objet) => objet.nom === attraction.nom)
        if (attractionExisteDeja) throw new Error("Ce nom d'attraction existe déjà dans le parc")

        this.listeAttractions.push(attraction)

    }

    /**
     * supprime l'attraction de la liste des attractions du parc
     * @param {AttractionClass} attraction 
     * @returns {void}
     */
    retirerAttraction(attraction) {

        if (!(attraction instanceof AttractionClass)) throw new Error("Seule une instance de AttractionClass est accepté")

        const index = this.listeAttractions.findIndex((attr) => attr === attraction)

        if (index === -1) throw new Error("Cette attraction n'existe pas dans le parc")
            
        this.listeAttractions.splice(index, 1)
        console.log("liste des attraction après la suppression : ", this.listeAttractions)
        
    }

    /**
     * Génère un message dans la console avec toutes les attractions du parc (nom + popularité)
     */
    afficherAttractions() {
        console.log("---------------------------------------")
        console.log("Liste des attractions du parc")
        console.log("---------------------------------------")
        this.listeAttractions.map((attraction) => {
            console.log("Nom : ", attraction.nom)
            console.log("Popoularité : ", attraction.popularite)
        })
    }

    /**
     * Ajoute des visiteurs dans une attraction, et augmente le revenu du parc
     * @param {string} nomAttraction 
     * @param {number} nombreDeVisiteurs 
     * @param {number} prixTicket entier et supérieur à 0 uniquement
     * @returns {void}
     */
    vendreTicket(nomAttraction, nombreDeVisiteurs, prixTicket) {
        
        
        const selectAttraction = this.listeAttractions.find((objet) => objet.nom === nomAttraction)
        
        if (!selectAttraction) throw new Error("Ce nom d'attraction n'existe pas dans le parc")
        if(prixTicket <= 0) throw new Error("Le prix du ticket ne peut pas être égal ou inférieur à 0")
        if (isNaN(prixTicket)) throw new Error("Le prix du ticket doit être un nombre supérieur à 0")

        try {
            selectAttraction.ajouterVisiteurs(nombreDeVisiteurs)
            this.revenuTotal += (nombreDeVisiteurs * prixTicket)
            this.ticketsVendus += nombreDeVisiteurs
            console.log("Les visiteurs ont été ajouté à l'attraction")
        } catch {
            throw new Error("Impossible d'ajouter les visiteurs. Attraction pleine !")
        }
    }

    /**
     * renvoie le bénéfice du parc si il attein un certain pallier
     * @returns {number}
     */
    beneficesAtteint() {
        let revenu = ''
        if (this.revenuTotal >= 100000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 500000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 1000000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 2000000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 5000000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 10000000) {
            return revenu = this.revenuTotal
        } else if (this.revenuTotal >= 20000000) {
            return revenu = this.revenuTotal
        }
    }

    // * Tests Methods

    /**
     * 
     * @param {ParcClass} parc 
     */
    ajouter10AttractionsAuParc() {

    const parc1 = new AttractionClass("Attraction 1", 32, 4)
    const parc2 = new AttractionClass("Attraction 2", 24, 2)
    const parc3 = new AttractionClass("Attraction 3", 20, 3)
    const parc4 = new AttractionClass("Attraction 4", 40, 5)
    parc4.ajouterVisiteurs(37)
    const parc5 = new AttractionClass("Attraction 5", 68, 4)
    const parc6 = new AttractionClass("Attraction 6", 12, 3)
    const parc7 = new AttractionClass("Attraction 7", 16, 4)
    const parc8 = new AttractionClass("Attraction 8", 10, 1)
    const parc9 = new AttractionClass("Attraction 9", 2, 4)
    const parc10 = new AttractionClass("Attraction 10", 4, 2)

    let tableauAttractions = [parc1, parc2, parc3, parc4, parc5, parc6, parc7, parc8, parc9, parc10]

    for (const attr of tableauAttractions) {
        this.ajouterAttraction(attr)
        console.log(`Attraction (${attr.nom}) ajouté au parc (${this.nom})`) // * log info
    }

    }
}

export { ParcClass }