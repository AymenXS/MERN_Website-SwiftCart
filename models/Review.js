const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },

    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxLength: 100,
    },

    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Index, to set up unique comment; one review per user per product.
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async (product) => {
  const result = await this.aggregate([
    {
      $match: {
        product: new ObjectId('65f30c8bba0768b3f90ac531'),
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: '$rating',
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productID },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
