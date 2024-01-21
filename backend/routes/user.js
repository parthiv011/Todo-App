const express = require('express');
const router = express.Router();
const { z } = require('zod');
const {Todo} = require("../db");

const userSchema = z.object({
    title : z.string().min(5),
    description : z.string().min(5),
})

const updateSchema = z.object({
    id: z.string()
})

router.get('/todos', async (req, res) => {
    try {
        const todosAll = await Todo.find({});
        res.json({
            todos: todosAll
        })
    } catch (e){
        res.status(411).json({
            msg:"Internal Server Error!"
        })
    }
})
router.post('/add-todos', async (req, res) => {
    try {
        const {title, description} = userSchema.parse(req.body);
        const completed = false;
        await Todo.create({
            title,
            description,
            completed
        })
        res.json({
            msg:"Todo added !"
        })
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            msg:"Inputs are not Correct"
        })
    }
})

router.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateSchema.safeParse(updatePayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Wrong inputs"
        })
        return;
    }

    await Todo.update({
        _id: req.body.id
    }, {
        completed:true
    })
    res.json({
        msg:"Completed!"
    })
})

router.delete('/:id',async (req, res) => {
    try {
        const result = await Todo.deleteOne({_id: req.params.id});
        if(result.deletedCount > 0){
            res.json({
                msg: "Todo Deleted !"
            });
        }else {
            res.status(404).json({
                msg:"Todo not found!"
            })
        }
    }
    catch (e){
        res.status(500).json({
            msg: "Internal server Error!"
        })
        console.log(e);
    }
})

module.exports = router;
