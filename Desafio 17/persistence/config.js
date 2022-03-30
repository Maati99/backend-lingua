module.export = {
    fileSystem: {
        path: './'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://root:coderhouse@cluster0.gbmxl.mongodb.net/ecommerce?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 1000,
        }
    }
}