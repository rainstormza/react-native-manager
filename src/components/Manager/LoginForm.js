import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardSection, Input, Button, Spinner } from '../common'
import { emailChanged, passwordChanged, loginUser } from '../../actions'

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

class LoginFormManager extends Component {
  rednerError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      )
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }
    return (
      <Button
        onPress={() =>
          this.props.loginUser({
            email: this.props.email,
            password: this.props.password
          })
        }
      >
        Login
      </Button>
    )
  }

  render() {
    console.log(this.props)
    return (
      <Card>
        <CardSection>
          {/* TextInput default no height and width (0) */}
          <Input
            label="Email"
            onChangeText={email => this.props.emailChanged(email)}
            value={this.props.email}
            placeholder="user@gmail.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            onChangeText={password => this.props.passwordChanged(password)}
            value={this.props.password}
            placeholder="Password"
            secureTextEntry
          />
        </CardSection>

        {this.rednerError()}

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginFormManager)
