class Rectangle {
	/**
	 * Classe permettant de créer un jeux 
	 * et, d'appeler une fonction de l'application passée en paramètre
	 * @param {number} x - position du mot sur l'axe des X
	 * @param {number} y
	 * @param {number} h - position du mot sur l'axe des X
	 * @param {boolean} jocker - position du mot sur l'axe des Y
	 * @param {Number} Dist - largeur de la fenêtre
	 */

   constructor(x, y,h, jocker = false) {
	   //Récupérer les valeurs passées en paramètre			
	   this.x = x;
	   this.y = y;
	   this.h = h;
	   this.jocker = jocker;
}

	drawRectangle(){
		var canvas = document.getElementById("monCanvas");
		var ctx = canvas.getContext("2d");
		if (this.jocker) {
			var color = "green"
			var text = "👑"
		}else{
			var color = "red"
			var text = this.Dist
		}
		ctx.beginPath();
		ctx.font = '28px serif';
		ctx.textAlign ="center";
		ctx.rect(this.x, this.y,this.h,this.h);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.fillText(text, this.x+25, this.y+35);
	}
 }
 

