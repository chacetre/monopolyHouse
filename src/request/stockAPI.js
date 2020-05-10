import Firebase from 'firebase';

export const saveStockSousTypeInDataBase = (type, soustype, index, stock) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${type}/${soustype}/${index}/stock`)
    .set(stock);
  console.log('DATA SAVED');
};

export const saveNewTypeInDataBase = (type, value, indexTypeAvailable) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${type}`)
    .set({ [type]: [value] });

  Firebase.database()
    .ref(`/stock/componentsStock/${type}/typeAvailable/0`)
    .set(type);

  Firebase.database()
    .ref(`/stock/componentsAvailable/${indexTypeAvailable}`)
    .set(type);
  console.log('DATA SAVED');
};

export const saveNewValueInDataBase = (type, soustype, value, index) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${type}/${soustype}/${index}`)
    .set(value);
  console.log('DATA SAVED');
};

export const saveNewSousTypeInDataBase = (type, soustype, value, indexTypeAvailable) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${type}/typeAvailable/${indexTypeAvailable}`)
    .set(soustype);
  saveNewValueInDataBase(type, soustype, value, 0);

  console.log('DATA SAVED');
};

export const updateStockAfterAddPedals = (path, value) => {
  Firebase.database()
    .ref(`/stock/componentsStock/${path}/stock`)
    .set(value);
  console.log('DATA SAVED');
};

export const getStockDataBase = callback => {
  let ref = Firebase.database().ref('/stock');
  ref.on('value', snapshot => {
    const data = snapshot.val();
    console.log('stock API', data);
    callback(data);
  });
};
