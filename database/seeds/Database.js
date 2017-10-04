'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Factory = use('Factory')

class DatabaseSeeder {
  * run () {
    yield Factory.model('App/Model/Company').create(2)
    yield Factory.model('App/Model/User').create(30)
    // yield Factory.model('App/Model/Attendance').create(200)
  }
}

module.exports = DatabaseSeeder
