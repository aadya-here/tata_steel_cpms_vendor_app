import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectContextProps {
    projectId: string | null;
    setProjectId: (id: string | null) => void;
    // You can add more project-related state here if needed
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projectId, setProjectId] = useState<string | null>(null);

    return (
        <ProjectContext.Provider value={{ projectId, setProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = (): ProjectContextProps => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};