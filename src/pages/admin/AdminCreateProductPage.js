import CreateProductPageComponent from "./components/CreateProductPageComponent";
import axios from "axios";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/products/admin`,
    { ...formInputs },
    { withCredentials: true }
  );
  return data;
};

const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    "http://localhost:3000/api/products/admin/upload?productId=" + productId,
    formData,
    { withCredentials: true }
  );
};

const uploadImagesCloudinaryApiRequest = (images) => {
  const url = "https://api.cloudinary.com/v1_1/jkhbnc-366gs/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "acsijtdn");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
};

const AdminCreateProductPage = () => {
  return (
    <CreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminCreateProductPage;
