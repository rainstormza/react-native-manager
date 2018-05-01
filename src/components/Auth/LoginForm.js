import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from '../common'

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress = () => {
    const { email, password } = this.state

    this.setState({ error: '', loading: true })

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFailed)
      })
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  onLoginFailed = () => {
    this.setState({ error: 'Authentication Failed.', loading: false })
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="" small />
    }

    return <Button onPress={this.onButtonPress}>Login</Button>
  }

  render() {
    return (
      <Card>
        <CardSection>
          {/* TextInput default no height and width (0) */}
          <Input
            label="Email"
            onChangeText={email => this.setState({ email: email })}
            value={this.state.email}
            placeholder="user@gmail.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="Password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    )
  }
}

export default LoginForm
