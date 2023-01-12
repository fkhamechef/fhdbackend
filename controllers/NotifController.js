
var admin = require('firebase-admin')
var fcm = require('fcm-notification')

var serviceAccount = require('../config/feed-app-koa-firebase-adminsdk-azz6v-7790b3b82a.json')
const { response } = require('express')
const certPath = admin.credential.cert(serviceAccount)
admin.initializeApp({
  credential: certPath
});
var FCM = new fcm(certPath)
const NotifModel = require("../models/notification");
const UserTokenModel = require("../models/userTokens");


const sendToken = async (req, res) => {
  const {deviceId,regId} = req.body
  try {
    const deviceExists = await UserTokenModel.findOne({ deviceId });
    console.log(deviceExists)
    if(deviceExists){
      console.log("yes")
const resetUser = await UserTokenModel.findOneAndUpdate({ deviceId: deviceId }, { $set: { regId: regId } },{useFindAndModify :false,upsert: true,new:true}).then((response)=>{
  // res.status(200).json({  message: response  });
  console.log(response)

})
.catch((err)=>{
  console.log(err)
})
console.log(resetUser)
return res.status(400).json({ message: "Device already registered" });
    }else{
      const newUserToken = new UserTokenModel(req.body);
      await newUserToken.save();
      return res.status(200).json({ newUserToken });
    }

  } catch (error) {
    return res.status(400).json(error);
  }
  };



