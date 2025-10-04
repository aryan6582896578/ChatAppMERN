import cloudinary from "cloudinary"
  cloudinary.config({ 
        cloud_name: 'dz9lsudey', 
        api_key: '938643821263414', 
        api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });    

//   const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
export default async function uploadImage(imageData){
  const image = await cloudinary.uploader.upload(imageData, { 
  resource_type: "auto",})
  console.log(image)
  return image
}