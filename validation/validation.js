const { celebrate, Joi } = require('celebrate');

module.exports.validationGetUserById = celebrate({
    params: Joi.object().keys({
        userId: Joi.string().required().length(24),
    })
})

module.exports.validationUpdateUserInfo = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
    })
})

module.exports.validationUpdateUserAratar = celebrate({
    body: Joi.object().keys({
        /*link: Joi.string().required().regex(),*/
    })
})

module.exports.validationСardId = celebrate({
    params: Joi.object().keys({
        cardId: Joi.string().required().length(24),
    }),
});

module.exports.validationCreateCards = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        /*link: Joi.string().required().regex(),*/
    }),
});

module.exports.validationSignIn = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
});

module.exports.validationSignUp = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(2).max(30),
    }),
});
