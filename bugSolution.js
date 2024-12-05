```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, View, Text } from 'react-native';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);
  const [pictureTaken, setPictureTaken] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (pictureTaken) return;
    setPictureTaken(true);
    try {
      let photo = await cameraRef.current.takePictureAsync();
      console.log('Photo taken:', photo);
    } catch (error) {
      console.error('Error taking picture:', error);
    } finally {
      setPictureTaken(false);
    }
  };

  const switchCamera = async () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
    // Added delay to solve the bug
    await new Promise(resolve => setTimeout(resolve, 200));
  };

  const cameraRef = React.useRef(null);

  return (
    <View>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <Button title="Take Picture" onPress={takePicture} />
        <Button title="Switch Camera" onPress={switchCamera} />
      </Camera>
    </View>
  );
}
```