//1. У любого пользователя будет как минимум в БД qualities & professions
//2. Они равны mock данным

const Professions = require("../models/Professions");
const Qualities = require("../models/Qualities");

const professionsMock = require("../mock/professions.json");
const quelitiesMock = require("../mock/qualities.json");

module.exports = async () => {
    const professions = await Professions.find();
    if (professions.length !== professionsMock.length) {
        await createInitialEntity(Professions, professionsMock);
    }
};

module.exports = async () => {
    const qualities = await Qualities.find();
    if (qualities.length !== quelitiesMock.length) {
        await createInitialEntity(Qualities, quelitiesMock);
    }
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        })
    );
}
