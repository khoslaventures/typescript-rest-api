import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetPosts(req: Request, res: Response): void {
        Post.find({})
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

    public GetPost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOne({ slug })
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

    public CreatePost(req: Request, res: Response): void {
        const title: string = req.body.title;
        const slug: string = req.body.slug;
        const content: string = req.body.content;
        const featuredImage: string = req.body.featuredImage;

        const post = new Post({
            title,
            slug,
            content,
            featuredImage
        });

        post.save()
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

    public UpdatePost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOneAndUpdate({ slug }, req.body)
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

    public DeletePost(req: Request, res: Response): void {
        const slug: string = req.params.slug;

        Post.findOneAndRemove({ slug })
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
        this.router.get('/', this.GetPosts);
        this.router.post('/', this.CreatePost);
        this.router.get('/:slug', this.GetPost);
        this.router.put('/:slug', this.UpdatePost);
        this.router.delete('/:slug', this.DeletePost);
    }
}

// export
const postRoutes = new PostRouter();
postRoutes.routes();
const router = postRoutes.router;

export default router;