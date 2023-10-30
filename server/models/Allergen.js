const { Schema, model } = require('mongoose');
const Cocktail = require('./Cocktail'); // Import the Cocktail model

const allergenSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

allergenSchema.post("save", function (doc, next) {
    console.log(doc);

    if (doc.cocktail) {
        Cocktail.findByIdAndUpdate(doc.cocktail, {
            $addToSet: { allergens: doc._id },
        }, (error) => {
            if (error) {
                console.error("Error updating Cocktail with Allergen:", error);
            }
        });
    } else {
        console.error("Cocktail reference not found in the Allergen document.");
    }
    next();
});

const Allergen = model('Allergens', allergenSchema);
module.exports = Allergen;