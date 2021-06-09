import React, { Component } from 'react';
import axios from 'axios';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      categoryname: '',
      categoryprice: 0
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let category = {
      name: this.state.categoryname,
      price: this.state.categoryprice
    }
    axios.post(`${process.env.REACT_APP_BACKEND_API}/category/create`, category)
    .then((data) => {
      alert('data successfully inserted')
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Create Category</h2>
        <form onSubmit={this.onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="categoryname" onChange={this.onChange} value={this.state.categoryname} />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name="categoryprice" onChange={this.onChange} value={this.state.categoryprice} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateCategory;