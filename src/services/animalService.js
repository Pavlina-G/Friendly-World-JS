const { Animal } = require("../models/Animal");


async function getAllAnimals() {
    return await Animal.find().lean();
};

async function getLastThreeAnimals() {
    return await Animal.find().sort({ $natural: -1 }).limit(3).lean();
};

async function getAnimalById(id) {
    return await Animal.findById(id).lean();
};

async function createAnimal(data, ownerId) {

    const record = new Animal({
        name: data.name,
        years: data.years,
        kind: data.kind,
        image: data.image,
        need: data.need,
        location: data.location,
        description: data.description,
        owner: ownerId
    })

    await record.save();

    return record;
};

async function updateAnimal(animalId, userId, data) {
    const record = await Animal.findById(id);

    if (!record) {
        throw new Error(`Record ${animalId} not found`);
    }

    if (record.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    // TODO replace with real properties

    record.propItem = data.propItem;
    
    await record.save()

    return record;
};

async function deleteAnimalById(animalId, userId) {
    const record = await Animal.findById(id);

    if (!record) {
        throw new Error(`Record ${animalId} not found`);
    }

    if (record.owner.toString() != userId) {
        throw new Error('Access denied');
    }
    await Animal.findByIdAndDelete(animalId);
}

async function donateAnimal(id, userId) {
    const animal = await Animal.findById(id);

    if (!animal) {
        throw new Error(`This animal with id ${id} is not found`);
    }

    if (animal.owner.toString() == userId) {
        throw new Error('Access denied');
    }
    if (animal.donations.find(d => d.toString() == userId)) {
        return;
    }

    animal.donations.push(userId);

    await animal.save()

    return animal;
}

module.exports = {
    getAllAnimals,
    getLastThreeAnimals,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimalById,
    donateAnimal
}