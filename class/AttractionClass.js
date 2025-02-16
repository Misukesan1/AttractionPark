class AttractionClass {

    #nom
    #capaciteMax
    #nombreActuelVisiteurs
    #popularite

    /**
     * 
     * @param {string} nom 
     * @param {number} capaciteMax 
     * @param {number} nombreActuelVisiteurs initialisé à 0
     * @param {number} popularite entre 1 et 5
     */
    constructor(nom, capaciteMax, popularite) {
        if (nom.length < 5 || nom.length > 20) throw new Error("Le nom de l'attraction doit contenir entre 5 et 20 caractères")
        if (popularite <= 0 || popularite > 5) throw new Error("La popularité de l'attraction doit obligatoirement être comprise entre 1 et 5")
        if (capaciteMax <= 0 || capaciteMax > 250) throw new Error("La capacité max de l'attraction doit être de minimum 1, et ne peut pas dépasser 250 personnes")
            
        this.#nom = nom
        this.#capaciteMax = capaciteMax
        this.#nombreActuelVisiteurs = 0
        this.#popularite = popularite
    }

    // ! setters|getters

    set nom(nom) {
        this.#nom = nom
    }

    get nom() {
        return this.#nom
    }

    set capaciteMax(capaciteMax) {
        if (capaciteMax <= 0) throw new Error("La capacité max ne peut pas ếtre négative")
        this.#capaciteMax = capaciteMax
    }

    get capaciteMax() {
        return this.#capaciteMax
    }

    set nombreActuelVisiteurs(nombreActuelVisiteurs) {
        this.#nombreActuelVisiteurs = nombreActuelVisiteurs
    }

    get nombreActuelVisiteurs() {
        return this.#nombreActuelVisiteurs
    }

    set popularite(popularite) {
        if (popularite < 1 || popularite > 5) throw new Error("La popularité ne peut pas être négative ou supérieure à 5")
        this.#popularite = popularite
    }

    get popularite() {
        return this.#popularite
    }

    // ! methods

    /**
     * ajouter des visiteurs
     * @param {number} nombre 
     * @returns {number} le nombre de visiteurs actuels
     */
    ajouterVisiteurs(nombre) {
        let nouveauTotal = this.nombreActuelVisiteurs + nombre
        if (nouveauTotal > this.capaciteMax) throw new Error("Attraction pleine !")

        return this.nombreActuelVisiteurs = nouveauTotal
    }

    /**
     * retirer des visiteurs
     * @param {number} nombre (entier uniquement)
     * @returns {number} le nombre de visiteurs actuels
     */
    retirerVisiteurs(nombre) {
        if (nombre < 0) throw new Error("Le nombre ne peut pas être négatif")

        
        return this.nombreActuelVisiteurs -= nombre
    }
}

export { AttractionClass }