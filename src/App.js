import React from 'react';

import './App.css';
import 'rsuite/dist/styles/rsuite-default.min.css';
import {BrowserRouter, Route} from "react-router-dom";
import HomePage from "../src/pages/home/HomePage";
import AppointmentsPage from "./pages/appointment/AppointmentsPage";
import AppointmentPage from "./pages/appointment/AppointmentPage";
import ArticlesPage from "./pages/article/ArticlesPage";
import ArticlePage from "./pages/article/ArticlePage";
import DentistsPage from "./pages/dentist/DentistsPage";
import DentistPage from "./pages/dentist/DentistPage";
import CreatePage from "./pages/create/CreatePage";
import AccountPage from "./pages/account/AccountPage";
import RegistrationPage from "./pages/account/RegistrationPage";
import LoginPage from "./pages/account/LoginPage";
import ForgottenPasswordPage from "./pages/account/ForgottenPasswordPage";
import ChangePasswordPage from "./pages/account/ChangePasswordPage";
import RecordsPage from "./pages/record/RecordsPage";

function App() {
  return (
      <BrowserRouter>
        <Route path="/" exact>
          <HomePage/>
        </Route>

        <Route path="/appointments/:appointmentID">
          <AppointmentPage/>
        </Route>

        <Route path="/appointments">
          <AppointmentsPage/>
        </Route>

        <Route path="/articles">
          <ArticlesPage/>
        </Route>

        <Route path="/articles/:articleID">
          <ArticlePage/>
        </Route>

        <Route path="/dentists">
          <DentistsPage/>
        </Route>

        <Route path="/records">
          <RecordsPage/>
        </Route>

        <Route path="/dentists/:dentistID">
          <DentistPage/>
        </Route>

        <Route path="/new/appointment">
          <CreatePage/>
        </Route>

        <Route path="/account">
          <AccountPage/>
        </Route>

        <Route path="/register">
          <RegistrationPage/>
        </Route>

        <Route path="/login">
          <LoginPage/>
        </Route>

        <Route path="/forgotten-password">
          <ForgottenPasswordPage/>
        </Route>

        <Route path="/change-password">
          <ChangePasswordPage/>
        </Route>

      </BrowserRouter>
  );
}

export default App;
