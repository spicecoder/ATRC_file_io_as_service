const Swift = require("client-swift")
const fs = require("fs")

// authUrl: $OS_AUTH_URL
// userName: $OS_USERNAME
// apiKey: $OS_PASSWORD
// userId: $OS_USER_ID
// domain: $OS_USER_DOMAIN_NAME
// domainId: $OS_USER_DOMAIN_ID
// tenant: $OS_TENANT_NAME  //v2
// tenant: $OS_PROJECT_NAME // v3
// tenantId: $OS_TENANT_ID
// tenantDomain: $OS_PROJECT_DOMAIN_NAME
// tenantDomainId: $OS_PROJECT_DOMAIN_ID
// region: $OS_REGION_NAME // v2
// trustId: $OS_TRUST_ID // v3
// endpointType: $OS_ENDPOINT_TYPE

// let version = "v2.0"
let version = "v3"
let authUrl = "https://keystone.rc.nectar.org.au:5000/v3" 
// let authUrl = "http://18.182.55.238:8080/auth/v1.0"
//the url!THEURL:https://object-store.rc.nectar.org.au/v1/AUTH_73486d7584d44f2d86a6ac4f80f5d7f7/PATREC
//OS_PROJECT_ID=73486d7584d44f2d86a6ac4f80f5d7f7

let data = {
  authUrl: authUrl,
  userName: "pronab.pal@unimelb.edu.au",
  // apiKey: "admin", // v1
  apiKey: "xxxxxxxxxxxxxxxx",
  tenant: "ATRC_1",
  domain: "Default",
  tenantDomain: "Default",
  endpointType: "public"
}

async function main() {
  try {
    // let client = await new Swift(data).authenticate()
    // // console.log("metadata:", await client.metadata())
    //
    // let container1 = await client.create("container1")
    // let object = client.Container("container1").Object("a.txt")
    // await object.copy("container2", "b.txt")

    // authenticate
    let client = await new Swift(data).authenticate()
    // get containers list
    let containers = await client.list()
    console.log("containers:client.list:" + containers)
    // container instance
    console.log(" container 0 name:", containers[0].name)
    let container = client.Container(containers[0].name)
    // get objects list
    let objects = await container.list()
    // object instance
    console.log("objects:container.list:"+ objects +"0 name:"+objects[0].name+ JSON.stringify(objects))
    let object = container.Object(objects[0].name)
    // download file
    let dst = fs.createWriteStream("a.txt")
    object.write(dst)

    let metadata = await client.metadata()
    console.log(metadata)
    await client.updateMetadata({'X-Account-Meta-Subject': 'Literature'})
    console.log(metadata)
    let container2 = await client.create("container2")

    
    console.log("c2", await container2.list());
    
    let dst2 = fs.createWriteStream("aa.txt")
    console.log("end", await container2.Object("./Neat_sample.txt").write(dst2));
    
    // let containers = await client.list()
    // console.log("containers:", containers)
    //
    // let container = client.Container(containers[0].name)
    // console.log("objects:", await container.list())
    
    // console.log("container meta:", await container.metadata());
    
    // client.delete("container2")
    // console.log("containers:", await client.list())
    
    let obj = await container2.create("How_a.txt", "aaa")
    console.log("obj:", obj);
    console.log(await container2.list());
    //console.log(await obj.get());
    console.log(await obj.updateMetadata({"Content-Type": "aaa"}));
    console.log(await obj.metadata());
    console.log(await obj.copy("container1", "a_copy.txt"));
    console.log(await client.Container("container1").list());
    console.log(await client.Container("container1").Object("a_copy.txt").delete());
    console.log(await client.Container("container1").list());


  } catch (e) {
    console.log("Error", e)
  }
}

main()
