import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native'
import { CardSection } from '../common'
import { connect } from 'react-redux'
import * as actions from '../../actions'

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  renderDescription() {
    const { library, expanded } = this.props

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>{library.description}</Text>
        </CardSection>
      )
    }
  }

  render() {
    const { titleStyle } = styles
    const { id, title } = this.props.library

    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // return { selectedLibraryId: state.selectedLibraryId }
  const expanded = state.selectedLibraryId === ownProps.library.id
  return { expanded }
}

export default connect(mapStateToProps, actions)(ListItem)
