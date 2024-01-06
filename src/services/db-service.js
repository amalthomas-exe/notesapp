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
    console.log('createTable');
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        category TEXT,
        status TEXT DEFAULT 'saved',
        created_at DATETIME,
        updated_at DATETIME
    )`;

    await db.executeSql(query);
}

export const getNotes = async (db,tableName)=>{
    console.log('getNotes');
    try{
        const notes = [];
        const results = await db.executeSql(`
        SELECT * FROM ${tableName}`);
        console.log(results);
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

enablePromise(true);