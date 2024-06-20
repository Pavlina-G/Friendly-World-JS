// TODO replsce with real data service from the exam description

const { Data } = require("../models/Data");

async function getAll() {
    return await Data.find().lean();
};

async function getById(id) {
    return await Data.findById(id).lean();
};

async function create(dataData, authorId) {
    // TODO extract properties from view model
    const record = new Data({
        propItem: dataData.prop,
        author: authorId
    })

    await record.save();

    return record;
};

async function update(dataId, userId, dataData) {
    const record = await Data.findById(id);

    if (!record) {
        throw new Error(`Record ${dataId} not found`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied');
    }

    // TODO replace with real properties

    record.propItem = dataData.propItem;
    
    await record.save()

    return record;
};

async function deleteById(dataId, userId) {
    const record = await Data.findById(id);

    if (!record) {
        throw new Error(`Record ${dataId} not found`);
    }

    if (record.author.toString() != userId) {
        throw new Error('Access denied');
    }
    await Data.findByIdAndDelete(dataId);
}

module.exports = {
    getAll,
    getById,
    update,
    deleteById
}