const createNotification = async (req, res) => {
  const allDevices = await UserTokenModel.find({});
 let Tokens = [];
  allDevices.map((item)=>{
    Tokens.push(item['regId'])
  })
  // console.log(Tokens)

  const notification = new NotifModel(req.body);
  try {
    // changed
    const notif = await notification.save();


    let msg = {
        notification:{
            title:req.body.title,
            body:req.body.description
            // image:req.body.imageUrl
        },
        data:{
            click_action: "FLUTTER_NOTIFICATION_CLICK"
        },
  //       apns: {
  //         payload: {
  //             aps: {
  //                 mutableContent: true,
  //                 contentAvailable: true,
  //             },
  //         },
  //        headers: {
  //            "apns-push-type": "background",
  //              "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
  //            "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
  //         },
  //     },
        
        token:"cVwMWsh4TZyfAPcga9prDY:APA91bEe3oJsdb1x3-_ak6u7i4G3mvF0vfVlrSYsZte0AwPSiKdzATjnMOtp9AwWkbZCIJyeb-zgD-nognqmg-Zo1kBT5aEt0-97HmtTstXUlyVkwXe1FroIwP662q6p5iCMasidm9Sm"
    }
// await admin.messaging().sendToTopic('Events',message);

await admin.messaging().send(
  // msg,
  {
  // token: "cjRfXEaNCELTmTTd-G9PEK:APA91bEcQtRobctNUIeML_fu23FcHl0_zgfVLWc2VvyYvllEj6fOlrHwJcj6-AMPXCeVfQ_7kiizT5_PHIAqwT5Hx8z8RwrhW6L_eRi1QeEqufoAez5uaTx2fuOw0i_IJ8jOrAbwiCEv",
  // token: "cscZwjl2Q2-BW1T_oVlsHN:APA91bFQEZ2rqtHp2Ce5YydhcqPzAbSo8FLXscj80ZxoVxVYqiRy1SEILumEEU_xV7nKFL3LwaNlvuIhsKYGrOy7gTldrzKYQEyBBosNZD4aHplAT6QN2ejccGGsuc7tlc65EH50TMfF",
  token: "ehv1Kew5T2SKa3xcvcREzz:APA91bF6xZm8Yip9LFswipTZaWC3BXeIc5CQUWzRUl-FWbQMI4mvRA5hG85bRKPWRk3nILygFbo3J_X4XjMeHaleYULlSjczm167zEb2YMQ9piuj5QcFuTB-PdSnzvAR3IU-27JYEr8-",
  // data: msg,

  notification: {
    title:req.body.title,
    body:req.body.description
  },
  // Set Android priority to "high"
  android: {
      // restrictedPackageName: "c1.superr.parents.digital.parenting",
      priority: "high",
      // notification: {
      //     // channelId: "c1.superr.parents.digital.parenting",
      //     title: "HI",
      //     body: "Hello",
      //     // clickAction: "FLUTTER_NOTIFICATION_CLICK"
      // }
  },

  // Add APNS (Apple) config
  apns: {
      payload: {
          aps: {
              mutableContent: true,
              contentAvailable: true,
          },
      },
      // headers: {
      //     "apns-push-type": "background",
      //     "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
      //     // "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
      // },
  },
}
).catch((err) => {
  console.log(err);
});
// console.log(test)
    // FCM.send(message,function(err)
    // {
    //     if(err){
    //         return res.status(500).send({
    //             message:err
    //         })
    //     } else{
    //         return res.status(200).send({
    //             message:"notification send"
    //         })
    //     }
    // });

    let message =
    {
      // token: "cjRfXEaNCELTmTTd-G9PEK:APA91bEcQtRobctNUIeML_fu23FcHl0_zgfVLWc2VvyYvllEj6fOlrHwJcj6-AMPXCeVfQ_7kiizT5_PHIAqwT5Hx8z8RwrhW6L_eRi1QeEqufoAez5uaTx2fuOw0i_IJ8jOrAbwiCEv",
      // token: "cscZwjl2Q2-BW1T_oVlsHN:APA91bFQEZ2rqtHp2Ce5YydhcqPzAbSo8FLXscj80ZxoVxVYqiRy1SEILumEEU_xV7nKFL3LwaNlvuIhsKYGrOy7gTldrzKYQEyBBosNZD4aHplAT6QN2ejccGGsuc7tlc65EH50TMfF",
      // token: "dqL89Zxl_UA1mKNhXpX9mG:APA91bFmdlR1e9QyJsDdlcpwTItpEGjr_EA3cjs9Xa70ANxlSVPTz_fZeF5VgthC9kKYCt13NGXKC8MkQ5r_HJFbsJRXFQNN1_V90qtIqhwjjC6qaFPK-pKhphAM2Xc56ffY4FI2VXlU",
      // data: msg,
    
      notification: {
        title:req.body.title,
        body:req.body.description
      },
      // Set Android priority to "high"
      android: {
          // restrictedPackageName: "c1.superr.parents.digital.parenting",
          priority: "high",
          // notification: {
          //     // channelId: "c1.superr.parents.digital.parenting",
          //     title: "HI",
          //     body: "Hello",
          //     // clickAction: "FLUTTER_NOTIFICATION_CLICK"
          // }
      },
    
      // Add APNS (Apple) config
      apns: {
          payload: {
              aps: {
                  mutableContent: true,
                  contentAvailable: true,
              },
          },
          // headers: {
          //     "apns-push-type": "background",
          //     "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
          //     // "apns-topic": "io.flutter.plugins.firebase.messaging", // bundle identifier
          // },
      },
    }

//     FCM.sendToMultipleToken(message, Tokens, function(err, response) {
//       console.log(response)
//     if(err){
//         console.log('err--', err);
//     }else {
//         console.log('response-----', response);
//     }  
// })
    res.status(200).json({ notif});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }




    // console.log("worked")
   



    // const  registrationToken = req.body.registrationToken
    // const message = req.body.message
    // const options =  {
    //     priority: "high",
    //     timeToLive: 60 * 60 * 24
    //   };
    
    //   admin.messaging().sendToDevice(registrationToken, message, options)
    //   .then( response => {

    //    res.status(200).send("Notification sent successfully"+response)
        
    //   })
    //   .catch( error => {
    //       console.log(error);
    //   });
  };

 const getNotifications = async (req, res) => {
  try {
    const allNotif = await NotifModel.find({}).sort({ _id: -1 });
    if (allNotif) {
      return res.status(200).json(allNotif);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
  };



  const deleteNotification = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const getDeletedData = await NotifModel.findByIdAndDelete(id);
        return res.status(200).json(getDeletedData);
      } else {
        return res.status(400).json({ message: "Id not found" });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };





  module.exports = {getNotifications,createNotification,deleteNotification,sendToken}