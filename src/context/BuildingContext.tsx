import React, { createContext, useContext, useState } from 'react';

type BuildingType = 'Office' | 'Mall';

interface BuildingContextType {
    selectedBuilding: BuildingType;
    setSelectedBuilding: (building: BuildingType) => void;
}

const BuildingContext = createContext<BuildingContextType | undefined>(undefined);

export function BuildingProvider({ children }: { children: React.ReactNode }) {
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingType>('Office');

    return (
        <BuildingContext.Provider value={{ selectedBuilding, setSelectedBuilding }}>
            {children}
        </BuildingContext.Provider>
    );
}

export function useBuilding() {
    const context = useContext(BuildingContext);
    if (undefined === context) {
        throw new Error('useBuilding must be used within a BuildingProvider');
    }
    return context;
}