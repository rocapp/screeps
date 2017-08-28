var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else if(Game.spawns['s1'].energy < Game.spawns['s1'].energyCapacity) {
            if(creep.transfer(Game.spawns['s1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['s1']);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
             filter: object => object.energy < (object.energyCapacity)
            });
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
	}
};

module.exports = roleHarvester;
