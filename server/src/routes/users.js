const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const router = express.Router();
const prisma = new PrismaClient();

const generateUID = () => {
    return crypto.randomBytes(16).toString('hex');
}

router.post('/signup', async (req, res) => {
    try {
        const { id, pw, pwcheck, stuNum, name } = req.body;

        if (!id || !pw || !pwcheck || !stuNum || !name) {
            return res.status(400).json({ error: '값이 모두 입력되지 않았습니다.' });
        }

        if (pw !== pwcheck) {
            return res.status(400).json({ error: '비밀번호가 맞지 않습니다.' });
        }
        
        const hashedPassword = await bcrypt.hash(pw, 10);

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { userID: id },
                    { stuNumber: stuNum }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.userID === id) {
                return res.status(400).json({ error: '이미 같은 ID가 가입되어 있습니다.' });
            }
            if (existingUser.stuNumber === stuNum) {
                return res.status(400).json({ error: '이미 가입된 학번입니다.' });
            }
        }

        // 데이터베이스에 사용자 저장
        const newUser = await prisma.user.create({
            data: {
                UID: generateUID(),
                userID: id,
                encryptedPW: hashedPassword,
                stuNumber: stuNum,
                name: name
            }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;