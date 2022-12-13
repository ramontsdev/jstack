import { Route, Switch } from 'react-router-dom';

import { Container as EditContact } from './pages/edit-contact';
import Home from './pages/home';
import NewContact from './pages/new-contact';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewContact} />
      <Route exact path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
