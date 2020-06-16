import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { createRooms } from '../../../redux/actions/accommodationsAction';

class AddRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: '',
      roomType: '',
      roomPrice: '',
      rooms: [],
      requiredError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRemove(index) {
    const { rooms } = this.state;
    this.setState({
      rooms: rooms.filter((r, idx) => index !== idx)
    });
  }

  handleAdd() {
    const { rooms } = this.state;
    this.setState({
      rooms: rooms.concat([
        {
          name: null,
          type: null,
          price: null
        }
      ])
    });
  }

  handleNew(index) {
    return (
      <div key={index}>
        <div className="col-12">
          <h3>Rooms</h3>
        </div>
        <div className="col-6">
          <Input
            name="name"
            classes="input-old"
            inputType="text"
            placeholder="Name *"
            onChange={(e) => this.handleChange(e, index)}
          />
        </div>
        <div className="col-6">
          <Input
            name="type"
            inputType="text"
            placeholder="Type *"
            onChange={(e) => this.handleChange(e, index)}
          />
        </div>
        <div className="col-6">
          <Input
            name="price"
            inputType="number"
            placeholder="Price *"
            onChange={(e) => this.handleChange(e, index)}
          />
        </div>
        <div className="col-1">
          <Button
            buttonId="remove-room"
            buttonType="button"
            classes="btn btn-danger p-left-2 p-right-2"
            text="✖"
            onClick={() => this.handleRemove(index)}
          />
        </div>
        <div className="col-5" />
      </div>
    );
  }

  handleChange(e, index) {
    const { rooms } = this.state;
    if (index >= 0) {
      const newRooms = rooms.map((room, idx) => {
        if (index === idx) {
          return { ...room, [e.target.name]: e.target.value };
        }
        return room;
      });
      this.setState({
        rooms: newRooms
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleSubmit() {
    const { roomName, roomType, roomPrice, rooms } = this.state;
    const { submit, id, createRooms } = this.props;
    let canSubmit = true;
    rooms.map((room) => {
      if (Object.values(room).includes(null)) {
        canSubmit = false;
      }
    });

    if (!roomName || !roomPrice || !roomType || !canSubmit) {
      this.setState({
        requiredError: 'ALL fields with * are required'
      });
    } else {
      const room1 = {
        name: roomName,
        type: roomType,
        price: roomPrice
      };
      const data = [...rooms];
      data.push(room1);
      const newRoom = {
        rooms: data,
        accommodationId: id
      };
      submit();
      createRooms(newRoom);
    }
  }

  render() {
    const { roomName, roomType, roomPrice, rooms, requiredError } = this.state;
    const { submitting } = this.props;
    console.log('this.props: ', this.props);
    console.log('this.state: ', this.state);
    return (
      <>
        <div className="col-10 p-1 m-bottom-1 offset-3">
          <div className="grid white p-left-1 p-top-1">
            <div className="col-12">
              <h3>Rooms</h3>
            </div>
            <div className="col-6">
              <Input
                name="roomName"
                inputType="text"
                value={roomName}
                placeholder="Name *"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="col-6">
              <Input
                name="roomType"
                inputType="text"
                value={roomType}
                placeholder="Type *"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="col-6">
              <Input
                name="roomPrice"
                inputType="number"
                value={roomPrice}
                placeholder="Price *"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            {rooms.map((room, index) => this.handleNew(index))}
            <div>
              <Button
                buttonId="add-room"
                buttonType="button"
                classes="btn btn-secondary col-4"
                text="✚ Add Rooms"
                onClick={() => this.handleAdd()}
              />
            </div>
            <div className="col-12 m-right-2">
              <h4 className="text-center text-danger">{requiredError || ''}</h4>
            </div>
            <div>
              <Button
                buttonId="submit-rooms"
                buttonType="button"
                classes="btn btn-primary"
                text="Add"
                submitting={submitting}
                onClick={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddRoom.propTypes = {
  id: PropTypes.number.isRequired,
  submit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  createRooms: PropTypes.func.isRequired
};

export default connect(null, { createRooms })(AddRoom);
