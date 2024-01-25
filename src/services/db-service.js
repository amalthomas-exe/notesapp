import {openDatabase,enablePromise,SQLiteDatabase} from 'react-native-sqlite-storage';

export const getDBConnection = ()=>{
    console.log('getDBConnection');
    return openDatabase({
        name: 'notes.db',
        location:'default'
    });
}

export const sayHello = ()=>{
    console.log('sayHello');
}

export const createTable = async (db,tableName)=>{
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        category TEXT,
        status TEXT DEFAULT 'saved',
        created_at DATETIME,
        updated_at DATETIME,
        isLiked INTEGER DEFAULT 0,
        folder_id INTEGER DEFAULT NULL
    )`;
    await db.executeSql(query);
    console.log('createTable');
}

export const getNotes = async (db,tableName)=>{
    console.log('getNotes');
    try{
        const notes = [];
        const results = await db.executeSql(`
        SELECT * FROM ${tableName} order by created_at desc`);
        results.forEach(result=>{
            for(let i = 0;i<result.rows.length;i++){
                notes.push(result.rows.item(i));
            }
        });
        console.log('notes',notes);
        return notes;
    }catch(e){
        console.log(e);
    }
}

export const getLikedNotes = async (db,tableName)=>{
    console.log('getLikedNotes');
    try{
        const notes = [];
        const results = await db.executeSql(`
        SELECT * FROM ${tableName} WHERE isLiked=1 order by created_at desc`);
        results.forEach(result=>{
            for(let i = 0;i<result.rows.length;i++){
                notes.push(result.rows.item(i));
            }
        });
        return notes;
    }catch(e){
        console.log(e);
    }
}

export const addNote = async (db,tableName,note)=>{
    console.log("Incoming note",note )
    console.log('addNote');
    try{
        const query = `INSERT INTO ${tableName}(title,content,category,created_at,updated_at) VALUES(?,?,?,?,?)`;
        const results = await db.executeSql(query,[note.title,note.content,note.category,note.created_at,note.updated_at]);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const addLikedNote = async (db,tableName,id)=>{
    console.log('addLikedNote');
    try{
        const query = `UPDATE ${tableName} set isLiked=1 WHERE id=?`;
        const results = await db.executeSql(query,[id]);
        return results;
    }catch(e){
        console.log(e);
    }

}

export const deleteLikedNote = async (db,tableName,id)=>{
    console.log('deleteLikedNote');
    try{
        const query = `UPDATE ${tableName} set isLiked=0 WHERE id=?`;
        const results = await db.executeSql(query,[id]);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const editNote = async (db,tableName,note)=>{
    console.log('editNote');
    try{
        const query = `UPDATE ${tableName} SET title=?,content=?,category=?,updated_at=? WHERE id=?`;
        const results = await db.executeSql(query,[note.title,note.content,note.category,note.updated_at,note.id]);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const deleteNote = async (db,tableName,id)=>{
    console.log('deleteNote');
    try{
        const query = `DELETE FROM ${tableName} WHERE id=?`;
        const results = await db.executeSql(query,[id]);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const deleteTable = async (db,tableName)=>{
    console.log('deleteTable');
    try{
        const query = `DROP TABLE ${tableName}`;
        const results = await db.executeSql(query);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const createFolderTable = async (db,tableName)=>{
    console.log('createFolderTable');
    try{
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )`;
        const results = await db.executeSql(query);
        return results;
    }catch(e){
        console.log(e);
    }
}

export const getFolders = async (db,tableName)=>{
    console.log('getFolders');
    try{
        const folders = [];
        const results = await db.executeSql(`
        SELECT * FROM ${tableName}`);
        results.forEach(result=>{
            for(let i = 0;i<result.rows.length;i++){
                folders.push(result.rows.item(i));
            }
        });
        return folders;
    }catch(e){
        console.log(e);
    }
}

export const addFolder = async (db,tableName,folder)=>{
    console.log('addFolder');
    try{
        const query = `INSERT INTO ${tableName}(name) VALUES(?)`;
        const results = await db.executeSql(query,[folder.name]);
        return results;
    }catch(e){
        console.log(e);
    }
}

enablePromise(true);