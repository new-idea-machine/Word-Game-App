'use client';
import React, { ReactNode } from "react";
import { useAppSelector } from "./app/redux/store";

export default function App({ children } : { children: ReactNode }) {

  const darkTheme = useAppSelector(state => state.sessionReducer.value.theme.dark);

  return (
    <body className={darkTheme ? 'dark' : ''}>
      {children}
    </body>
  );
}