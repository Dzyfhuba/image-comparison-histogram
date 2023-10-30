import { Camera as CCamera, CameraSource, CameraResultType } from "@capacitor/camera"

export const useCamera = () => {
  const takePicture = async () => {
    // console.log(await CCamera.checkPermissions())
    
    // if (!await CCamera.checkPermissions())
    //   await CCamera.requestPermissions()

    // camera from native web

    const image = await CCamera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      promptLabelCancel: 'Cancel',
    })

    return image
  }

  return {
    takePicture
  }
}