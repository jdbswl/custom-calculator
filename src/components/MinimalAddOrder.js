import React from 'react';

class MinimalAddOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name
    }
    console.log(input);
    await onCreate({input});
  }

  render() {
    return (
      <div>
        <input
          name="name"
          placeholder="Order name"
          onChange={(ev) => { this.handleChange('name', ev)}}
        />
        <button onClick={this.submit.bind(this)}>
          Add
        </button>
      </div>
    );
  }
}

export default MinimalAddOrder;
