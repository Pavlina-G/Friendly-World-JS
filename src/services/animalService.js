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
    const animal = await Animal.findById(animalId);

    if (!animal) {
        throw new Error(`Animal with id ${animalId} has not found`);
    }

    if (animal.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    animal.name = data.name
    animal.years = data.years
    animal.kind = data.kind
    animal.image = data.image
    animal.need = data.need
    animal.location = data.location
    animal.description = data.description


    await animal.save()

    return animal;
};

async function deleteAnimalById(animalId, userId) {
    const animal = await Animal.findById(animalId);

    if (!animal) {
        throw new Error(`Record ${animalId} not found`);
    }

    if (animal.owner.toString() != userId) {
        throw new Error('Access denied');
    }
    await Animal.findByIdAndDelete(animal._id);
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