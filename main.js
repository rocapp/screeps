var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRemember = require('role.remember');

var myCreeps = {'builder':3,'upgrader':6,'harvester':3,'repairer':1,'remember':1}

function defendRoom(room) {
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = room.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}

function countRoles(rl,creeps) {
    var counter = 0;
    for (creep in creeps ) {
       if(creeps[creep].memory.role == rl) {
           counter = counter + 1;
       } 
    }
    return counter;
}

module.exports.loop = function () {
    defendRoom(Game.spawns['s1'].room)
    var roles = ['harvester','upgrader','builder','repairer','remember'];
    var sources = Game.spawns['s1'].room.find(FIND_SOURCES)
    for (r in roles) {
        var b = countRoles(roles[r],Game.creeps);
        /*
        console.log(roles[r]);
        console.log(b);
        console.log(myCreeps[roles[r]]);
        */
        if (b < myCreeps[roles[r]] && roles[r]=='remember' ) {

	    roleRemember.make(Game.spawns['s1'],roles[r]);
	    /*
	    Game.spawns['s1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE, WORK], roles[r] + Game.time.toString(),
					{ role: roles[r],
					  working: false,
					  target: sources[0].id } );     

	    */
	    break;
	}
	else if (b < myCreeps[roles[r]]) {
            Game.spawns['s1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE, WORK], roles[r] + Game.time.toString(), { role: roles[r] } );     
            break;
        }    
        
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'remember') {
            roleRemember.run(creep);
        }
    }
}
