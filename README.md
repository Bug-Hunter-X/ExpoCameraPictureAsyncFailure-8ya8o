# Expo Camera takePictureAsync Failure After Rapid Camera Switching

This repository demonstrates a bug in Expo's Camera API where `takePictureAsync` can fail after rapidly switching between the front and rear cameras.  The issue is intermittent, making it difficult to consistently reproduce.

## Bug Description

When switching between the front and rear cameras multiple times in quick succession using Expo's Camera API, subsequent calls to `takePictureAsync` might fail, resulting in either:

* An error being thrown.
* A blank image being returned.

This appears to be related to internal state management within the Camera API not properly handling rapid state transitions.

## Reproduction Steps

1. Clone this repository.
2. Run `npm install`.
3. Run `expo start`.
4. Rapidly switch between the front and rear cameras (e.g., using a button that toggles the camera type). 
5. Attempt to take a picture.  You might encounter failure after several camera switches.

## Solution

The proposed solution involves implementing a small delay before calling `takePictureAsync` after switching cameras. This allows sufficient time for the camera's internal state to properly update.

This delay is implemented in `bugSolution.js`.