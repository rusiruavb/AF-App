import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

class CreateVehicle extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
    this.state = {
      code: '',
      model: '',
      type: '',
      name: '',
      categories: [],
      options: [],
      selectedcategories: []
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_API}/category/`)
    .then(data => {
      this.setState({ categories: data.data }, () => {
        if (this.state.categories.length > 0) {
          let data = [];
          this.state.categories.map(item => {
            let category = {
              value: item._id, 
              label: `${item.name} | Rs.${item.price}.00 PER HOUR`
            }
            data.push(category);
          });
          this.setState({ options: data });
        }
      })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCategorySelect(e) {
    this.setState({ selectedcategories: e ? e.map(item => item.value) : [] })
  }

  onFormSubmit(e) {
    e.preventDefault();
    let vehicle = {
      code: this.state.code,
      model: this.state.model,
      type: this.state.type,
      name: this.state.name,
      categories: this.state.selectedcategories
    }
    axios.post(`${process.env.REACT_APP_BACKEND_API}/vehicle/create`, vehicle)
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
        <h2>Create Vehicle</h2>
        <form onSubmit={this.onFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Code</label>
            <input type="text" className="form-control" name="code" onChange={this.onChange} value={this.state.code} />
          </div>
          <div className="mb-3">
            <label className="form-label">Model</label>
            <input type="text" className="form-control" name="model" onChange={this.onChange} value={this.state.model}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <input type="text" className="form-control" name="type" onChange={this.onChange} value={this.state.type}  />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={this.onChange} value={this.state.name} />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <Select 
              options={this.state.options}
              isMulti
              className="basic-multi-select"
              onChange={this.onCategorySelect}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateVehicle;