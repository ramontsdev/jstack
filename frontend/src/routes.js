import { Switch, Route } from 'react-router-dom';

import Home from './pages/home';
import NewContact from './pages/new-contact';
import EditContact from './pages/edit-contact';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new" component={NewContact} />
      <Route exact path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
