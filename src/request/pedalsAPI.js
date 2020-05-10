import Firebase from 'firebase';

export const saveNewPedalsInDataBase = (index, pedalInfo) => {
  Firebase.database()
    .ref(`/pedals/${index}`)
    .set(pedalInfo);
  console.log('DATA SAVED');
};

export const getPedalsDataBase = (callback) => {
  let ref = Firebase.database().ref('/pedals');
  ref.on('value', snapshot => {
    const data = snapshot.val();
    console.log('stock API', data);
    callback(data);
  });
};

export const addPedalsMadeDataBase = (index, nombreMade) => {
  Firebase.database()
    .ref(`/pedals/${index}/totalMade`)
    .set(nombreMade);
  console.log('DATA SAVED');
};
