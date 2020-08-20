window.addEventListener("load", function(){ 
			
    var statistiques = JSON.parse(localStorage.getItem("userscanvas"));

    if (statistiques) {
        
        var tabTemp=[];
        var tabFinale=[];

        for (let i = 0; i < statistiques.length; i++) {
            if (!tabTemp.includes(statistiques[i].Grille)) {
                tabTemp.push(statistiques[i].Grille);
            }
        }
        for (let i = 0; i < tabTemp.length; i++) {
        
            var tabFiltrer = statistiques.filter(function(statistiques) {
                return statistiques.Grille == tabTemp[i];
            });

            var score = tabFiltrer.reduce((a, b) => (a.temps < b.temps) ? a : b)
            var totalClicks =  tabFiltrer.reduce(function (a, b) { return {Clicks: a.Clicks + b.Clicks};})
            var moyenClicks = totalClicks.Clicks/tabFiltrer.length;

            var objTemp = {"Grille":tabFiltrer[0].Grille , "nbrJeux" : tabFiltrer.length, "nbrClickMoyen" : moyenClicks,"ScoreTemps":score.temps, "ScoreClicks":score.Clicks }
            tabFinale.push(objTemp);

        }
        tabFinale.sort();
 
        var resultat = document.getElementById("result");

        let listeHTML = "<table id='tabstatistique'>";
            listeHTML += "<tr><th rowspan='2'>Grille</th><th rowspan='2'>Nombre de Jeux</th><th rowspan='2'>Moyen de coups</th><th colspan='2'>Records</th></tr><tr><th>Temps record (s)</th><th>Coups record</th></tr>";
            for (let i = 0; i < tabFinale.length; i++) {
                let j = tabFinale[i]; 
                listeHTML += `<tr><td>${j.Grille}</td><td>${j.nbrJeux}</td><td>${j.nbrClickMoyen.toFixed(2)}</td><td>${j.ScoreTemps.toFixed(2)}</td><td>${j.ScoreClicks.toFixed(2)}</td>`;	
            }
            listeHTML += "</table>";
            resultat.innerHTML = listeHTML;
        
    }else{
        var resultat = document.getElementById("result");
        resultat.innerHTML = "<h2>Pas de Statistiques pour le mement.<h2>";
    }

});