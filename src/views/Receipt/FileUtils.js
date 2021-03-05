import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from "react";
import {civilityTranslation, lastDay} from "./ConstFile";
import {calculateTotal, calculTVA} from "../../components/Utils/calculs";

export const generateName = (accomodation, date) => {

    if (!accomodation) {return "undefined"}

    const month =  date[accomodation.id] ? date[accomodation.id].month :date.default.month
    const year =  date[accomodation.id] ? date[accomodation.id].year :date.default.year

    let name = ""
    try {
        name = accomodation.rental.firstname +
            "_" +
            accomodation.rental.lastname +
            "_" +
            month +
            "_" +
            year +
            ".pdf";
    } catch (Error){
        console.log("error", Error)
    }
    return name
}

function replaceText(textChange, accomodation, owner, date) {

    console.log("date", date)

    if (accomodation === undefined) return textChange
    let textTranslate = textChange
        .replaceAll("[rent.city]", accomodation.address.city.toUpperCase())
        .replaceAll("[rent.street]", accomodation.address.street.toUpperCase())
        .replaceAll("[rent.postalCode]", accomodation.address.postalCode.toUpperCase())
        .replaceAll("[date.lastDay]", lastDay[date.month])
        .replaceAll("[date.firstDay]", "1er")
        .replaceAll("[date.month]", date.month)
        .replaceAll("[date.year]", date.year)


    if (accomodation.rental.isParticulier === "true"){
        textTranslate
            .replaceAll("[rent.lastname]", accomodation.rental.lastname)
            .replaceAll("[rent.firstname]", accomodation.rental.firstname)
            .replaceAll("[rent.civility]", civilityTranslation[accomodation.rental.civility || ""])
    } else {
        textTranslate
            .replaceAll("[rent.lastname]", accomodation.rental.socialIdentity)
            .replaceAll("[rent.firstname]", "")
            .replaceAll("[rent.civility]", "")
    }

    if (owner.isSociety){
        textTranslate.replaceAll("[autres]", owner.socialIdentity)
    } else {
        textTranslate.replaceAll("[autres]", owner.lastname + " " + owner.firstname)
    }
    return textTranslate;
}

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 50
    },
    section: {
        fontSize: 14,
        marginBottom: 30
    },
    sectionBody: {
        fontSize: 14,
        marginBottom: 10
    },
    sectionDestinatire: {
        alignItems: "right",
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        fontSize: 14
    },
    destinataire: {
        width: "35vw"
    },
    sectionMontantLoyer: {
        flexDirection: 'row'
    },
    montantLoyer: {
        alignItems: "right",
        width: "50%"
    },
    sectionTextLoyer:{
        width: "50%"
    },
    sectionLoyer:{
        width: "75%",
        fontSize: 14,
        marginBottom: 30,
        marginTop : 20
    }

});


// Create Document Component
export function MyDocument (props) {
    const {owner, accomodation, date, textsTemplate ={}} = props

    return (accomodation !== undefined
    && textsTemplate !== undefined ? <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>{!owner.isSociety ? owner.lastname + " " + owner.firstname : owner.socialIdentity}</Text>
                <Text>{owner.address.street.toUpperCase()}</Text>
                <Text>{owner.address.postalCode.toUpperCase() + " " + owner.address.city.toUpperCase()}</Text>
            </View>
            <View style={styles.sectionDestinatire}>
                <View style={styles.destinataire}>
                    <Text>{accomodation.rental.isParticulier !== "false" ? accomodation.rental?.lastname + " " + accomodation.rental?.firstname : accomodation.rental?.socialIdentity}</Text>
                    <Text>{accomodation.address.street.toUpperCase()}</Text>
                    <Text>{accomodation.address.postalCode.toUpperCase() + " " + accomodation.address.city.toUpperCase()}</Text>
                </View>
            </View>
            {textsTemplate !== undefined  && textsTemplate.textStart !== undefined && textsTemplate.textStart !== "" &&
            <View style={styles.section}>
                <Text>{replaceText(textsTemplate.textStart,accomodation,owner,date)}</Text>
            </View>
            }
            <View style={styles.section}>
                <Text>{accomodation.rental.civility ? civilityTranslation[accomodation.rental.civility] : ""},</Text>
            </View>
            {textsTemplate.textBody &&
            <View style={styles.section}>
                <Text>{replaceText(textsTemplate.textBody,accomodation,owner,date)}</Text>
            </View>
            }
            <View style={styles.sectionLoyer}>
                <View style={styles.sectionMontantLoyer}>
                    <View style={styles.sectionTextLoyer}>
                        <Text>Loyer :</Text>
                    </View>
                    <View style={styles.montantLoyer}>
                        <Text>{accomodation.loyer.fixe}</Text>
                    </View>
                </View>
                <View style={styles.sectionMontantLoyer}>
                    <View style={styles.sectionTextLoyer}>
                        <Text>Provision sur charges :</Text>
                    </View>
                    <View style={styles.montantLoyer}>
                        <Text >{accomodation.loyer.charges}</Text>
                    </View>
                </View>
                {accomodation.loyer !== undefined && accomodation.loyer.activeTVA &&
                <View style={styles.sectionMontantLoyer}>
                    <View style={styles.sectionTextLoyer}>
                        <Text>TVA :</Text>
                    </View>
                    <View style={styles.montantLoyer}>
                        <Text>{calculTVA(accomodation.loyer)}</Text>
                    </View>
                </View>
                }
                <View style={styles.sectionMontantLoyer}>
                    <View style={styles.sectionTextLoyer}>
                        <Text/>
                    </View>
                    <View style={styles.montantLoyer}>
                        <Text>------------</Text>
                    </View>
                </View>
                <View style={styles.sectionMontantLoyer}>
                    <View style={styles.sectionTextLoyer}>
                        <Text>Total :</Text>
                    </View>
                    <View style={styles.montantLoyer}>
                        <Text >{calculateTotal(accomodation.loyer)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text>Veuillez agréer, {accomodation.rental.civility ? civilityTranslation[accomodation.rental.civility]  + ",": ""} l’expression de mes sentiments distingués.</Text>
            </View>
            {textsTemplate !== undefined  && textsTemplate.textEnd !== undefined && textsTemplate.textEnd !== "" &&
            <View style={styles.section}>
                <Text>{replaceText(textsTemplate.textEnd,accomodation,owner,date)}</Text>
            </View>
            }
        </Page>
    </Document> :  <Document>
        <Page size="A4"> <Text>Erreur</Text> </Page></Document>)
}
