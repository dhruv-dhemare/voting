const express = require('express');
const router = express.Router();
const Candidate = require('./../models/candidate');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

router.post('/',jwtAuthMiddleware,async (req, res) => {
    
    try {
        const role = req.user.role;
        if(role === "voter"){
            console.log("Voter cannot do that");
            return res.status(401).json({error : "Not allowed"});
        }
        
        const data = req.body;
        const newCandidate = new Candidate(data);
        const savedCandidate = await newCandidate.save();

        console.log("Candidate Saved:", savedCandidate._id);
        return res.status(201).json({ message: "Candidate Added", candidateId: savedCandidate._id });
    }catch (err) {
        console.error("Error saving candidate:", err.message);
        return res.status(400).json({ error: "Invalid Candidate Data", details: err.message });
    }
});

router.get('/', async (req, res) => {
    
    try {
        const candidates = await Candidate.find();
        return res.status(200).json(candidates);
    }catch (err) {
        return res.status(500).json({ error: 'Failed to fetch candidates' });
    }
});

router.put('/' ,jwtAuthMiddleware, async(req,res)=>{
    try{
        const role = req.user.role;
        if(role === "voter"){
            console.log("Voter cannot do that");
            return res.status(403).json({error : "Not allowed"});
        }

        const data = req.body;
        const candidate =await Candidate.findById(data._id);
        if(!candidate) {
            console.log("Candidate is not present");
            return res.status(401).json({error : "Invalid candidate"});
        }

        candidate.name = data.name;
        candidate.age = data.age;
        candidate.party = data.party;

        await candidate.save();  

        console.log('Candidate data updated');
        return res.status(200).json({ message: "Candidate data updated" });
        
    }catch(err){
        return res.status(500).json({error : 'Invalid server'})
    }
})

router.delete('/',jwtAuthMiddleware, async(req,res)=>{
    try{
        const role = req.user.role;
        if(role === "voter"){
            console.log("Voter cannot do that");
            return res.status(403).json({error : "Not allowed"});
        }

        const id = req.body;
        if(!id){
            console.log("Candidate does not exist");
            return res.status(401).json({error:"No such Candidate"});
        }

        await Candidate.deleteOne({_id:id});
        return res.status(200).json({message : "Candidate deleted successfully"});

    }catch (err) {
        return res.status(500).json({ error: 'Failed to fetch candidates' });
    }
})

module.exports = router;
