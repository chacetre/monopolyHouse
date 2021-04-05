export const initialsValuesAccount  : OwnerInformations = {
    firstname: "",
    lastname: "",
    address: {
        street : "",
        postalCode: "",
        city: ""
    },
    isSociety: false,
    id: 0
}

export type OwnerInformations = {
    firstname?: string,
    lastname?: string,
    address: {
        street: string,
        postalCode: string,
        city: string
    }
    isSociety : boolean,
    civility?: string,
    socialIdentity? : string,
    id: number
}

export type LoggedUser = {
    user: {
        uuid : string
    }
}