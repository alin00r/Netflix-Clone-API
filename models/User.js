const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
}, { timestamps: true });

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

UserSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    }

    return user;
};

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET, { expiresIn: "5d" }
    );
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

UserSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;