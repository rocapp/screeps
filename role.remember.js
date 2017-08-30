var roleRemember = {

    /** @param {Creep} creep **/
    run: function(creep) {
	if(creep.memory.working && creep.carry.energy == 0) {
	    creep.memory.working = false;
            var sources = creep.room.find(FIND_SOURCES);
	    creep.memory.target = sources[0].id
	    creep.say('i harvest');
	}
	if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	    creep.memory.working = true;
	    creep.say('i upgrade');
	    creep.memory.target = creep.room.controller.id;
	}
        if(creep.memory.working) {
	    
            if(creep.upgradeController( Game.getObjectById(creep.memory.target) ) == ERR_NOT_IN_RANGE ) {
                creep.moveTo( Game.getObjectById(creep.memory.target) );
            }
	}
        if(!creep.memory.working) {

            if(creep.harvest( Game.getObjectById(creep.memory.target) ) == ERR_NOT_IN_RANGE) {
                creep.moveTo( Game.getObjectById(creep.memory.target) );
            }
        }
    },
	


    make: function(spawn) {
	var sources = creep.room.find(FIND_SOURCES)
	spawns.createCreep( [WORK, CARRY, CARRY, MOVE, MOVE, WORK], roles[r] + Game.time.toString(),
			    { role: roles[r],
			      working: false,
			      target: sources[0].id } );     
    }

};

module.exports = roleRemember;
