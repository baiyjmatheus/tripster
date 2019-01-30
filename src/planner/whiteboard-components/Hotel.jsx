import React, { Component } from 'react';
import axios from 'axios';
import cors from 'cors';

class Hotel  extends Component {

  state = {
    posts: []
  }

  //function to get hotel information from places API
  // getHotels(){
  //   let config = 'AIzaSyBuSxErYyCYiLeCJqTcL9zeWYvfObimKx4'
  //   axios
  //     .get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1000&type=lodging&key=AIzaSyBuSxErYyCYiLeCJqTcL9zeWYvfObimKx4", {headers: config})
  //     .then(response => {
  //       this.setState({
  //         posts: response.data.posts,
  //       })
  //     })
  // }

  componentDidMount(){
    // this.getHotels();
    // axios.defaults.headers.common['Authorization'] = "AIzaSyBuSxErYyCYiLeCJqTcL9zeWYvfObimKx4"

    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=McDonalds&inputtype=textquery&fields=photos&key=AIzaSyBuSxErYyCYiLeCJqTcL9zeWYvfObimKx4',
      {method: 'GET',
       mode: 'cors',


       }).then((response) =>
       console.log(response)
       )
       /*
    axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json', {
    headers: { 'content-type': 'application/json' },
    crossDomain: true,
    params: {
      input: "McDonalds",
      inputtype: "textquery",
      fields: "photos",
      key: "AIzaSyBuSxErYyCYiLeCJqTcL9zeWYvfObimKx4"
    }
    })
      .then(json => console.log(json))*/
  }


  render () {
    // const posts = this.state.posts;
    // const postItem = posts.map(post => {
    //   return <div> <li> {post} </li></div>
    // })
    return (
     <div>
      <div>
          <h1> this is the hotels page </h1>
      </div>

    </div>

    )
  }
}

export default Hotel



     /* <React.Fragment>
        <div>
          <h1> this is the hotels page </h1>
        </div>

        <div className ="test">

           posts.map(post => (<li> {post.name} </li>))

        </div>
      </React.Fragment> */