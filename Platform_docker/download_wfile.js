const Swift = require("client-swift")
const fs = require("fs")
const containername = process.argv[2];
const containerdir = process.argv[3];
const destinationdir = process.argv[4]
const filename      = process.argv[5];
const outfile      = process.argv[6];
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
  apiKey: "XXXXXXXXXXXXXXX",
  tenant: "ATRC_1",
  domain: "Default",
  tenantDomain: "Default",
  endpointType: "public"
}

async function main(containername,containerdir,destinationdir,filename,outfile) {
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
    var selectedcontainer ="";
  //  console.log("containers:client.list:" + containers)
    // container instance
    for (container of containers){
        console.log(" container current:", container.name)
        if (container.name === containername) {
            selectedcontainer = client.Container(container.name)
        }
    }
  //  console.log(" container 0 name:", containers[0].name)
  //  let container = client.Container(containers[0].name)
    // get objects list
    let objects = await selectedcontainer.list()
    for (object of objects){
        if (object.name === containerdir+filename) {
          console.log("file found" + object.name )
          let wobject = selectedcontainer.Object(object.name)
          // download file
          let dst = fs.createWriteStream(destinationdir + outfile)
          wobject.write(dst)
      
        }
     }
   
  } catch (e) {
    console.log("Error", e)
  }
}

main(containername,containerdir,destinationdir,filename,outfile)
