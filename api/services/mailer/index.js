const path = require('path');
const Singleton = require('../../helpers/singleton');
const {EmailError} = require('../../helpers/errors');

class Mailer extends Singleton {
    constructor() {
        super();
        this.view = require('nunjucks');
        this.mailer = require('@sendgrid/mail');
        this.templatePath = path.resolve(__dirname, './templates');
        this.init();
    }

    async send(template, data, {to, subject = 'This is an information message'} = {}) {
        try {
            await this.mailer.send({
                to,
                from: process.env.MAIL_FROM,
                subject,
                html: this.view.render(`${this.templatePath}/${template}.html`, data),
            });
        } catch (error) {
            throw new EmailError('Unable to send email');
        }
    }

    init() {
        this.view.configure({autoescape: true});
        this.mailer.setApiKey(process.env.SENDGRID_API_KEY);
    }
}

module.exports = new Mailer();
