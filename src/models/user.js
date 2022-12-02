const mongo = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugins');



const userSchema = new mongo.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    password : {
        type: String,
        trim: true,
        minlength: 8,
        private: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: String,
    medias: {
        twitter: {
            type: String
        },
        discord: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    isVerified: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    meta: {
        imei: String,
        appName: String,
    }
}, {
    timestamps: true,
});
userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email) {
    return !!(await this.findOne({ email}));
};

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongo.model('users', userSchema);

  
module.exports = User;