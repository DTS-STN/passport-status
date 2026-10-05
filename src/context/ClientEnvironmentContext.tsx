import { createContext, useContext } from 'react';

export interface ClientEnvironment {
  ADOBE_ANALYTICS_SCRIPT_SRC?: string;
  APP_BASE_URI: string;
  ENVIRONMENT: string;
  LOGGING_LEVEL?: string;
  BUILD_DATE?: string;
}

const ClientEnvironmentContext = createContext<ClientEnvironment | null>(null);

export function ClientEnvironmentProvider({ children, env }: { children: React.ReactNode; env: ClientEnvironment }) {
  return <ClientEnvironmentContext.Provider value={env}>{children}</ClientEnvironmentContext.Provider>;
}

// Custom hook for clean consumption in components
export function useClientEnvironment() {
  const context = useContext(ClientEnvironmentContext);
  if (!context) {
    throw new Error('useClientEnvironment must be used within a ClientEnvironmentProvider');
  }
  return context;
}
