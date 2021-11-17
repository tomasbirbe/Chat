import React, { Dispatch, SetStateAction } from 'react';

interface auth {
  token: string;
  isLogged: boolean;
}

const authContext = React.createContext<auth | null>(null);

export default authContext;
