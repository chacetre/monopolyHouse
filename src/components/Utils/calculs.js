export function revisionLoyer(){

    console.log('current year', currentYear)
    var numFixe = Number(currentAccommo.loyer.fixe);

    const tauxAnneeCurrent = 130.52
    const tauxAnneePrevious = 130.26

    const newFixe = (numFixe * tauxAnneeCurrent) / tauxAnneePrevious

    console.log("New taux", newFixe.toFixed(2))

    currentAccommo.loyer.fixe = newFixe.toFixed(2)
    //updateAccomodation(currentAccommo);
  }