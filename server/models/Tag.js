const { Schema, model } = require('mongoose');
const Cocktail = require('./Cocktail'); // Import the Cocktail model

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

tagSchema.post("save", function (doc, next) {
    console.log(doc);

    if (doc.cocktail) {
        Cocktail.findByIdAndUpdate(doc.cocktail, {
            $addToSet: { tags: doc._id },
        }, (error) => {
            if (error) {
                console.error("Error updating Cocktail with tag:", error);
            }
        });
    } else {
        console.error("Cocktail reference not found in the tag document.");
    }
    next();
});

const Tag = model('Tags', tagSchema);
module.exports = Tag;