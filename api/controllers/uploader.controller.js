const successResponse = require('../helpers/success-response');
const uuid = require('uuid/v4');

class UploaderController {
    upload(req, res, next) {
        if (!req.files || !req.files.photo) {
            next(new Error('No photo was uploaded'));
        }

        const {photo} = req.files;
        const name = this._createName(photo);

        photo.mv(`./public/${name}`, err => {
            if (err) {
                return next(err);
            }

            res.status(200).json(
                successResponse({
                    photo: `${req.protocol}://${req.get('host')}/${name}`,
                })
            );
        });
    }

    _createName({name}) {
        const [filename, ext] = name.split('.');
        return `${filename}-${uuid()}.${ext}`;
    }
}

module.exports = UploaderController;
