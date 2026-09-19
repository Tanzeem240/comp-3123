/* 
Purpose: Act as an API developer and create a new Promise to either Resolve or reject 
*/
async function fetch_games(){
    let Promise_games = new Promise((resolve, reject) => {
        let isRegistered = true
        setTimeout(() => {
            if(isRegistered){
                const gamesJSON = {
                    monday: "Leafs",
                    tuesday: "raptors"
                }
        //
                let gamesJSONstr = JSON.stringify(gamesJSON)
                resolve(gamesJSONstr)
            }else{
                reject("You must be a registed member first!!")
            }
        },2000)
    })
}

    async function fetch_games(){

        let  result_from_promise = await Promise_games
        console.log(result_from_promise)
        const gamesJSONparsed = JSON.parse(result_from_promise)
        console.log(gamesJSONparsed)
        console.log(gamesJSONparsed.monday)

    }
    

fetch_games()
let someStrToPrint = "bob"
console.log(someStrToPrint)