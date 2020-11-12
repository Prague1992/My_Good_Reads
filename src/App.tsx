import React from "react";
import "./styles/App.scss";
import BookSearch from "./book-search/BookSearch";

function App() {
  return (
    <div>
      <header className="header">
        <div className="header--content">
          <h1>My Good Reads</h1>
        </div>
      </header>
      <div>
        <BookSearch />
      </div>
    </div>
  );
}

export default App;
