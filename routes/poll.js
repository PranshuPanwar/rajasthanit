/**
 * Created by Pranshu Panwar on 19-03-2018.
 */
const express =require('express');
const router = express.Router();
//const pusher = require('pusher');

router.get('/',function(req,res){
    res.send('POLL');
});
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '493879',
    key: '4b96a42a3d8c888b469e',
    secret: '197d6841b4623164f820',
    cluster: 'ap2',
    encrypted: true
});

router.post('/',function(req,res){

    pusher.trigger('os-poll', 'os-vote', {
       point :1,
       os: req.body.os
    });
    return res.json({success:true , message:'thank you for the voting'})
})
module.exports = router;
