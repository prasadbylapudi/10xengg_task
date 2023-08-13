import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchAppBar from './components/Navbar';
import BookList from './components/Booklist';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SearchAppBar setSearchQuery={setSearchQuery} />
      <BookList searchQuery={searchQuery} />
    </ThemeProvider>
  );
}

export default App;
