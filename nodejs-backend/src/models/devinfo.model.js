
    module.exports = function (app) {
        const modelName = 'devinfo';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            PEMAJU: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
TAMAN: { type: String, required: true, unique: false, lowercase: false, uppercase: false, maxLength: null, index: false, trim: false },
JUMLAH: { type: Number, required: false, max: 10000000 },
BGREF: { type: Number, required: false, max: 10000000 },
BANKREF: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
TARIKH: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
R1: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
R2: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
CALL: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
CATATAN: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };