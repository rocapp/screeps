var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.upgrading && creep.carry.energy == 0) {
		creep.memory.upgrading = false;
		creep.say('i harvest');
		var sources = creep.room.find(FIND_SOURCES);
		creep.memory.target = sources[0].id
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('i upgrade');
		creep.memory.target = creep.room.controller.id
	    }
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.memory.target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.target);
            }
        }
	    else {
		if(creep.memory.target == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

	}
};

module.exports = roleUpgrader;
