const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

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


module.exports = router;