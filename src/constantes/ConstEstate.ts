export type Loyer = {
    fixe : number,
    charges: number,
    activeTVA: boolean,
    indiceInsee: "T1" | "T2" | "T3" | "T4" | ""
}

export type Estate = {
    loyer : Loyer,
    isCommercial: boolean,
    rental: {
        isParticulier : boolean,
        startDate: string,
        socialIdentity?: string,
        lastname? : string,
        firstname? : string,
        civility? : string
    },
    address: {
        city : string,
        street: string,
        postalCode: string,
        otherInformations : string
    },
}

export const initialValueEstate : Estate = {
    loyer : {
        fixe : 0,
        charges: 0,
        activeTVA: false,
        indiceInsee: ""
    },
    rental: {
        isParticulier : true,
        startDate: "01/01/1970"
    },
    isCommercial: false,
    address: {
        city : "",
        street: "",
        postalCode: "",
        otherInformations : ""
    },
}