import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import axios from 'axios'
import AlbumDetail from './AlbumDetail'

class AlbumList extends Component {
  state = {
    albums: []
  }

  componentWillMount() {
    console.log('componentWillMount in AlbumList')
    // debugger
    axios
      .get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(res => {
        // console.log(res)
        this.setState({ albums: res.data })
      })
  }

  renderAlbums() {
    return this.state.albums.map(album => (
      <AlbumDetail key={album.title} album={album} />
    ))
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
        {/* <Text>Album List !!!</Text> */}
        {this.renderAlbums()}
      </ScrollView>
    )
  }
}

export default AlbumList
