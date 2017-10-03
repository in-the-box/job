'use strict'

const Schema = use('Schema')

class LeavingTableSchema extends Schema {
  up () {
    this.create('leaving', (table) => {
      table.increments()
      table.integer('attend_id')
      table.string('type')
      table.text('detail')
      table.text('comment')
      table.dateTime('started_at')
      table.dateTime('ended_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('leaving')
  }
}

module.exports = LeavingTableSchema


