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

router.post('/login', async (req, res) => {
    const { userID, password } = req.body;

    try {
        // 사용자 확인
        const user = await prisma.user.findFirst({
            where: {
                userID: userID,
            },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // 비밀번호 일치 확인
        const passwordMatch = await bcrypt.compare(password, user.encryptedPW);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }


        req.session.user = {
            UID : user.UID,
            userName: user.name,
            userID: user.userID
        }

        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save session' });
            }

            console.log('세션 생성됨', req.session.user.UID, req.session.id, `${req.session.userName}`);
            return res.status(200).json({ message: 'Login successful', user: user });
            
        });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;