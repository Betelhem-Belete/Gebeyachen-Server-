// const jwt = require("jsonwebtoken");
// const User = require("../model/USERMODEL");

// const handle_verify = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ user: false });
//   }
//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ user: false });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const _id = decoded.id;
//     const user = await User.findById({ _id });
//     if (!user) {
//       return res.status(401).json({ user: false });
//     }
//     res.json({ user: true });
//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(401).json({ user: false });
//   }
// };
// module.exports = { handle_verify };

const jwt = require("jsonwebtoken");
const User = require("../model/USERMODEL");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
