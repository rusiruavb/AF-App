import React, { Component } from 'react';
import axios from 'axios';

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.onClickChange = this.onClickChange.bind(this);
    this.state = {
      categories: [],
      isExpandClick: false
    }
  }

  onClickChange(e) {
    this.setState({ isExpandClick: !this.state.isExpandClick });
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_API}/category/`)
    .then(data => {
      this.setState({ categories: data.data })
    })
    .catch(error => {
      alert(error.message);
    })
  }

  render() {
    return (
      <div className="container">
        {this.state.categories.length > 0 ?
          <div className="mt-3">
            <button className="btn btn-info btn-sm mt-3 mb-3" onClick={this.onClickChange}>View vehicles</button>
            {this.state.categories.map((item, index) => (
              <div key={index} className="card p-3 mb-3">
                <h3>{item.name}</h3>
                <h5>Hourly Rate: Rs.{item.price}.00</h5>
                {this.state.isExpandClick ?
                <div>
                  {item.vehicles && item.vehicles.length > 0 ?
                    <div>
                      <b>Vehicles for the category</b>
                      {item.vehicles.map((vehicle, index) => (
                        <div key={index} className="card p-2 mb-2">
                          <h5>{vehicle.name}</h5>
                          <h6>{vehicle.code}</h6>
                        </div>
                      ))}
                    </div>
                  : null}
                </div>
                : null}
              </div>
            ))}
          </div>
        : null}
      </div>
    )
  }
}

export default CategoryPage;

