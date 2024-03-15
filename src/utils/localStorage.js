export function saveToLocalStorage(state) {
  try {
    // Dapatkan data dari local storage
    const existingData = loadFromLocalStorage();
    const newState = { ...state };

    if (existingData) {
      // Salin ID terakhir yang digunakan
      newState.lastUsedId = existingData.lastUsedId;
    }

    const serialisedState = JSON.stringify(newState);
    localStorage.setItem("reduxState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("reduxState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
