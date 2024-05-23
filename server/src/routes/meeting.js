const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

const getUserNameByUID = async (uid) => {
    const user = await prisma.user.findUnique({
        where: { UID: uid },
        select: { name: true }
    });
    return user ? user.name : null;
};

router.post('/new', async (req, res) => {
    const { meetingName, startTime, endTime, location, content } = req.body;
    const UID = req.session.user.UID; // Assuming user UID is stored in session

    if (!UID) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    try {
        // Check if a meeting with the same name already exists
        const existingMeeting = await prisma.meeting.findFirst({
            where: {
                meetingName: meetingName
            }
        });

        if (existingMeeting) {
            return res.status(400).json({ success: false, message: 'Meeting name already exists' });
        }

        // Create new meeting
        const newMeeting = await prisma.meeting.create({
            data: {
                meetingID: `m_${Date.now()}`, // Or use a UUID generator
                meetingName,
                hostUID: UID,
                membersUID: JSON.stringify([UID]), // Store the UID as a JSON array
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                location,
                content,
                uploadTime: new Date()
            }
        });

        res.status(201).json({ message: 'Meeting created successfully', meeting: newMeeting });

    } catch (error) {
        console.error('Failed to create meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/getByID', async (req, res) => {
    const { meetingID } = req.body;
    try {
        const meeting = await prisma.meeting.findUnique({
            where: {
                meetingID: meetingID
            }
        });
        
        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        const hostName = await getUserNameByUID(meeting.hostUID);
        const memberUIDs = JSON.parse(meeting.membersUID || '[]');
        const memberNames = await Promise.all(memberUIDs.map(uid => getUserNameByUID(uid)));

        res.json({
            meetingName: meeting.meetingName,
            startTime: meeting.startTime,
            endTime: meeting.endTime,  // Include endTime
            location: meeting.location,
            host: hostName,
            members: memberNames,
            content: meeting.content,
        });

    } catch (err) {
        console.error('Failed to fetch meetings:', error);
        res.status(500).json({ error: 'Internal server error' });
    };
});

router.post('/get', async (req, res) => {
    const { userSearch, startTime, endTime } = req.body;

    try {
        let meetings = [];
        
        console.log(startTime, endTime);
        // 사용자 참여 중인 모임 검색
        if (userSearch) {
            const userUID = req.session.user.UID;
            meetings = await prisma.meeting.findMany({
                where: {
                    membersUID: {
                        contains: userUID
                    }
                }
            });
        } 
        // 시간 간격 내의 모임 검색
        else if (startTime && endTime) {
            console.log(startTime, endTime);
            meetings = await prisma.meeting.findMany({
                where: {
                    startTime: {
                        gte: new Date(startTime),
                        lte: new Date(endTime)
                    }
                }
            });
        } 
        // 모든 모임 검색
        else {
            meetings = await prisma.meeting.findMany();
        }

        const processedMeetings = await Promise.all(meetings.map(async (meeting) => {
            const hostName = await getUserNameByUID(meeting.hostUID);
            const memberUIDs = JSON.parse(meeting.membersUID || '[]');
            const memberNames = await Promise.all(memberUIDs.map(uid => getUserNameByUID(uid)));

            return {
                meetingID: meeting.meetingID,
                meetingName: meeting.meetingName,
                startTime: meeting.startTime,
                location: meeting.location,
                host: hostName,
                members: memberNames
            };
        }));
        res.json(processedMeetings);
    } catch (error) {
        console.error('Failed to fetch meetings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/join', async (req, res) => {
    const { meetingID } = req.body;
    try {
        if (!req.session.user){
            res.status(401).json({ error: 'Not Logged in!' });
            return;
        }

        const userID = req.session.user.UID; // 세션에서 유저의 UID를 가져옵니다.

        // meetingID로 미팅을 찾습니다.
        const meeting = await prisma.meeting.findUnique({
            where: { meetingID },
        });

        if (!meeting) {
            return res.status(404).json({ error: 'Meeting not found' });
        }

        // 미팅의 membersUID 리스트를 파싱합니다.
        let members = meeting.membersUID ? JSON.parse(meeting.membersUID) : [];

        // 이미 members 리스트에 유저가 있는지 확인합니다.
        if (members.includes(userID)) {
            return res.status(400).json({ error: 'User already joined this meeting' });
        }

        // members 리스트에 유저를 추가합니다.
        members.push(userID);

        // members 리스트를 다시 텍스트로 변환하여 DB에 저장합니다.
        await prisma.meeting.update({
            where: { meetingID },
            data: {
                membersUID: JSON.stringify(members),
            },
        });

        res.status(200).json({ message: 'Successfully joined the meeting' });
    } catch (error) {
        console.error('Failed to join meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

module.exports = router;