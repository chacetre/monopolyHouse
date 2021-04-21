import {CustomeRadioButtonValue} from "../components/Utils/CustomRadioButton";

export type Loyer = {
    fixe : number,
    charges: number,
    activeTVA: boolean,
    indiceInsee: "T1" | "T2" | "T3" | "T4" | "",
    recurrence? : number,
    startDate: string,
}

export type Estate = {
    id: string | number | undefined
    loyer : Loyer,
    isCommercial: boolean,
    rental: {
        isParticulier : boolean,
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
    id: undefined,
    loyer : {
        fixe : 0,
        charges: 0,
        activeTVA: false,
        indiceInsee: "",
        startDate: "2000-01-01",
    },
    rental: {
        isParticulier : true,
        lastname: "",
        firstname: "",
        civility: "mr"
    },
    isCommercial: false,
    address: {
        city : "",
        street: "",
        postalCode: "",
        otherInformations : ""
    },
}

export const listRadioButtonStep1 : CustomeRadioButtonValue[] = [
    {label : "Habitation",
        key: false},
    {label : "Local Commercial",
        key: true}
]

export const listRadioButtonStep2 : CustomeRadioButtonValue[] = [
    {label : "Particulier",
        key: true},
    {label : "Entreprise",
        key: false}
]

export const listCivility : CustomeRadioButtonValue[] = [
    {label : "M.",
        key: "mr"},
    {label : "Mme",
        key: "mme"}
]