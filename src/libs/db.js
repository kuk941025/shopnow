import Dexie from "dexie";

const db = new Dexie("ShopNow");
db.version(1).stores({favorites: '&productId, title' });

export default db;