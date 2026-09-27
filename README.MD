# Cloudinary Image Upload with Multer

Note:  For claudinary
file.originalname concatinate it with random number,
req.file.path upload on claudinary,
 req.file.path is used to delete file from your device
Claudinaryvar.secure_url is stored on mongodb database

Then it return something 
    1.  express: https://expressjs.com/
    2. .env:  require('dotenv').config();
    3. For json: app.use(express.json());
    4. Multer: From <https://github.com/expressjs/multer>  then Ctrl+f to search disk storage that gives file extension
    5. Random number: iuid npm install then: https://refine.dev/blog/node-js-uuid/ then multer finish
    6. Google account then there is all configuration of claudinary
    7. Then for deleting photos from your computer: Fsunlink module for deleting file (no need to install comes with nodejs): https://www.geeksforgeeks.org/node-js/node-js-fs-unlink-method/
Mongodb schema: https://mongoosejs.com/














###  NOTE: For Cloudinary

These are the **most important points to remember**:

* `file.originalname` → concatenate it with a random number.
* `req.file.path` → upload the file to Cloudinary.
* `req.file.path` → used to delete the file from your device.
* `Cloudinaryvar.secure_url` → stored in MongoDB database.
* Then it returns the response.

### Complete Flow

```text
file.originalname
        +
random number
        ↓
Unique filename
        ↓
req.file.path
        ↓
Upload to Cloudinary
        ↓
Cloudinaryvar.secure_url
        ↓
Store in MongoDB
        ↓
req.file.path
        ↓
Delete file from your device
```

---

## Other Important Points

### 1. Express

https://expressjs.com/

Used for creating the Express server.

---

### 2. `.env`

```js
require('dotenv').config();
```

Used for environment variables such as Cloudinary credentials and MongoDB connection string.

---

### 3. For JSON

```js
app.use(express.json());
```

Used to handle JSON data in Express.

---

### 4. Multer

From:

https://github.com/expressjs/multer

Then **Ctrl + F → search `diskStorage`**.

This gives the information about storing files and setting the filename.

---

### 5. Random Number / UUID

UUID npm:

https://www.npmjs.com/package/uuid

Learning resource:

https://refine.dev/blog/node-js-uuid/

Install:

```bash
npm install uuid
```

Then Multer file handling is complete.

---

### 6. Cloudinary

Create a Google/Cloudinary account and get all the required Cloudinary configuration.

Example:

```js
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
```

---

### 7. Delete Photos from Your Computer

`fs.unlink()` module is used for deleting the uploaded file from your computer.

**No need to install it — it comes with Node.js.**

https://www.geeksforgeeks.org/node-js/node-js-fs-unlink-method/

Example:

```js
fs.unlink(req.file.path, (err) => {
    if (err) {
        console.log("Error occurred:", err);
    }
});
```

---

### 8. MongoDB Schema

Mongoose is used to create the MongoDB schema.

https://mongoosejs.com/

Example:

```js
const Image = mongoose.model('Image', {
    Image_Url: String
});
```

Store Cloudinary URL:

```js
const newvar = new Image({
    Image_Url: uploadResult.secure_url
});

await newvar.save();
```

---

## 📌 Final Revision

```text
1. Express
   → Backend/server

2. dotenv
   → Environment variables

3. express.json()
   → JSON data

4. Multer
   → File upload

5. diskStorage()
   → Store uploaded file

6. UUID
   → Random/unique filename

7. Cloudinary
   → Store image online

8. fs.unlink()
   → Delete local image

9. Mongoose
   → MongoDB schema

10. secure_url
    → Store Cloudinary image URL in MongoDB
```

## 📚 Resources

1. Express: https://expressjs.com/

2. Multer: https://github.com/expressjs/multer

3. UUID: https://refine.dev/blog/node-js-uuid/

4. fs.unlink: https://www.geeksforgeeks.org/node-js/node-js-fs-unlink-method/

5. MongoDB Schema: https://mongoosejs.com/

6. Cloudinary Tutorial: https://www.youtube.com/watch?v=kTJgDQLEm7s&list=PLIY6DmA30sg_G-Omv6u0SH1mpp4clyuck
