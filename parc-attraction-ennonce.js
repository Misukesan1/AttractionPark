/**
 * 
Exercice : Gestion d'un Parc d'Attractions 🎢

Tu dois simuler la gestion des attractions d'un parc, avec des visiteurs qui peuvent acheter des tickets et profiter des attractions.
Les objectifs :

    Créer une classe Attraction :
        Chaque attraction doit avoir :
            Un nom (string).
            Une capacité maximale (number).
            Un nombre actuel de visiteurs (number, initialisé à 0).
            Une popularité (number entre 1 et 5).
        Méthodes :
            ajouterVisiteurs(nombre): Ajoute des visiteurs à l'attraction si la capacité maximale n'est pas dépassée. Sinon, affiche : "Attraction pleine !".
            retirerVisiteurs(nombre): Retire un certain nombre de visiteurs (minimum 0).

    Créer une classe Parc :
        Le parc doit avoir :
            Un nom (string).
            Une liste d'attractions (array d'instances de Attraction).
            Un revenu total (number, initialisé à 0).
        Méthodes :
            ajouterAttraction(attraction): Ajoute une attraction au parc.
            afficherAttractions(): Affiche dans la console la liste des attractions, avec leurs noms et popularités.
            vendreTicket(attractionNom, nombreDeVisiteurs, prixTicket):
                Trouve l'attraction par son nom.
                Ajoute les visiteurs à l'attraction si possible.
                Augmente le revenu total du parc (nombreDeVisiteurs * prixTicket).
                Si l'attraction est pleine, affiche : "Impossible d'ajouter les visiteurs, attraction pleine.".

Les contraintes :

    Une attraction ne peut jamais dépasser sa capacité maximale.
    Les visiteurs ne peuvent pas être négatifs (ni ajoutés ni retirés).
    Si tu tentes d'ajouter une attraction avec un nom déjà existant dans le parc, affiche un message : "Cette attraction existe déjà.".
*/

