var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	if(creep.memory.upgrading && creep.carry.energy == 0) {
	    creep.memory.upgrading = false;
	    creep.say('i harvest');

	}
	if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	    creep.memory.upgrading = true;
	    creep.say('i upgrade');

	}
        if(creep.memory.upgrading) {
	    target = creep.room.controller.id
            if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
	else {
	    var sources = creep.room.find(FIND_SOURCES);
	    if(creep.transfer(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
};

module.exports = roleUpgrader;
