import {Loyer} from "../../constantes/ConstEstate";

export function calculateTotal(loyer : Loyer){
    if (!loyer) {return 0}

    var numFixe : number = Number(loyer.fixe)
    var numCharges : number = Number(loyer.charges)

    return loyer.activeTVA ? ((numFixe * 1.20)+ numCharges).toFixed(2) : ((numFixe + numCharges)).toFixed(2)
}

export const calculTVA = (loyer : Loyer) => {
    var numFixe : number = Number(loyer.fixe)
    var numCharges : number = Number(loyer.charges)
    return ((numFixe) * 0.20).toFixed(2)
}