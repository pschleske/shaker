import { DataTypes, Model } from "sequelize";
import url from 'url';
import connectToDB from "./db.js";
import util from "util";

const db = await connectToDB('postgresql:///shaker');

// create data models here
class User extends Model {
    [util.inspect.custom]() {
        return this.JSON();
    }
}
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imgUrl: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashedPass: {
            type: DataTypes.STRING(500),
            // allowNull: false,
        },
    },
    {
        modelName: "user",
        sequelize: db
    }
)


if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log("Syncing to database...")
    await db.sync()
    console.log("Finished syncing database!")
}

//exports here
export { User }