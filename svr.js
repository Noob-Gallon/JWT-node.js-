const jwt = require('jsonwebtoken')
const SECRET_KEY = 'MY-SECRET-KEY'

// POST /login 요청 body에 id와 password를 함께 실어서 요청으로 가정 (사실 id와 password는 암호화 되어있음)

router.post('login', (req, res, next) => {

    const nickname = "CharmingKyu";
    const profile = "imageURL";

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    token = jwt.sign({
        type: 'JWT',
        nickname: nickname,
        profile: profile, 
    }, SECRET_KEY, {
        expiresIn: '15m', // 만료시간 15분
        issuer: '토큰발급자',
    })

    return res.status(200).json({
        code: 200,
        message: '토큰이 발급되었습니다.',
        token: token
    })
})