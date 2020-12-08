import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/all', (req: Request, res: Response) => {
    res.send('All the polls');
});

router.get('/:id', (req: Request, res: Response) => {
    res.send(req.params.id);
});

router.post('/create/:id', (req: Request, res: Response) => {
    res.send(req.body.time);
});

router.put('/mark/:id', (req: Request, res: Response) => {
    res.send(req.params.id);
});

export default router;
