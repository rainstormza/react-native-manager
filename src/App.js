/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

// import like absolute path for only App.js
import { Header, Button, CardSection, Spinner } from './components/common'
import AlbumList from './components/Albums/AlbumList'

import LoginForm from './components/Auth/LoginForm'

import LibraryList from './components/TechStack/LibraryList'

// import LoginFormManager from './components/Manager/LoginForm'
import Router from './Router'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

type Props = {}
export default class App extends Component<Props> {
  state = {
    loggedIn: null
  }

  componentWillMount() {
    this.firebaseAuth()
  }

  firebaseAuth = () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2BpTgENUQXvvJGzfGVyAb9KdtzThQZyc',
      authDomain: 'react-authen.firebaseapp.com',
      databaseURL: 'https://react-authen.firebaseio.com',
      projectId: 'react-authen',
      storageBucket: 'react-authen.appspot.com',
      messagingSenderId: '35744052609'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Logout</Button>
          </CardSection>
        )
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native! </Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>

      <Provider store={store}>
        {/* flex 1 use when scroll to bottom that can see full content */}
        <View style={{ flex: 1 }}>
          {/* Album */}
          {/* <Header headerText={'Albums'} />
        <AlbumList /> */}
          {/* Auth */}
          {/* <Header headerText={'Auth'} />
          {this.renderContent()} */}
          {/* TectStack */}
          {/* <Header headerText={'Tect Stack'} />
          <LibraryList /> */}
          {/* Manager */}
          {/* <Text>Manager</Text>
          <LoginFormManager /> */}
          <Router />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
