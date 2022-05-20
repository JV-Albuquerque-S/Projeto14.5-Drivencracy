export function pollValidation(req, res, next){
    const poll = req.body;
    if(!poll.title){
        res.sendStatus(422);
        return;    
    }
    next();
}