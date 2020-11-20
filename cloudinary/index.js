import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
const parser = multer({ storage: storage });
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name : process.ene.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_KEY , 
    api_secert : process.env. CLOUDINARY_SECRET
})


 export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yalpcamps',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
    allowedFotmat : ['jpeg ' , 'png' , 'jpg']
  },
});



