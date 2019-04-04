const sendGridKey = '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';
const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(sendGridKey)
const msg = {
    to: 'ltdat1095@gmail.com',
    from: 'ltdat1095@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgmail.send(msg);