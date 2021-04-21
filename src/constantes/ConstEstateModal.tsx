export const schema = {
    isCommercial: {
        presence: {allowEmpty: false, message: "is required"},
    }
};

export const schemaAddress = {
    postalCode: {
        presence: {allowEmpty: false, message: "is required"},
        length: {
            maximum: 5,
            minimum: 5,
        },
    },
    street: {
        presence: {allowEmpty: false, message: "is required"},
    },
    city: {
        presence: {allowEmpty: false, message: "is required"},
    },

};

export const schemaLoyer = {
    fixe: {
        presence: {allowEmpty: false, message: "is required"},
    },
    charges: {
        presence: {allowEmpty: false, message: "is required"},
    },
    indiceInsee: {
        presence: {allowEmpty: false, message: "is required"},
    }
};

export const schemaRental = {
    isParticulier: {
        presence: {allowEmpty: false, message: "is required"},
    }
};

export const steps = ['Informations Logement', 'Informations Locataire', 'Informations Loyer']

export const recurrenceLoyer = [
    {
        value: 1,
        label: "Tous les mois"
    },
    {
        value: 2,
        label: "Tous les 2 mois"
    },
    {
        value: 3,
        label: "Tous les 3 mois"
    }
    , {
        value: 4,
        label: "Tous les 4 mois"
    }, {
        value: 5,
        label: "Tous les 5 mois"
    }, {
        value: 6,
        label: "Tous les 6 mois"
    }, {
        value: 12,
        label: "Tous les ans"
    }
]