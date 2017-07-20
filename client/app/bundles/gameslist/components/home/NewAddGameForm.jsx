import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';


export default class NewAddGameForm extends React.Component{
  constructor(props, _railsContext){
      super(props)
      console.log('addgameform props')
      console.log(props)
      this.state = {
        title: this.props.gameResult.name,
        genre: '',
        platform: '',
        progress: '',
        release_date: this.props.gameDate,
      }
  }

  handleChange = (e) => {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addGame();
  }

  addGame = () => {
    $.ajax({
      url: window.location.origin + '/api/gamesapi/',
      type: 'POST',
      dataType: 'JSON',
      data: {
        game: this.state
      },
      success: (data) => {
        console.log(data);
        alert('Success')
        var formid = '#gameid' + this.props.gameResult.id
        $(formid).removeClass('in')
      },
      error: (data) => {
        console.log(data)
        alert('This game already exists in your games list')
        var formid = '#gameid' + this.props.gameResult.id
        $(formid).removeClass('in')
      }
    })
  }

  render () {
    const disabledSubmitStatus = (this.state.title != "" && this.state.progress != "") ? false : true
    const disabledInputStatus = this.state.editing ? true : false
    const game = this.props.gameResult;
    const data_target_name = "#gameid" + game.id
    const form_target_id = "gameid" + game.id

    console.log(this.props.currentUser)

    return (
      <div className="add-game-container">
        <form id={form_target_id} className='form-group collapse' onSubmit={this.handleSubmit}>
          <input disabled={disabledInputStatus} className="form-control add-game-field2" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange}/>
          <select className="form-control add-game-field2" placeholder="progress" name="progress" value={this.state.progress} onChange={this.handleChange}>
            <option value="Select"> Select Progress </option>
            <option value="0%"> 0% </option>
            <option value="25% "> 25% </option>
            <option value="50% "> 50% </option>
            <option value="75%"> 75% </option>
            <option value="100% Storyline"> 100% Storyline </option>
            <option value="100% Completion"> 100% Completion </option>
            <option value="Wish"> Wish </option>
            <option value="Contemplating"> Contemplating </option>
            <option value="On hold"> On Hold </option>
          </select>
          <input readOnly="readOnly" type="hidden" className="form-control add-game-field" name="release_date" placeholder="release_date" value={this.props.gameDate} onChange={this.handleChange}/>
          <input disabled={disabledSubmitStatus} type="submit" value='Add Game' className="btn btn-primary add-game-button-2" />
        </form>
      </div>
    )
  }
};
