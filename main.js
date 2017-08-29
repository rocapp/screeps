var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRemember = require('role.remember');

var myCreeps = {'builder':1,'upgrader':10,'harvester':2,'repairer':1,'remember':1}

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
    
    var roles = ['harvester','upgrader','builder','repairer','remember'];
    for (r in roles) {
        var b = countRoles(roles[r],Game.creeps);
        /*
        console.log(roles[r]);
        console.log(b);
        console.log(myCreeps[roles[r]]);
        */
        if (b < myCreeps[roles[r]] && roles[r]=='remember' ) {
	    /*
	    roleRemember.make(Game);
	    */
	    break;
	}
	else {
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
	/*
        if(creep.memory.role == 'remember') {
            roleRemember.run(creep);
        }
	*/
    }
}
