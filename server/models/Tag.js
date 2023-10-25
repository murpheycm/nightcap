const { Schema } = require('mongoose');

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

// after saving, push tag to cocktail model
tagSchema.post("save", function (doc, next) {
    console.log(doc);
    const cocktail = Cocktail.findByIdAndUpdate(doc.cocktail, {
        $addToSet: { tags: doc },
    });
    next();
});

module.exports = tagSchema;