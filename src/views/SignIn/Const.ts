export const schema = {
    email: {
        presence: { allowEmpty: false, message: "is required" },
        email: true,
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
            maximum: 128,
        },
    },
};

export type FormStaLogin = {
    isValid: boolean,
    values: {
        email: string,
        password: string
    },
    touched: any,
    errors: any,
}

export const initialValuesSignIn : FormStaLogin = {
    isValid: false,
    values: {
        email: "",
        password: ""
    },
    touched: {},
    errors: {
        email : [],
        password: []
    },
}

export type ThemeData = {

    palette : {
        background : any
        white : string
    }

}
