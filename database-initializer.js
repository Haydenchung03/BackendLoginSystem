import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;
let db;
import bcrypt from 'bcrypt';
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('ThisIsAFakePassword', 10);

// initialize database
MongoClient.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true }, function(err, client) {
    if(err) throw err;

    db = client.db('my_database');
   

    db.dropCollection("userinfos", function(err, result){
        if(err){
            console.log("Error dropping collection. Likely case: collection did not exist.")
        }else{
            console.log("Cleared collection.");
        }
        // hash the password
        
        db.collection("userinfos").insertOne({username: 'ADMIN', email: "haydenchung@hotmail.com", password: salt + ":" +hashedPassword, confirmed: true}, function(err, result){
            if(err) throw err;
            console.log("Successfuly created");
            process.exit();
        });
    });
    
    db.dropCollection("userverifications", function(err, result){
        if(err){
            console.log("Error dropping collection. Likely case: collection did not exist")
        }else{
            console.log("Cleared collection.");
        }

        db.createCollection("userverifications", function(err, result){
            if(err) throw err;
            console.log("Successfuly created");
            process.exit();
        });
        
            
    });

    db.dropCollection("resetVerifications", function(err, result){
        if(err){
            console.log("Error dropping collection. Likely case: collection did not exist")
        }else{
            console.log("Cleared collection.");
        }

        db.createCollection("resetVerifications", function(err, result){
            if(err) throw err;
            console.log("Successfuly created");
            process.exit();
        });
        
            
    });

});