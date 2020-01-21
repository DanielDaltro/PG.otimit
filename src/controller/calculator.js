const RAM_memory = 4 * 1024
const number_seasons = 6
const disk_type = 'HDD'

const calcMaxConnections = (number_seasons) => {
    
    let valueMaxConnetions = number_seasons * 16

    if(valueMaxConnetions < 100){
        return 100
    }
    else{
        return valueMaxConnetions
    }
}

const calcSharedBuffers = (RAM_memory) => {

    const limitValue = 8192

    const valueSharedBuffers = RAM_memory * 0.15
    
    if (valueSharedBuffers > limitValue)
    {
        return Math.trunc(limitValue)+'MB'
    }
    else
    {
        return Math.trunc(valueSharedBuffers) + 'MB'
    }
   
}

const calcWorkMem = (RAM_memory, max_connections) => {

    const valueWorkMem = Math.trunc((RAM_memory * 0.25) / max_connections)

    return valueWorkMem+'MB'
}

const calcMaintenanceWorkMem = (RAM_memory) => {
    const valueMaintenanceWorkMem = RAM_memory * 0.05

    return Math.trunc(valueMaintenanceWorkMem)+'MB'
}

const calcEffectiveCacheSize = (RAM_memory) => {
    const valueEffectiveCacheSize = Math.trunc(RAM_memory) / 4

    if(valueEffectiveCacheSize > 2048){
        return 1048 + 'MB'
    }
    else{
        return valueEffectiveCacheSize+'MB'
    }

}





maxconnections_newValue = calcMaxConnections(number_seasons)
sharedbuffers_newValue = calcSharedBuffers(RAM_memory)
workmem_newValue = calcWorkMem(RAM_memory, maxconnections_newValue)
maintenanceworkmem_newValue = calcMaintenanceWorkMem(RAM_memory)
effectivecachesize_newValue = calcEffectiveCacheSize(RAM_memory)




module.exports = {
    maxconnections_newValue,
    sharedbuffers_newValue,
    workmem_newValue,
    maintenanceworkmem_newValue,
    effectivecachesize_newValue
}


