# Online Multimedia

# Introduction
This is Memes Generator Web-Page Project of LMU-WS2020/21-Online Multimedia.
The project is built through the [express](https://expressjs.com/) and use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2-de?utm_source=google&utm_campaign=gs_emea_germany_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624524&gclid=Cj0KCQiA-OeBBhDiARIsADyBcE5Cuu9rodsrPe2UB2ddOsDB_JG_OdV-ZE8LMog316zN1W_VFpSY8MwaAlK2EALw_wcB) as a remote database of the website。

### Team Member:
- Wenfeng Zhu (Master of Human-Computer Interaction)
- Chenke Xie (Master of Computer Science)
- Yukun Chen (Master of Computer Science)
- Shuaicong Wu (Master of Computer Science)

### Install:

This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.  
You will need to go into this folder  
 ```sh
$ cd Meme-Generator 
```
 Then you will need to install the necessary packages.  
 ```sh
$ npm install
```
At last you should manually start this Express app.  
```sh
$ npm start
```
Then open the http://localhost:3000/ to use the web page of the project.
# Version Log
This part shows the general update process, including the update content, time and implementer. The specific task assignment and details can be viewed in the task document that contains the final submission.
## Version 0.01
* Create the Project and design the layout  
* **11/27 Wenfeng Zhu**
## Version 0.02
* Adjust the layout and add the text-input function
* Use the Imgflip API as the Image source.  
* **11/30-12/15 Wenfeng Zhu**
## Version 0.03
* Adjust layout of text-input area and add the text to the image area. 
* Overlay display of images and texts.
* Texts are dragged within a specific range.
* **01/03-01/05 Wenfeng Zhu**
## Version 0.04
* Implement a single image display function, i.e. click on an image to highlight the preview individually.
* **01/08 Yukun Chen**
## Version 0.05
* Implement import-files function, Local images can be uploaded to the preview area.
* Fix some bugs of text-draggable function.
* **01/08 Wenfeng Zhu**
## Version 0.06
* Bulid the Express-APP based on the project.
* **01/09 Wenfeng Zhu**
## Version 0.07
* Code refactoring, separation of the different functional blocks.
* **01/13 Wenfeng Zhu**
## Version 0.08
* Add a image-export function and solve the Cross-origin problem
* **01/14 Wenfeng Zhu**
## Version 0.09
* Add the the overview(scroll function) of images
* **01/17 Shuaicong Wu**

## Version 0.10
* Add basic text formatting options for the text inside the image (colour, size, bold, italic)
* **01/18 Wenfeng Zhu**

## Version 0.11
* Read image from MongoDB Altas.
* **01/18 Chenke Xie**

## Version 0.12
* User can upload Memes to MongoDB
* **02/23 Wenfeng Zhu**

## Version 0.13
* add a textbox-delete function/ complete generated interface/ adjust layout
* **02/23 Wenfeng Zhu**
