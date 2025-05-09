let customIncriment=0n
let lastTimestamp = 0n
function createCustomId(){ 
    const customWorkerId = 0n
    const customProcessId = 1n

    const aryanEpoch=1746662400000n
    const currentTime = BigInt(Date.now()) 
    const customTime = BigInt(currentTime-aryanEpoch) 

    if(lastTimestamp===customTime){
        customIncriment++;
        if(customIncriment>=4095n){
            customIncriment=0n
        }
    }else{
        customIncriment++
        lastTimestamp=customTime
    }
    return (customTime<<22n) | (customWorkerId <<17n) | (customProcessId<<12n) | customIncriment;
}



export {
    createCustomId
}