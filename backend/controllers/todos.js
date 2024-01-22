const {Todo} = require("../db");
const {z} = require("zod");

const userSchema = z.object({
    title : z.string().min(5),
    description : z.string().min(5),
});

const updateSchema = z.object({
    id: z.string()
});
const getTodos = async (req, res) => {
    try {
        const todosAll = await Todo.find({});
        res.json({
            todos: todosAll
        })
    } catch (e){
        res.status(411).json({
            msg:"Internal Server Error!"
        });
    }
};

const addTodos = async (req, res) => {
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
}

const updateTodos = async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateSchema.safeParse(updatePayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Wrong inputs"
        })
        return;
    }

    try {
        const { id } = parsedPayload.data;
        const { title, description, completed } = req.body;

        const updatedTodo = await Todo.findOneAndUpdate(
            {_id:id},
            {title, description, completed},
            {new : true}
        )

        if(updatedTodo){
            res.json({
                msg: "Todo Updated!",
                updatedTodo
            });
        } else {
            res.status(404).json({
                msg: "Todo not Found!"
            })
        }
    } catch (e){
        res.status(500).json({
            msg: "Internal server error!",
        });
        console.log(e);
    }
}
const deleteTodo = async (req, res) => {
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
}

module.exports = { getTodos, addTodos, updateTodos, deleteTodo };