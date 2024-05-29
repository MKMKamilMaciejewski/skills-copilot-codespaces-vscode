function skillsMember() {
    // Path: member.js
    var member = {
        name: 'John',
        age: 30,
        skills: ['JavaScript', 'HTML', 'CSS'],
        showSkills: function() {
            this.skills.forEach(function(skill) {
                console.log(this.name + ' knows ' + skill);
            });
        }
    };

    member.showSkills();
}