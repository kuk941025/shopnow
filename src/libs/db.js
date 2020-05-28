import Dexie from "dexie";

const db = new Dexie("ShopNow");
db.version(1).stores({favorites: '&productId, title, category1, category2, category3' });

export default db;