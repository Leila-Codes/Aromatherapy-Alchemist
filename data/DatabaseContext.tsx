import { useSQLiteContext } from "expo-sqlite";
import { createContext, PropsWithChildren, useContext } from "react";
import DatabaseService from "./database";


const DatabaseContext = createContext<DatabaseService | null>(null);

export const useDatabase = () => useContext(DatabaseContext);

const DatabaseContextProvider = ({ children }: PropsWithChildren) => {
    const database = useSQLiteContext();

    const service = new DatabaseService(database);

    return <DatabaseContext.Provider value={service}>
        {children}
    </DatabaseContext.Provider>
}

export default DatabaseContextProvider;