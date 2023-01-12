const UserModel = require("../models/user");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken");

// Register new user
 const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {email} = req.body
  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
 const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



const resetUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const {email,password} = req.body

  try {
    // addition new
    const resetUser = await UserModel.findOneAndUpdate(email,{email,password},{useFindAndModify :false,upsert: true}).then((response)=>{
      res.status(200).json({  message: response  });

    })
    .catch((err)=>{
      res.status(200).json({  message: err  });
    })
    // if (userExists)
    // {
    //   await UserModel.findOne();

    //   return res.status(400).json({ message: "User already exists" });

    // }

    // changed
    // const token = jwt.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWTKEY,
    //   { expiresIn: "1h" }
    // );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {registerUser,loginUser,resetUser}  