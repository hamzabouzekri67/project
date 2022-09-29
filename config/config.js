 const Mong_DB ="mongodb://realestates:Baba123456@cluster0-shard-00-00.6owmo.mongodb.net:27017,cluster0-shard-00-01.6owmo.mongodb.net:27017,cluster0-shard-00-02.6owmo.mongodb.net:27017/?ssl=true&replicaSet=atlas-9selb4-shard-0&authSource=admin&retryWrites=true&w=majority";
 const stripConfig = {
    STRIP_KEY_PUB : "sk_test_51LmzzEIfU4ppocwuq3XSOmKHldh9tpDGbMsWahGNpxw0KekNkjpk5ns7e7rs7PHMlcXXNToAQotj5xFkCK0MgdZ300Kd7cZnuY",
    STRIPE_KEY_CURRENCY:"usd"
 }
module.exports ={
 Mong_DB,
 stripConfig
}