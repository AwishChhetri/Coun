import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { Dash } from './pages/Dash.jsx';
import { Questions } from './pages/Questions.jsx';
import { IntakeForm } from './pages/IntakeForm.jsx';
import { Appointment } from './pages/Appointment.jsx';
import { Assessment } from './components/Assessment.jsx';
import { Settings } from './components/Settings.jsx';
import { TermsAndConditions } from './pages/TermsAndConditions.jsx';
import {RefundPolicy} from "./pages/Refund.jsx";
import { PrivacyPolicy } from './pages/PrivacyPolicy.jsx';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        (!userId || !token) ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const App = () => {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/terms" component={TermsAndConditions} exact />
      <Route path="/privacy" component={PrivacyPolicy} exact />
      <Route path="/refund" component={RefundPolicy} exact />
      <PrivateRoute path="/dash" component={Dash} isPrivate={false} />
      <PrivateRoute path="/personality-test" component={Questions} isPrivate={false} />
      <Route path="/intake-form" component={IntakeForm}  />
      <PrivateRoute path="/appointment" component={Appointment} />
      <PrivateRoute path="/assessment" component={Assessment} />
      <PrivateRoute path="/settings" component={Settings} isPrivate={true} />
    </div>
  );
};

export default App;
