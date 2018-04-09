import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetUsers(req: Request, res: Response): void {
        User.find({})
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }

    public GetUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOne({ username }).populate('posts', 'title content')
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }

    public CreateUser(req: Request, res: Response): void {
        const name: string = req.body.name;
        const username: string = req.body.username;
        const email: string = req.body.email;
        const password: string = req.body.password;
        const posts: string[] = req.body.posts;

        const user = new User({
            name,
            username,
            email,
            password,
            posts
        });

        user.save()
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }

    public UpdateUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndUpdate({ username }, req.body)
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }

    public DeleteUser(req: Request, res: Response): void {
        const username: string = req.params.username;

        User.findOneAndRemove({ username })
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });
        })
    }

    routes() {
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.CreateUser);
        this.router.get('/:username', this.GetUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }
}

// export
const userRoutes = new UserRouter();
userRoutes.routes();
const router = userRoutes.router;

export default router;