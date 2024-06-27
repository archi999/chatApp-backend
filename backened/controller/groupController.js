import Group from '../models/group.js';
import User from '../models/user.js'; // Assuming User model is defined

const createGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const group = new Group({ name });
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
const getGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await Group.findById(groupId).populate('members', 'name').populate({
            path: 'messages.sender',
            select: 'name'
        });

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json(group);
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const updateGroup = async (req, res) => {
    const { groupId } = req.params;
    const { name } = req.body;
    try {
        const group = await Group.findByIdAndUpdate(groupId, { name }, { new: true });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByIdAndDelete(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ error: 'User is already a member' });
        }

        group.members.push(userId);
        await group.save();
        res.json(group);
    } catch (error) {
        console.error('Error adding member to group:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const removeMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const index = group.members.indexOf(userId);
        if (index === -1) {
            return res.status(400).json({ error: 'User is not a member of this group' });
        }

        group.members.splice(index, 1);
        await group.save();
        res.json(group);
    } catch (error) {
        console.error('Error removing member from group:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


const allGroups=async(req,res)=>{
    try{
const groups= await Group.find({});
res.status(200).json(groups)
    }
    catch(error){
res.status(400).json(error)
    }
}
export { createGroup, getGroup, updateGroup, deleteGroup, addMember, removeMember , allGroups};
