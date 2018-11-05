import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Index.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
//import { Redirect, Link } from 'react-router'
import Back from './Back';

export default class Index extends Component {
  constructor(props){
    super(props);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ape: true,
      selectedOption: '',
      radioCheck: 1,
      ansArray: [],
      ansArry: [],
      answer: '',
      temp: [
        {
          Text: "Do you like programming",
          Type: "radio",
          disabled: false,
          Options: [
              {option: "I love programming!"},
              {option: "Maybe"},
              {option: "I hate it!!!"},
              {option: "Don't ask"}
          ],
          Id: 10
        },
        {
          Text: "Are you Pakistani?",
          Type: "radio",
          disabled: false,
          Options: [
              {option: "Yes"},
              {option: "No"}
          ],
          Id: 8
        },
        {
          Text: "In which city do you live?",
          Type: "text",
          Id: 4
        },
        {
          Text: "How old are you?",
          Type: "slider",
          disabled: false,
          Id: 3
        },
        {
          Text: "What is your gender?",
          Type: "radio",
          disabled: false,
          Options: [
            {option: "Male"},
            {option: "Female"}
          ],
          Id: 2
        },
        {
          Text: "Hey! What is your name?",
          Type: "text",
          Id: 1
        }
      ]
    }
  }



  componentDidMount(){
    // axios.get('http://localhost:8000/answers')
    // .then(response =>
    //   this.setState({
    //     ansArray: response.data,
    //   })
    // )
    var x = this.state.temp.pop()
    this.pushArrayObj([x])
  }

  onChangeAnswer(e){
    this.setState({
      answer: e.target.value,
    })
  }

  onSubmit(e){
    console.log(this.state.temp.length)
    if (this.state.temp.length <= 0) {return }
    e.preventDefault();
    if (this.state.answer === '') {return}
    var x = this.state.temp.pop();
    var temp = [{
      Text : this.state.answer,
      Type : "answer"
    },x]
    this.pushArrayObj(temp);
    this.setState({
      radioCheck: ++this.state.radioCheck
    })
    // this.textInput.focus();
    this.setState({
      answer: ''
    })


    const answer_ = {
      answer: this.state.answer,
    }
    axios.post('http://localhost:8000/answers/store', answer_)
    .then(response => console.log(response.data))
  }

  pushArrayObj(obj){
    this.setState({
      ansArry: this.state.ansArry.concat(obj)
    })
  }

  forRadioData(e){
      console.log(this.state.temp.length)
      if (this.state.temp.length <= 0) {return }
      var x = this.state.temp.pop();
      var temp = [{
        Text : e,
        Type : "answer"
      }, x]
      this.pushArrayObj(temp);
      // this.setState({
      //   radioCheck: ++this.state.radioCheck
      // })
      // this.textInput.focus();
      this.setState({
        answer: ''
      })

      const answer_ = {
        answer: e,
      }
      axios.post('http://localhost:8000/answers/store', answer_)
      .then(response => console.log(response.data))
  }

  handleClick(e){
    this.setState({
      selectedOption: e.target.value
    })
    let editAble = this.state.ansArry;
    editAble[e.target.name].disabled = true
    this.setState({editAble})
    console.log(e.target.value)
    this.forRadioData(e.target.value)
  }

  render() {
      return (
          <Router>
            <div className="container">
              {
                // this.state.ansArray.map((value, key) => {
                //   return (
                //     <div className="answer" key={value.id}>
                //       {value.item}
                //     </div>
                //   )
                // })
              }
              {
                // this.state.temp.length <= 0 ? <Redirect exact to='/back' />: ""
              }
              {/* <Link to="/">Home</Link> */}
              {/* <Link to="/back">Back Page</Link> */}
              <div className="container-fluid chatContainer">
              {
                this.state.ansArry.map((data, type, options, i) =>
                <div className="chat-box-padding-top">
                <div className="row">
                  <div className={"col-md-6 " + (data.Type === "answer"?"offset-md-5 answer ": "offset-md-1 question")}>
                      <div key={i}>
                        {data.Text}
                        {
                          data.Type === "radio" ?
                            <div>
                              {
                                data.Options.map(value => <div>
                                  <input type="radio" onClick={this.handleClick.bind(this)} disabled={data.disabled || false} name={data.Id} value={value.option}/>{value.option}<br/>
                                </div>)
                              }
                            </div>
                          :""
                        }

                      </div>
                  </div>
                </div>
              </div>
              )
            }</div>
              {/* This ends here */}
              <div className="container">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="text"
                      className="form-control textInput"
                      id="answer"
                      value={this.state.answer}
                      onChange={this.onChangeAnswer}
                    />
                  </div>
                  <button type="submit" className="bttn btn-primary">+</button>
                </form>
              </div>
              <Switch>
                {/* <Route exact path='/' component={Index} /> */}
                <Route exact path='/back' component={Back} />
                {/* <Redirect from='/' to='/back' /> */}
              </Switch>
            </div>
          </Router>
      );
  }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
