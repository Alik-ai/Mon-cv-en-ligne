const divResultat = document.querySelector("#resultat");


//Ceci est un tableau multidimensionnel

let tabJeu = [
    [0,0,0,0],  //Dedans ce sont des valeurs || éléments
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

//ce tableau contient les valeurs avec les images
// let tabResultat = [
//     [5,8,4,3],
//     [2,7,6,2],
//     [4,3,1,8],
//     [1,5,6,7]
// ]

let tabResultat = genereTableauAleatoire();
let oldSelection = [];
//savoir ou est ce que j'en suis (ca conserve)
let nbAffiche = 0;
//ext ce qu'on peu cliquer sur un nouveau bouton
let ready = true;


afficherTableau();

//Cette fonction realise l'affichage sur la page web des img
function afficherTableau () {
    let txt = "";
        //ca veut dire que I doit parcourir les quatres lignes grace à length 
    for(let i=0; i < tabJeu.length ; i++){                        //length = ligne 
        // a chaque tour de boucle, je crée une div, donc 4 div 
        txt += "<div>";
        //[j] est egal a la valeur 0
                               // [i] verifie si chaque ligne c'est egal a un boutton ou a une image avec l'aide de j
        for(let j=0; j < tabJeu[i].length ; j++){
            // Je mets une condition : si la valeur de mon éléments vaut 0 => alors t'affiche le bouton  
            if(tabJeu [i][j] === 0){                   
                //cette fonction permet de verifier si c'est la meme valeur pour chaque clic si oui sa affiche les images sinon sa les retourne
                txt +="<button class='btn btn-primary imageCartes' onClick = 'verif(\""+i+"-"+j+"\")'></button>";
            }
            // Sinon affiche une image
            else{
                txt += "<img src='" +getImage(tabJeu[i][j])+"'>";
            }
        }
        txt += "</div>";
        
    }

    divResultat.innerHTML = txt;
}
afficherTableau();

//cette fonction retourne les images quand elles correspondent aux chiffres
function getImage(valeur){
    let imgTxt = "image/"
    switch(valeur){
        //Qu'elle numero correspond a qu'elle image
        case 1 : imgTxt += "elephant.png"
        break;
        case 2 : imgTxt += "giraffe.png"
        break;
        case 3 : imgTxt += "hippo.png"
        break;
        case 4 : imgTxt += "monkey.png"
        break;
        case 5 : imgTxt += "panda.png"
        break;
        case 6 : imgTxt += "parrot.png"
        break;
        case 7 : imgTxt += "penguin.png"
        break;
        case 8 : imgTxt += "pig.png"
        break;
        default : console.log("cas non pris en compte")
    }
    return imgTxt;
}

//Cette function recupere la ligne et la colonne
function verif(bouton){ 
    if(ready){
        nbAffiche ++;
        let ligne = bouton.substr(0,1);
        let colonne = bouton.substr(2,1);
        //je veux que quand on clique sur un 0 a la place ce mette un numeroe
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne] ;//tableau de reusltat afficher
        afficherTableau();
        if(nbAffiche > 1){
            ready = false;
            setTimeout(() =>{
                //verification
                if(tabJeu [ligne] [colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                    tabJeu[ligne][colonne] = 0;
                    //le 1er old c'est pour la ligne et le 2eme old c'esy pour la colonne
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                }
                afficherTableau();
                ready = true;
                nbAffiche = 0;
                oldSelection = [ligne,colonne];
                //apres le temps qu'il faut qu'il attende...1000ms = 1s
            },500)
            
        }else{
            oldSelection = [ligne,colonne];
        }
        //le orecedent element selctionnes contiendra
        
    }
}

function genereTableauAleatoire(){
    let tab = [ ];

    let nbImagePosition = [0,0,0,0,0,0,0,0];

    for(let i = 0 ; i < 4 ; i++){
        let ligne = [];
        for(let j = 0 ; j < 4 ; j++){
            let fin = false;
            while(!fin){
                let randomImage = Math.floor(Math.random() *8);
                if(nbImagePosition[randomImage] < 2){
                    ligne.push(randomImage+1);
                    nbImagePosition[randomImage]++
                    fin = true;
                }
            }        
        }
        tab.push(ligne)
    }
    return tab;
}

