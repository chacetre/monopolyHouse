export const schema = {
    isCommercial: {
        presence: { allowEmpty: false, message: "is required" },
    }
};

export const schemaAddress = {
    postalCode: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 5,
            minimum: 5,
        },
    },
    street: {
        presence: { allowEmpty: false, message: "is required" },
    },
    city: {
        presence: { allowEmpty: false, message: "is required" },
    },

};

export const schemaLoyer = {
    fixe: {
        presence: { allowEmpty: false, message: "is required" },
    },
    charges: {
        presence: { allowEmpty: false, message: "is required" },
    },
    indiceInsee: {
        presence: { allowEmpty: false, message: "is required" },
    }
};

export const schemaRental = {
    isParticulier: {
        presence: { allowEmpty: false, message: "is required" },
    },
    startDate: {
        presence: { allowEmpty: false, message: "is required" },
    }
};

export const steps = ['Informations Logement', 'Informations Locataire', 'Loyer']