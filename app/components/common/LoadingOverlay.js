import React, { Component, PropTypes } from 'react'
import Modal from 'react-native-modalbox'
import {VibrancyView} from 'react-native-blur'
import Spinner from 'react-native-loading-spinner-overlay'

export default class LoadingOverlay extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isLoading}
        style={[styles.modal]}
        position={"bottom"}
      >
        <VibrancyView blurType="light" style={styles.container}>
          <Spinner visible={true} />
        </VibrancyView>
      </Modal>
    )
  }
}

const styles = {
  modal: {
    backgroundColor: 'transparent'
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
}
