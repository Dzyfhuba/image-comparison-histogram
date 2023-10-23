import { Camera as CCamera, CameraSource, CameraResultType } from "@capacitor/camera"

export const useCamera = () => {
  const takePicture = async () => {
    const image = await CCamera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
    })

    return image
  }

  return {
    takePicture
  }
}