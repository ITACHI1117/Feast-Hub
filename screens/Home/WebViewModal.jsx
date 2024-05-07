import React, {useRef, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import FlutterwaveCheckoutLoader from './FlutterwaveCheckoutLoader';
import {AntDesign} from '@expo/vector-icons';

const WebViewModal = ({url, onClose, visible}) => {
  const screenHeight = Dimensions.get('window').height;
  const [modalHeight] = useState(new Animated.Value(screenHeight * 0.9));
  const webViewRef = useRef(null);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Animated.View
          onPress={() => closeModal}
          style={[styles.modalContent, {height: modalHeight}]}>
          <WebView
            // onLoadEnd={closeModal}
            startInLoadingState={true}
            renderLoading={() => <FlutterwaveCheckoutLoader />}
            source={{
              uri: url,
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 30,
    right: 10,
    zIndex: 1,
    backgroundColor: 'white',
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'black',
  },
});

export default WebViewModal;
