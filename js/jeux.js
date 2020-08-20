// animation de la fenêtre de fin du quiz

 class Jeux {

	 canvas;
	 users;
	/**
	 * Classe permettant de créer un jeux 
	 * et, d'appeler une fonction de l'application passée en paramètre
	 * @param {String} nom - position du mot sur l'axe des X
	 * @param {Number} lignes - position du mot sur l'axe des Y
	 * @param {Number} colonnes - largeur de la fenêtre
	 */

	constructor(nom, lignes, colonnes) {
		//Récupérer les valeurs passées en paramètre			
		this.nom = nom;
		this.lignes = lignes;
		this.colonnes = colonnes;
		this.WH = 50;
		this.canvasW = this.colonnes * this.WH;
		this.canvasH = this.lignes * this.WH
		this.users = JSON.parse(localStorage.getItem("userscanvas") || "[]");

		//Créer le jeux
		this.creerCanvas();
		this.creeCarree();
		this.startgame();
	}

	/**
	 * Méthode pour créer et afficher les instances de la classe JEUX
	 */
	creerCanvas() {
		//Créer une balise <canvas>
		var canvas = document.createElement("canvas");
		this.canvas = canvas;
        document.body.appendChild(canvas);
		//Appliquer les éléments de style
		canvas.setAttribute("width",this.canvasW + "px") ;
		canvas.setAttribute("height",this.canvasH + "px");
		canvas.setAttribute("id","monCanvas");

		canvas.style ="border:3px solid black";

		var ctx = canvas.getContext("2d");
		for (let i = 0; i < this.canvasW; i=i+this.WH) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.canvasH);
			ctx.stroke();
				}
		
		for (let i = 0; i < this.canvasH; i=i+this.WH) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(this.canvasW, i);
			ctx.stroke();
				}
	}

	creeCarree(){
		var tab =[];
		for (let i = 0; i < this.canvasW; i=i+this.WH) {
			for (let j = 0; j < this.canvasH; j=j+this.WH) {
				var uncaree = new Rectangle(i,j,this.WH);
				
				tab.push(uncaree);	
			}
		}
		var Jocker = tab[Math.floor(Math.random() * tab.length)];
		Jocker.jocker = true;

		for (let i = 0; i < tab.length; i++) {
			var maxX = Math.abs(tab[i].x - Jocker.x);
			var maxY = Math.abs(tab[i].y - Jocker.y);
			var max = Math.max(maxX/this.WH, maxY/this.WH);
			tab[i].Dist = max;
		}
		this.tab = tab;
	}
	startgame(){
		var canvas = this.canvas
		var lignes = this.lignes;
		var colonnes =this.colonnes ;
		var tab = this.tab
		var WH = this.WH
		var users = this.users
		var nom = this.nom;
		var tabClicks = {};
		var timer = document.getElementById("timer");
		var miliseconds = 0;
		
		var nvJeux = document.getElementById("nvJeux");
		form1.style.display = "none";
		nvJeux.style.display = "inline-block";
		
		
		nvJeux.addEventListener("click",function(){
			location.reload();
			
		});

        var tester = setInterval(function(){
                miliseconds = miliseconds + 1
                 timer.innerHTML = "Temps : " + miliseconds.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,') + " s";
                 }, 10);


		canvas.addEventListener("click",clickCanvas);

	function clickCanvas(evt){
		function getMousePos(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		}
		var position = getMousePos(canvas, evt)
		
 
		var check = tab.filter(function(carreau) {
		return 	position.x > carreau.x &&
				position.x < (carreau.x+WH) &&
				position.y > carreau.y && 
					position.y < (carreau.y+WH);
		});
		check[0].drawRectangle();
		if (check[0].jocker) {
			clearInterval(tester);
			tabClicks[check[0].x + "-" +check[0].y] = 1;
			this.nbrClicks = Object.keys(tabClicks).length;
			canvas.removeEventListener('click', clickCanvas, false);
			var user = {"nom" : nom, "Clicks" : this.nbrClicks,"temps" : miliseconds/100, "Grille" : lignes+"x"+colonnes};
			users.push(user);
			localStorage.setItem("userscanvas", JSON.stringify(users));
		}
		
			
		tabClicks[check[0].x + "-" +check[0].y] = 1;
		this.nbrClicks = Object.keys(tabClicks).length;
		var clicksDiv = document.getElementById("clicks");
		clicksDiv.innerHTML = "Clics : "+this.nbrClicks;

	}
}
} //Fin classe 




		