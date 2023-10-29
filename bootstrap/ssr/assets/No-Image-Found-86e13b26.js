import { Camera, CameraSource, CameraResultType } from "@capacitor/camera";
const useCamera = () => {
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Uri,
      promptLabelCancel: "Cancel"
    });
    return image;
  };
  return {
    takePicture
  };
};
const NoImage = "/build/assets/No-Image-Found-441660e7.png";
export {
  NoImage as N,
  useCamera as u
};
