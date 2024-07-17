import React, { createContext, useContext, useState, useCallback } from "react";

const RefresherContext = createContext();

export const useTeacherRefresher = () => {
    return useContext(RefresherContext);
};

export const TeacherRefresherProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = useCallback(() => {
        setRefreshKey((prevKey) => prevKey + 1);
    }, []);

    return (
        <RefresherContext.Provider value={{ refreshKey, refresh }}>
            {children}
        </RefresherContext.Provider>
    );
};
