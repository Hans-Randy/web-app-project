import Router from 'express';
const router = Router()
import {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers,
    createUser
} from "../controllers/userController.js";

router.get('/:id', getUserById, async (req,res) => {
    res.status(200).json(res.user)
});

router.get('/', getAllUsers);
router.put('/:id', getUserById, updateUser);
router.post('/',createUser)
router.delete('/:id', getUserById, deleteUser);
router.delete('/', deleteAllUsers);

export default router;