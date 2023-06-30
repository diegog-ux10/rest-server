const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de Datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar DB");
  }
};

module.exports = {
  dbConnection,
};
