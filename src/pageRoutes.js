import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateCategory from './components/category/createCategory';
import NavBar from './components/navbar/navBar';
import CreateVehicle from './components/vehicles/createVehicle';
import CategoryPage from './pages/categories/category';

class PageRoutes extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/vehicle/create' component={CreateVehicle} />
          <Route path='/category/create' component={CreateCategory} />
          <Route path='/' component={CategoryPage} />
        </Switch>
      </Router>
    );
  }
}

export default PageRoutes;