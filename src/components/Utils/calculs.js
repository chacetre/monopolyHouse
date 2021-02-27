export function calculateTotal(loyer){
    if (!loyer) {return 0}

    var numFixe = Number(loyer.fixe)
    var numCharges = Number(loyer.charges)

    return loyer.activeTVA ? ((numFixe + numCharges) * 1.20).toFixed(2) : ((numFixe + numCharges)).toFixed(2)
}

export const calculTVA = (loyer) => {
    var numFixe = Number(loyer.fixe)
    var numCharges = Number(loyer.charges)
    return ((numFixe + numCharges) * 0.20).toFixed(2)
}