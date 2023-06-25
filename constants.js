const MAX_EXPENSE_LIMIT = [
    { type: 'Breakfast', limit: 20 },
    { type: "Lunch", limit: 50 },
    { type: "Dinner", limit: 100 },
    { type: "Car Rental", limit: 0 }
]
const API_BASE_URL = 'https://bq7i2gniezvzh6lgvb57dgjpse0jcffm.lambda-url.us-east-1.on.aws/';
module.exports = { MAX_EXPENSE_LIMIT, API_BASE_URL }