import React from 'react';
import Nav from "@components/TopBar";
import Footer from "@components/Footer";
import ContextProvider from "../util/context";

export const metadata = {
  title: 'Governify',
  description: 'This is the web for Governify project',
}

export default function RootLayout({ children: content }) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>
        <ContextProvider>
          <Nav/>
          {content}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  )
}
