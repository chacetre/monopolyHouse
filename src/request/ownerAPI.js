import Firebase from "firebase";



export const saveNewComponentInDataBase = (owner, id) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database().ref(existingUser + "/owners/" + id).set({
    id: id,
    civility: null,
    lastname: null,
    firstname: null,
    isSociety: true,
    socialIdentity: owner.socialIdentity,
    address: {
      postalCode: owner.postalCode,
      city: owner.city,
      street: owner.street,
    },
    isOwner: true,
  })
};

export const deleteValueInDataBase = (type, soustype, index) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${type}/${soustype}/${index}`)
    .set(null);
  console.log("DATA SAVED");
};


export const updateOwner = (owner) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database()
    .ref(`${existingUser}/owners/${owner.id}`)
    .set(owner);
  console.log("DATA SAVED");
};

export const getOwnerDataBase = (callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser + "/owners");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
