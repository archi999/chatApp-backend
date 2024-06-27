import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

const Group = mongoose.model('Group', groupSchema);

export default Group;
