import {Loyer} from "../../constantes/LoyerC";

export function calculateTotal(loyer : Loyer){
    if (!loyer) {return 0}

    var numFixe : number = Number(loyer.fixe)
    var numCharges : number = Number(loyer.charges)

    return loyer.activeTVA ? ((numFixe + numCharges) * 1.20).toFixed(2) : ((numFixe + numCharges)).toFixed(2)
}

export const calculTVA = (loyer : Loyer) => {
    var numFixe : number = Number(loyer.fixe)
    var numCharges : number = Number(loyer.charges)
    return ((numFixe + numCharges) * 0.20).toFixed(2)
}