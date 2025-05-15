import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
//LAYOUTS
import DefaultLayout from "./layouts/defaultLayout";
//PAGES
import HomePage from "./pages/HomePage";
import FormTasksPage from "./pages/FormTasksPage";
import Tasks from "./pages/Tasks";
import Note from "./pages/Note";
import FormModifyTask from "./pages/FormModifyTask";
import FormNotesPage from "./pages/FormNotesPage";
// import NotFound from "./pages/NotFound";

import WelcomePage from "./pages/WelcomePage";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" Component={WelcomePage} />

          {/*USER ROUTE */}
          <Route Component={DefaultLayout}>
            <Route path="/home" Component={HomePage} />
            <Route path="/newtasks" Component={FormTasksPage} />
            <Route path="/modifytask/:id" Component={FormModifyTask} />
            <Route path="/newnote" Component={FormNotesPage} />
            <Route path="/tasks" Component={Tasks} />
            <Route path="/note" Component={Note} />
            {/* <Route path="*" Component={NotFound} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
