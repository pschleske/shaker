import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
    console.log(`Connecting to DB: ${dbURI}`);

    const sequelize = new Sequelize(dbURI, {
        logging: console.log, //set logging: false to disable outputting SQL queries to console
        define: {
            timestamps: true, // false if you don't want created_at or updated_at columns
            underscored: true, //use snake_casing rather than camelCase column names
        },
    });

    try {
        await sequelize.authenticate();
        console.log("Connected to DB successfully!!")
    } catch (error) {
        console.error("Something went wrong trying to connect to DB:", error)
    }
    return sequelize;
}

export default connectToDB;