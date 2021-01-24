import Firebase from "firebase";

export const saveNewIndexAPI = (value, name) => {
  Firebase.database()
    .ref("indexes/" + name)
    .set({
      value,
    });
};

export const updateIndexesAPI = (value) => {
  Firebase.database()
    .ref("indexes/")
    .set(value);
  console.log("DATA SAVED");
};

export const getIndexesAPI = (callback) => {
  let ref = Firebase.database().ref("/indexes");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const updateTemplateAPI = (id, value) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database()
    .ref(existingUser + "/templates/" + id)
    .set(value);
};

export const getTemplatesAPI = (callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser + "/templates");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const getTemplateByIdAPI = (id, callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  console.log(id);
  let ref = Firebase.database().ref(existingUser + "/templates/" + id);
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
