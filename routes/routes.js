var appRouter = function (app) {

    app.get("/", function (req, res) {
        res.status(200).send("Welcome");
    });

    app.post("/contact", function (req, res, err) {

        console.log(req.body.email);
        console.log(req.body.message);

        var pattern = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
        var successMessage = [{message: 'Your message has been sent!'}];
        var errorList = (
            {email: ''},
            {message: ''}
        );

        var email = req.body.email;
        if (pattern.test(email.toLowerCase())) {
            var emailValid = true;
        }
        else {
            errorList.email = 'Must have a valid email address';
        }

        var message = req.body.message;
        if (message.length > 30) {
            var messageValid = true;
        }
        else {
            errorList.message = 'The message must be longer than 30 characters';
        }

        if (emailValid && messageValid) {
            res.status(200).send(successMessage);
        } else {
            res.status(422).json(errorList);
        }

    });

}

module.exports = appRouter;