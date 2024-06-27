import Message from '../models/message.js';
import Group from '../models/group.js';

const createMessage = async (req, res) => {
    const { groupId,userId } = req.params;
    const { text } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const newMessage = new Message({
            groupId,
            sender: userId,
            text
        });

        await newMessage.save();
        group.messages.push(newMessage);
        await group.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getMessagesByGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members', 'name'); // Populate members with their name
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { createMessage, getMessagesByGroup };
