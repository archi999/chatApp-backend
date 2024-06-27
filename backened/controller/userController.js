import express from 'express';
import User from '../models/user.js'
import Group from '../models/group.js';

const createUser=async(req,res)=>{
    const {name,email,password,isAdmin}=req.body;

    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            res.status(401).json({
                status:'failed',
                message:'User is already created'
            })  
        }
const user=new User({name,email,password,admin});
await user.save();
                res.json(user);

    }
    catch(error){
        res.status(401).json({
            status:'failed',
            message:error
        })  
    }
}

const editUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        let user = await User.findById(email);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = name;
        user.email = email;
        if (password) user.password = password;
        user.isAdmin = isAdmin;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};



const allUser = async (req, res) => {
    try {
        let users= await User.find({});

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const getUser = async (req, res) => {
    const {userId}=req.params;
    try {
        let user= await User.findById(userId);

        const groups = await Group.find({ members: userId }).populate('name'); 

        if(!user){
            res.status(404).json({
                'msg':'user not found'
            })
        }

        res.json({
            user,groups
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export {createUser, editUser , allUser, getUser}