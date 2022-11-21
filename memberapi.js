const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('./config/secretkey.js')

let memberList = [
    {id:"testid1", password:"testpwd1", name:"홍길동"},
    {id:"testid2", password:"testpwd2", name:"김철수"},
    {id:"testid3", password:"testpwd3", name:"이영희"},
]

router.post('/login', async function(req, res, next) {
	console.log("REST API Post Method - Member Login And JWT Sign");
	const memberId = req.body.id;
	const memberPassword = req.body.password;
	var memberItem = memberList.find(object => object.id == memberId);
	if (memberItem != null) {
		if (memberItem.password == memberPassword) {
			const secret = "005c9780fe7c11eb89b4e39719de58a5";
			try {
				const accessToken = await new Promise((resolve, reject) => {
					jwt.sign({
							memberId : memberItem.id,
							memberName : memberItem.name
						},
						secret,
						{
							expiresIn : '1d'
						},
						(err, token) => {
							if (err) {
								reject(err);
							} else {
								resolve(token);
							}
						});
				});
				res.json({success:true, accessToken:accessToken});
			} catch(err) {
				console.log(err);
				res.status(401).json({success:false, errormessage:'token sign fail'});
			}
		} else {
			res.status(401).json({success:false, errormessage:'id and password are not identical'});
		}
	} else {
		res.status(401).json({success:false, errormessage:'id and password are not identical'});
	}
});

module.exports = router

// router.post('/login', (req, res, next) => {
//     console.log("REST API Post Method - Member Login And JWT Sign")
//     const memberId= req.body.id;
//     const memberPassword = req.body.password;

//     // db와 대조해서 아이디가 같은지 체크
//     let memberItem = memberList.find(object => object.id == memberId);

//     // 아이디가 같은 것이 있다면
//     if (memberItem != null) {
//         if (memberItem.password = memberPassword) {
//             const secret = "005c9780fe7c11eb89b4e39719de58a5";
//             jwt.sign({
//                 memberId : memberItem.id,
//                 memberName : memberItem.name
//             },
//             secret,
//             {
//                 expiresIn : '1d'
//             },
//             (err, token) => {
//                 if (err) {
//                     console.log(err);
//                     // 로그인과 인증이 실패할 때는 상태 코드 401
//                     res.status(401).json({success:false, errormessage:'token sign fail'});
//                 } else {
//                     res.json({success:true, accessToken:token});
//                 }
//             }
//             )
//         } else {
//             res.status(401).json({success:false, errormessage:'id and password are not identical'});
//         }
//     } else {
//         res.status(401).json({success:false, errormessage:'id and password are not identical'});
//     }
// })