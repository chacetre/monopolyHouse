import Firebase from "firebase";

export const saveNewIndexAPI = (value, name) => {
  Firebase.database()
    .ref("indexes/" + name)
    .set({
      value,
    });
};

export const updateIndexesParticularAPI = (value) => {
  Firebase.database()
    .ref("indexes/particular")
    .set(value);
  console.log("DATA SAVED");
};

export const updateIndexesSocietyAPI = (value) => {
  Firebase.database()
    .ref("indexes/society")
    .set(value);
  console.log("DATA SAVED");
};

export const getIndexesParticularAPI = (callback) => {
  let ref = Firebase.database().ref("/indexes/particular");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const getIndexesSocietyAPI = (callback) => {
  let ref = Firebase.database().ref("/indexes/society");
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

export const createTemplateAPI = (value) => {
  const timestamp = Date.now();
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  Firebase.database()
    .ref(existingUser + "/templates/" + timestamp)
    .set({...value, id : timestamp});
};

export const getTemplatesAPI = (callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser + "/templates");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const getTemplatesDefaultAPI = (callback) => {
  let ref = Firebase.database().ref("/templatesDefault");
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const getTemplateByIdAPI = (id, callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser + "/templates/" + id);
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const getTemplateByTypeAPI = (type, isParticular, callback) => {
  const existingUser = JSON.parse(localStorage.getItem("logged_user"));
  let ref = Firebase.database().ref(existingUser + "/templates").orderByChild("type").equalTo(type);
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
