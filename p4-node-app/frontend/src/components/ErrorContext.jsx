import { createContext, useContext } from 'react';

const ErrorContext = createContext();

const useErrorContext = () => {
  return useContext(ErrorContext);
};

const ErrorProvider = ({ children }) => {
  const predefinedErrors = {
    inputMissingError: 'Please check that all required fields are filled before proceeding.',
    selectionMissingError: 'Please check all necessary selections are made before proceeding.',
};

  return (
    <ErrorContext.Provider value={predefinedErrors}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContext, ErrorProvider, useErrorContext };