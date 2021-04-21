import Firebase from "firebase";

export const saveNewAccommodation = (accomodation, id, ownerId) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  console.log("event",accomodation.loyer )
  Firebase.database()
    .ref(existingUser + "/accomodations/" + id)
    .set({
      id: id,
      loyer: accomodation.loyer,
      rental: accomodation.rental,
      address: accomodation.address,
      isCommercial: accomodation.isCommercial,
      owner: ownerId,
    });
};

export const deleteAccomodation = (accomodationId) => {
    const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database()
    .ref(`/${existingUser}/accomodations/${accomodationId}`)
    .set(null);
  console.log("DATA DELETED");
};

export const updateAccomodation = (value) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database()
    .ref(`/${existingUser}/accomodations/${value.id}`)
    .set(value);
  console.log("DATA SAVED");
};

export const getAccomodationByOwner = (ownerID, callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser +"/accomodations");
  ref
    .orderByChild("owner")
    .equalTo(ownerID)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
};
